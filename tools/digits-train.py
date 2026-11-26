"""Entrena el reconeixedor de xifres escrites a mà del joc d'agilitat (shared/mates/digits.json).

Xarxa petita (784 → 192 → 10) entrenada amb MNIST i deformacions a l'atzar (gir, mida,
desplaçament, gruix del traç) perquè s'assembli a escriure amb el dit a la pantalla.
Només fa servir numpy. Ús (al NUC):
  ~/tts/venv/bin/python -I tools/digits-train.py ~/tts/mnist shared/mates/digits.json
"""
import base64, gzip, json, sys, time
import numpy as np

src, out = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(7)

def load(name, images):
    with gzip.open(f"{src}/{name}.gz", "rb") as f:
        data = f.read()
    if images:
        return np.frombuffer(data, np.uint8, offset=16).reshape(-1, 28, 28).astype(np.float32) / 255
    return np.frombuffer(data, np.uint8, offset=8).astype(np.int64)

Xtr, ytr = load("train-images-idx3-ubyte", 1), load("train-labels-idx1-ubyte", 0)
Xte, yte = load("t10k-images-idx3-ubyte", 1), load("t10k-labels-idx1-ubyte", 0)

yy, xx = np.mgrid[0:28, 0:28].astype(np.float32)

def augment(X):
    """Gir ±15°, escala 0,85–1,15, inclinació, desplaçament ±2,5 px i gruix del traç."""
    B = len(X)
    a = np.deg2rad(rng.uniform(-15, 15, B))
    s = rng.uniform(0.85, 1.15, B)
    sh = rng.uniform(-0.2, 0.2, B)
    tx, ty = rng.uniform(-2.5, 2.5, B), rng.uniform(-2.5, 2.5, B)
    c, si = np.cos(a) / s, np.sin(a) / s
    X0, Y0 = xx[None] - 13.5 - tx[:, None, None], yy[None] - 13.5 - ty[:, None, None]
    sx = c[:, None, None] * X0 + (si + sh)[:, None, None] * Y0 + 13.5
    sy = -si[:, None, None] * X0 + c[:, None, None] * Y0 + 13.5
    x0, y0 = np.floor(sx).astype(int), np.floor(sy).astype(int)
    fx, fy = sx - x0, sy - y0
    def px(xi, yi):
        ok = (xi >= 0) & (xi < 28) & (yi >= 0) & (yi < 28)
        v = X[np.arange(B)[:, None, None], np.clip(yi, 0, 27), np.clip(xi, 0, 27)]
        return v * ok
    o = (px(x0, y0) * (1 - fx) * (1 - fy) + px(x0 + 1, y0) * fx * (1 - fy)
         + px(x0, y0 + 1) * (1 - fx) * fy + px(x0 + 1, y0 + 1) * fx * fy)
    # gruix: a la meitat de les imatges, engreixa el traç (màxim 3×3)
    thick = rng.random(B) < 0.45
    if thick.any():
        t = o[thick]; p = np.pad(t, ((0, 0), (1, 1), (1, 1)))
        m = np.max([p[:, i:i + 28, j:j + 28] for i in range(3) for j in range(3)], axis=0)
        o[thick] = np.maximum(t, m * 0.85)
    return np.clip(o, 0, 1)

H = 192
W1 = rng.normal(0, np.sqrt(2 / 784), (784, H)).astype(np.float32); b1 = np.zeros(H, np.float32)
W2 = rng.normal(0, np.sqrt(2 / H), (H, 10)).astype(np.float32); b2 = np.zeros(10, np.float32)
params = [W1, b1, W2, b2]
m = [np.zeros_like(p) for p in params]; v = [np.zeros_like(p) for p in params]
lr, beta1, beta2, step = 1e-3, 0.9, 0.999, 0

def forward(X):
    h = np.maximum(X @ W1 + b1, 0)
    z = h @ W2 + b2
    return h, z

def accuracy(X, y):
    return (forward(X.reshape(len(X), -1))[1].argmax(1) == y).mean()

EPOCHS, BS = 10, 128
t0 = time.time()
for ep in range(EPOCHS):
    idx = rng.permutation(len(Xtr))
    if ep == EPOCHS - 3: lr = 3e-4
    for i in range(0, len(idx), BS):
        bi = idx[i:i + BS]
        X = augment(Xtr[bi]).reshape(len(bi), -1); y = ytr[bi]
        h, z = forward(X)
        z = z - z.max(1, keepdims=True); p = np.exp(z); p /= p.sum(1, keepdims=True)
        g = p; g[np.arange(len(y)), y] -= 1; g /= len(y)
        gW2 = h.T @ g; gb2 = g.sum(0)
        gh = (g @ W2.T) * (h > 0)
        gW1 = X.T @ gh; gb1 = gh.sum(0)
        step += 1
        for k, (P, G) in enumerate(zip(params, [gW1 + 1e-5 * W1, gb1, gW2 + 1e-5 * W2, gb2])):
            m[k] = beta1 * m[k] + (1 - beta1) * G; v[k] = beta2 * v[k] + (1 - beta2) * G * G
            P -= lr * (m[k] / (1 - beta1 ** step)) / (np.sqrt(v[k] / (1 - beta2 ** step)) + 1e-8)
    print(f"època {ep + 1}: test {accuracy(Xte, yte):.4f} · test deformat {accuracy(augment(Xte[:5000]), yte[:5000]):.4f} · {int(time.time() - t0)} s", flush=True)

def q8(a):
    s = float(np.abs(a).max()) / 127
    return {"s": s, "d": base64.b64encode(np.round(a / s).astype(np.int8).tobytes()).decode()}

json.dump({"h": H, "w1": q8(W1), "b1": [round(float(x), 5) for x in b1],
           "w2": q8(W2), "b2": [round(float(x), 5) for x in b2]}, open(out, "w"))
# comprova la versió quantitzada
dq = lambda q, shape: np.frombuffer(base64.b64decode(q["d"]), np.int8).astype(np.float32).reshape(shape) * q["s"]
W1[:], W2[:] = dq(q8(W1), W1.shape), dq(q8(W2), W2.shape)
print("quantitzat: test", round(float(accuracy(Xte, yte)), 4), flush=True)
