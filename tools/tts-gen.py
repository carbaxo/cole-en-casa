"""Genera els àudios en anglès amb Kokoro (al NUC) a partir de la llista de tts-texts.mjs.

Ús (al NUC):
  node tools/tts-texts.mjs > /tmp/texts.json
  ~/tts/venv/bin/python -I tools/tts-gen.py /tmp/texts.json shared/angles/audio bf_emma

Fa un mp3 per frase (<clau>.mp3) i escriu index.json amb les claus disponibles.
Les frases que ja tenen àudio no es tornen a generar; les que ja no surten s'esborren.
"""
import json, os, subprocess, sys, tempfile, time
import soundfile as sf
from kokoro_onnx import Kokoro

texts, outdir, voice = sys.argv[1], sys.argv[2], sys.argv[3]
items = json.load(open(texts))
os.makedirs(outdir, exist_ok=True)
home = os.path.expanduser("~/tts")
k = Kokoro(f"{home}/kokoro-v1.0.int8.onnx", f"{home}/voices-v1.0.bin")
want = {it["key"] for it in items}
todo = [it for it in items if not os.path.exists(f"{outdir}/{it['key']}.mp3")]
print(f"{len(items)} frases, {len(todo)} per generar", flush=True)
t0 = time.time()
for n, it in enumerate(todo, 1):
    audio, sr = k.create(it["text"], voice=voice, speed=0.92, lang="en-gb")
    with tempfile.NamedTemporaryFile(suffix=".wav") as w:
        sf.write(w.name, audio, sr)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", w.name, "-af",
                        "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse",
                        "-ac", "1", "-b:a", "40k", f"{outdir}/{it['key']}.mp3"], check=True)
    if n % 20 == 0:
        print(f"{n}/{len(todo)} · {int(time.time()-t0)} s", flush=True)
for f in os.listdir(outdir):
    if f.endswith(".mp3") and f[:-4] not in want:
        os.remove(f"{outdir}/{f}")
json.dump(sorted(want), open(f"{outdir}/index.json", "w"))
print("fet", int(time.time() - t0), "s", flush=True)
