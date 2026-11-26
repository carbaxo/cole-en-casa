/* Anglès · Listening: escoltar textos curts i respondre (per al Mario i l'Oliver).
   Format: mira el comentari de dalt de shared/duo.js (sobretot el tipus text amb hear:true).
   Els textos (T1, T2...) es fan servir en diverses preguntes: han de ser exactament la mateixa cadena
   perquè l'àudio gravat (clau = hash del text) sigui el mateix. min:6 = només per a 6è.
   Imatges: noms de shared/angles/img/*.webp (sense extensió). */
window.LISTENING=(()=>{
const U=[];

/* 1 Hello! ------------------------------------------------------ */
{
const T1="Hi! My name is Lucy. I am nine years old and I am from London. I have got a brother. His name is Sam and he is twelve.";
const T2="Hello, I'm Jack. I'm eleven. I'm from Scotland, but now I live in Barcelona with my mum and dad. My best friend is Pau. He is from Barcelona.";
const T3="Good morning, everyone. This is Emma. She is our new friend. She is ten years old and she is from Manchester. Her favourite colour is green and she loves football.";
U.push({id:"lhello",title:"Hello!",sub:"nom · edat · d'on ets",img:"wave",
 learn:[
  {img:"wave",t:"Presentar-se",p:"Per presentar-te en anglès només necessites tres frases: el <b>nom</b>, l'<b>edat</b> i <b>d'on ets</b>.",
   ex:[["My name is Lucy.","Em dic Lucy."],["I am nine years old.","Tinc nou anys."],["I am from London.","Soc de Londres."],["Nice to meet you!","Encantat de conèixer-te!"]],
   tip:"Recorda: l'edat va amb <b>am</b>, no amb <i>have</i>."},
  {img:"question",t:"Les preguntes",p:"Quan escoltis, fixa't en la paraula del principi: et diu què pregunten.",
   ex:[["What's your name?","Com et dius?"],["How old are you?","Quants anys tens?"],["Where are you from?","D'on ets?"],["Who is he?","Qui és ell?"]],
   tip:"<b>What</b> = què · <b>How old</b> = quants anys · <b>Where</b> = on · <b>Who</b> = qui."},
  {img:"thinking",t:"Com escoltar",p:"Escolta el text sencer un cop. Després llegeix la pregunta i torna'l a escoltar. Si va massa ràpid, prem la <b>tortuga</b>.",
   tip:"No cal entendre totes les paraules: busca només la que et pregunten."}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"How old is Lucy?",ca:"Quants anys té la Lucy?",a:"Nine",o:["Twelve","Ten"]},
  {k:"text",hear:true,txt:T1,q:"Where is Lucy from?",ca:"D'on és la Lucy?",a:"London",o:["Scotland","Manchester"]},
  {k:"text",hear:true,txt:T1,q:"What is her brother's name?",ca:"Com es diu el seu germà?",a:"Sam",alt:["Sam."]},
  {k:"match",p:[["Hello!","Hola!"],["What's your name?","Com et dius?"],["How old are you?","Quants anys tens?"],["Where are you from?","D'on ets?"],["Nice to meet you!","Encantat de conèixer-te!"]]},
  {k:"text",hear:true,txt:T2,q:"Where is Jack from?",ca:"D'on és el Jack?",a:"Scotland",o:["Barcelona","London"]},
  {k:"text",hear:true,txt:T2,q:"Jack lives in Barcelona. True or false?",ca:"El Jack viu a Barcelona. Cert o fals?",a:"True",o:["False"]},
  {k:"text",hear:true,txt:T2,q:"Who is Pau?",ca:"Qui és en Pau?",a:"Jack's best friend",o:["Jack's brother","Jack's dad"]},
  {k:"spell",en:"eleven",ca:"onze"},
  {k:"text",hear:true,txt:T3,q:"Emma is eleven. True or false?",ca:"L'Emma té onze anys. Cert o fals?",a:"False",o:["True"]},
  {k:"text",hear:true,txt:T3,q:"What is Emma's favourite colour?",ca:"Quin és el color preferit de l'Emma?",a:"green"},
  {k:"text",hear:true,txt:T3,q:"What does Emma love?",ca:"Què li encanta a l'Emma?",a:"Football",o:["Basketball","Music"]},
  {k:"listen",en:"I am from London.",x:["is","in"],ca:"Soc de Londres."},
  {k:"spell",en:"name",ca:"nom"}
 ]});
}

/* 2 My family --------------------------------------------------- */
{
const T1="This is my family. My mum is Kate and my dad is Peter. I have got one sister, Lily. She is six. We have got a cat called Tiger.";
const T2="Hi, I'm Tom. My grandma and grandpa live in a small house near the sea. My grandpa has got a big grey beard. My grandma makes great cakes. I visit them every Sunday.";
const T3="My cousin Jack is tall and he has got short black hair. His sister Mia is short and she has got long blonde hair. Jack is twelve and Mia is eight.";
U.push({id:"lfamily",title:"My family",sub:"la família",img:"people",
 learn:[
  {img:"people",t:"La família",p:"Les paraules de la família que sentiràs més:",
   ex:[["mum · dad","mare · pare"],["sister · brother","germana · germà"],["grandma · grandpa","àvia · avi"],["cousin","cosí, cosina"],["grandparents","avis"]],
   tip:"A Anglaterra diuen <b>mum</b>, no <i>mom</i>."},
  {img:"girl",t:"Com és?",p:"Per descriure algú fem servir <b>is</b> i <b>has got</b>.",
   ex:[["He is tall.","És alt."],["She is short.","És baixa."],["She has got long blonde hair.","Té els cabells llargs i rossos."],["He has got a beard.","Té barba."]],
   tip:"En anglès el color va <b>davant</b>: <i>black hair</i> = cabells negres."}
 ],
 ex:[
  {k:"match",p:[["mum","mare"],["dad","pare"],["sister","germana"],["brother","germà"],["grandma","àvia"]]},
  {k:"text",hear:true,txt:T1,q:"What is the dad's name?",ca:"Com es diu el pare?",a:"Peter",o:["Kate","Tiger"]},
  {k:"text",hear:true,txt:T1,q:"How old is Lily?",ca:"Quants anys té la Lily?",a:"Six",o:["Seven","Nine"]},
  {k:"text",hear:true,txt:T1,q:"Who is Tiger?",ca:"Qui és en Tiger?",a:"The cat",o:["The sister","The dad"]},
  {k:"spell",en:"sister",ca:"germana"},
  {k:"text",hear:true,txt:T2,q:"Where do Tom's grandparents live?",ca:"On viuen els avis del Tom?",a:"Near the sea",o:["Near the school","In a flat"]},
  {k:"text",hear:true,txt:T2,q:"Who has got a beard?",ca:"Qui té barba?",a:"Grandpa",o:["Grandma","Tom"]},
  {k:"text",hear:true,txt:T2,q:"When does Tom visit them?",ca:"Quan els visita el Tom?",a:"Every Sunday",o:["Every Saturday","Every day"]},
  {k:"listen",en:"My grandma has got a cat.",x:["have","dog"],ca:"La meva àvia té un gat."},
  {k:"text",hear:true,txt:T3,q:"Who has got long blonde hair?",ca:"Qui té els cabells llargs i rossos?",a:"Mia",o:["Jack"]},
  {k:"text",hear:true,txt:T3,q:"Jack is short. True or false?",ca:"El Jack és baix. Cert o fals?",a:"False",o:["True"]},
  {k:"text",hear:true,txt:T3,q:"How old is Mia?",ca:"Quants anys té la Mia?",a:"eight",alt:["8"]},
  {k:"spell",en:"cousin",ca:"cosí"}
 ]});
}

/* 3 My house ---------------------------------------------------- */
{
const T1="I live in a flat in the city. It has got two bedrooms, a kitchen, a bathroom and a living room. There isn't a garden, but there is a big balcony.";
const T2="This is my bedroom. My bed is next to the window. My desk is under the shelf, and my books are on the shelf. My football is under the bed.";
const T3="Sam's house has got a red door and a big garden. In the garden there is a tree and a small pond. Sam's dog sleeps in the kitchen, not in the garden.";
U.push({id:"lhouse",title:"My house",sub:"la casa i l'habitació",img:"house",
 learn:[
  {img:"house",t:"La casa",p:"Les parts de la casa:",
   ex:[["a house · a flat","una casa · un pis"],["the kitchen","la cuina"],["the bathroom","el bany"],["the bedroom","l'habitació"],["the living room","la sala d'estar"],["the garden","el jardí"]],
   tip:"A Anglaterra un pis és un <b>flat</b>."},
  {img:"box",t:"On és?",p:"Les preposicions de lloc et diuen on és cada cosa:",
   ex:[["on the shelf","a sobre del prestatge"],["under the bed","sota el llit"],["in the box","dins la capsa"],["next to the window","al costat de la finestra"]],
   tip:"<b>There is</b> = hi ha (una cosa) · <b>There are</b> = hi ha (moltes)."}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"What kind of home is it?",ca:"Quin tipus de casa és?",a:"A flat",o:["A house","A farm"]},
  {k:"text",hear:true,txt:T1,q:"How many bedrooms are there?",ca:"Quantes habitacions hi ha?",a:"Two",o:["Three","One"]},
  {k:"text",hear:true,txt:T1,q:"There is a garden. True or false?",ca:"Hi ha un jardí. Cert o fals?",a:"False",o:["True"]},
  {k:"match",p:[["kitchen","cuina"],["bathroom","bany"],["bedroom","habitació"],["living room","sala d'estar"],["garden","jardí"]]},
  {k:"text",hear:true,txt:T2,q:"Where is the bed?",ca:"On és el llit?",a:"Next to the window",o:["Under the shelf","Next to the door"]},
  {k:"text",hear:true,txt:T2,q:"Where are the books?",ca:"On són els llibres?",a:"On the shelf",o:["Under the bed","On the desk"]},
  {k:"text",hear:true,txt:T2,q:"Where is the football?",ca:"On és la pilota?",a:"Under the bed",o:["On the bed","Next to the window"]},
  {k:"spell",en:"kitchen",ca:"cuina"},
  {k:"text",hear:true,txt:T3,q:"What colour is the door?",ca:"De quin color és la porta?",a:"red"},
  {k:"text",hear:true,txt:T3,q:"Where does the dog sleep?",ca:"On dorm el gos?",a:"In the kitchen",o:["In the garden","In Sam's bedroom"]},
  {k:"text",hear:true,txt:T3,q:"What is in the garden?",ca:"Què hi ha al jardí?",a:"A tree and a pond",o:["A tree and a dog","A pond and a car"]},
  {k:"listen",en:"The cat is under the table.",x:["on","chair"],ca:"El gat és sota la taula."},
  {k:"spell",en:"window",ca:"finestra"}
 ]});
}

/* 4 At school --------------------------------------------------- */
{
const T1="My name is Emma. My favourite subject is Art. I don't like Maths, because it's difficult. My teacher is Mr Brown. He is very funny.";
const T2="On Monday we have got English at nine o'clock. Then we have got Maths. After lunch we have got PE. I love PE because we play basketball.";
const T3="In my classroom there are twenty-four children. There are four big windows and a whiteboard. I sit next to my friend Jack. We have got the same blue pencil case.";
U.push({id:"lschool",title:"At school",sub:"assignatures i horari",img:"school",
 learn:[
  {img:"books",t:"Les assignatures",p:"Les assignatures en anglès s'escriuen amb <b>majúscula</b>:",
   ex:[["Maths","matemàtiques"],["Science","ciències"],["English","anglès"],["Music","música"],["Art","plàstica"],["PE","educació física"]],
   tip:"<b>PE</b> vol dir <i>Physical Education</i>."},
  {img:"calendar",t:"L'horari",p:"Els dies de la setmana també van amb majúscula:",
   ex:[["Monday · Tuesday · Wednesday","dilluns · dimarts · dimecres"],["Thursday · Friday","dijous · divendres"],["at nine o'clock","a les nou"],["after lunch","després de dinar"]],
   tip:"Amb els dies diem <b>on</b>: <i>on Monday</i>. Amb les hores, <b>at</b>: <i>at nine</i>."}
 ],
 ex:[
  {k:"match",p:[["Maths","matemàtiques"],["Science","ciències"],["Music","música"],["Art","plàstica"],["PE","educació física"]]},
  {k:"text",hear:true,txt:T1,q:"What is Emma's favourite subject?",ca:"Quina és l'assignatura preferida de l'Emma?",a:"Art",o:["Maths","Music"]},
  {k:"text",hear:true,txt:T1,q:"Emma likes Maths. True or false?",ca:"A l'Emma li agraden les mates. Cert o fals?",a:"False",o:["True"]},
  {k:"text",hear:true,txt:T1,q:"Who is Mr Brown?",ca:"Qui és el senyor Brown?",a:"Emma's teacher",o:["Emma's dad","Emma's friend"]},
  {k:"spell",en:"teacher",ca:"mestre"},
  {k:"text",hear:true,txt:T2,q:"What time is English?",ca:"A quina hora és l'anglès?",a:"At nine o'clock",o:["At ten o'clock","After lunch"]},
  {k:"text",hear:true,txt:T2,q:"When is PE?",ca:"Quan és l'educació física?",a:"After lunch",o:["At nine o'clock","Before Maths"]},
  {k:"text",hear:true,txt:T2,q:"What do they play in PE?",ca:"A què juguen a educació física?",a:"Basketball",o:["Football","Tennis"]},
  {k:"listen",en:"We have got Maths on Tuesday.",x:["has","Monday"],ca:"Tenim mates el dimarts."},
  {k:"text",hear:true,txt:T3,q:"How many children are there?",ca:"Quants nens hi ha?",a:"Twenty-four",o:["Fourteen","Twenty"]},
  {k:"text",hear:true,txt:T3,q:"What is the friend's name?",ca:"Com es diu l'amic?",a:"Jack"},
  {k:"text",hear:true,txt:T3,q:"What colour is the pencil case?",ca:"De quin color és l'estoig?",a:"Blue",o:["Red","Green"]},
  {k:"spell",en:"Tuesday",ca:"dimarts"}
 ]});
}

/* 5 Animals ----------------------------------------------------- */
{
const T1="I have got a rabbit. Her name is Snowy. She is white and she has got long ears. She eats carrots and she sleeps a lot.";
const T2="At the zoo we can see a giraffe, two lions and three elephants. The giraffe is very tall. The elephants are big and grey. The lions are sleeping.";
const T3="Penguins are birds, but they can't fly. They can swim very well. They live in cold places and they eat fish. Baby penguins are grey.";
U.push({id:"lanimals",title:"Animals",sub:"mascotes i zoo",img:"giraffe",
 learn:[
  {img:"rabbit",t:"Animals",p:"Animals de casa i del zoo:",
   ex:[["a rabbit · a mouse","un conill · un ratolí"],["a bird · a horse","un ocell · un cavall"],["a giraffe · a lion","una girafa · un lleó"],["an elephant · a penguin","un elefant · un pingüí"]],
   tip:"Davant de vocal diem <b>an</b>: <i>an elephant</i>."},
  {img:"penguin",t:"Què fan?",p:"Per dir el que saben fer els animals, <b>can</b>. Per dir el que no, <b>can't</b>.",
   ex:[["Birds can fly.","Els ocells poden volar."],["Penguins can't fly.","Els pingüins no poden volar."],["It eats carrots.","Menja pastanagues."],["They live in cold places.","Viuen en llocs freds."]],
   tip:"Amb <b>he, she, it</b> el verb porta <b>-s</b>: <i>it eats</i>."}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"What colour is Snowy?",ca:"De quin color és la Snowy?",a:"white"},
  {k:"text",hear:true,txt:T1,q:"What animal is Snowy?",ca:"Quin animal és la Snowy?",a:"A rabbit",o:["A cat","A mouse"]},
  {k:"text",hear:true,txt:T1,q:"What does Snowy eat?",ca:"Què menja la Snowy?",a:"Carrots",o:["Apples","Fish"]},
  {k:"match",p:[["rabbit","conill"],["mouse","ratolí"],["bird","ocell"],["horse","cavall"],["snake","serp"]]},
  {k:"text",hear:true,txt:T2,q:"How many elephants are there?",ca:"Quants elefants hi ha?",a:"Three",o:["Two","One"]},
  {k:"text",hear:true,txt:T2,q:"Which animal is very tall?",ca:"Quin animal és molt alt?",a:"The giraffe",o:["The elephant","The lion"]},
  {k:"text",hear:true,txt:T2,q:"The lions are eating. True or false?",ca:"Els lleons estan menjant. Cert o fals?",a:"False",o:["True"]},
  {k:"spell",en:"giraffe",ca:"girafa"},
  {k:"text",hear:true,txt:T3,q:"Penguins can fly. True or false?",ca:"Els pingüins poden volar. Cert o fals?",a:"False",o:["True"]},
  {k:"text",hear:true,txt:T3,q:"What do penguins eat?",ca:"Què mengen els pingüins?",a:"Fish",o:["Carrots","Birds"]},
  {k:"text",hear:true,txt:T3,q:"What colour are baby penguins?",ca:"De quin color són els pingüins petits?",a:"Grey",o:["Black","White"]},
  {k:"listen",en:"The elephant is big and grey.",x:["are","small"],ca:"L'elefant és gran i gris."},
  {k:"spell",en:"penguin",ca:"pingüí"}
 ]});
}

/* 6 My day ------------------------------------------------------ */
{
const T1="Mia gets up at seven o'clock. She has breakfast with her brother. Then she goes to school by bus at half past eight. She always takes an apple for break time.";
const T2="After school, Jack does his homework. Then he plays football in the park with his friends. He has dinner at eight o'clock and he goes to bed at half past nine.";
const T3="On Saturdays, Lucy gets up late, at ten o'clock. In the morning she goes swimming. In the afternoon she watches TV and reads a book. She never does homework on Saturdays.";
U.push({id:"lday",title:"My day",sub:"rutines i hores",img:"alarm",
 learn:[
  {img:"alarm",t:"La rutina",p:"El que fem cada dia:",
   ex:[["get up","llevar-se"],["have breakfast","esmorzar"],["go to school","anar a l'escola"],["do homework","fer els deures"],["have dinner","sopar"],["go to bed","anar a dormir"]],
   tip:"Amb <b>he</b> i <b>she</b>: <i>she gets up</i>, <i>he goes</i>, <i>she watches</i>."},
  {img:"clock",t:"Les hores",p:"Fixa't bé en l'hora: és el que més pregunten!",
   ex:[["at seven o'clock","a les set"],["at half past eight","a dos quarts de nou"],["in the morning","al matí"],["in the afternoon","a la tarda"],["in the evening","al vespre"]],
   tip:"<b>half past eight</b> = les vuit i mitja (8:30)."}
 ],
 ex:[
  {k:"match",p:[["get up","llevar-se"],["have breakfast","esmorzar"],["have a shower","dutxar-se"],["do homework","fer els deures"],["go to bed","anar a dormir"]]},
  {k:"text",hear:true,txt:T1,q:"What time does Mia get up?",ca:"A quina hora es lleva la Mia?",a:"At seven o'clock",o:["At half past eight","At eight o'clock"]},
  {k:"text",hear:true,txt:T1,q:"How does Mia go to school?",ca:"Com va a l'escola la Mia?",a:"By bus",o:["By car","On foot"]},
  {k:"text",hear:true,txt:T1,q:"Who does Mia have breakfast with?",ca:"Amb qui esmorza la Mia?",a:"Her brother",o:["Her mum","Her friend"]},
  {k:"spell",en:"breakfast",ca:"esmorzar"},
  {k:"text",hear:true,txt:T2,q:"What does Jack do first after school?",ca:"Què fa primer el Jack després de l'escola?",a:"He does his homework",o:["He plays football","He has dinner"]},
  {k:"text",hear:true,txt:T2,q:"Where does Jack play football?",ca:"On juga a futbol el Jack?",a:"In the park",o:["At school","In the garden"]},
  {k:"text",hear:true,txt:T2,q:"What time does Jack go to bed?",ca:"A quina hora va a dormir el Jack?",a:"At half past nine",o:["At eight o'clock","At nine o'clock"]},
  {k:"listen",en:"I go to bed at nine o'clock.",x:["goes","ten"],ca:"Vaig a dormir a les nou."},
  {k:"text",hear:true,txt:T3,q:"What time does Lucy get up on Saturdays?",ca:"A quina hora es lleva la Lucy els dissabtes?",a:"At ten o'clock",o:["At seven o'clock","At nine o'clock"]},
  {k:"text",hear:true,txt:T3,q:"What does Lucy do in the morning?",ca:"Què fa la Lucy al matí?",a:"She goes swimming",o:["She watches TV","She reads a book"]},
  {k:"text",hear:true,txt:T3,q:"Lucy does homework on Saturdays. True or false?",ca:"La Lucy fa deures els dissabtes. Cert o fals?",a:"False",o:["True"]},
  {k:"spell",en:"morning",ca:"matí"}
 ]});
}

/* 7 Food and shopping ------------------------------------------- */
{
const T1="Sam goes to the shop with his mum. They buy apples, bread and milk. Sam wants some chocolate, but his mum says no. She says they have got biscuits at home.";
const T2="At the café, a sandwich costs two pounds and an orange juice costs one pound fifty. An ice cream costs one pound. Emma buys a sandwich and a juice.";
const T3="For lunch, Tom eats pasta with tomato sauce and a salad. He doesn't like fish. For dessert he has a banana, and he drinks water.";
U.push({id:"lshop",title:"Food and shopping",sub:"menjar i preus",img:"pizza",
 learn:[
  {img:"apple",t:"El menjar",p:"Coses que comprem a la botiga:",
   ex:[["bread · milk","pa · llet"],["apples · bananas","pomes · plàtans"],["cheese · chicken","formatge · pollastre"],["orange juice","suc de taronja"],["chocolate","xocolata"]],
   tip:"A Anglaterra paguen amb <b>pounds</b> (lliures) i <b>pence</b>."},
  {img:"gift",t:"Quant costa?",p:"Per preguntar el preu: <b>How much</b>...?",
   ex:[["How much is the bread?","Quant costa el pa?"],["It's one pound fifty.","Costa una lliura cinquanta."],["They're two pounds.","Costen dues lliures."],["Can I have a sandwich, please?","Em dones un entrepà, si us plau?"]],
   tip:"Escolta bé els números: <i>fifteen</i> (15) i <i>fifty</i> (50) s'assemblen!"}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"Who does Sam go to the shop with?",ca:"Amb qui va a la botiga el Sam?",a:"His mum",o:["His dad","His sister"]},
  {k:"text",hear:true,txt:T1,q:"What do they buy?",ca:"Què compren?",a:"Apples, bread and milk",o:["Apples, bread and chocolate","Bananas, bread and milk"]},
  {k:"text",hear:true,txt:T1,q:"Sam's mum buys chocolate. True or false?",ca:"La mare del Sam compra xocolata. Cert o fals?",a:"False",o:["True"]},
  {k:"match",p:[["bread","pa"],["milk","llet"],["cheese","formatge"],["chicken","pollastre"],["orange juice","suc de taronja"]]},
  {k:"text",hear:true,txt:T2,q:"How much is a sandwich?",ca:"Quant costa un entrepà?",a:"Two pounds",o:["One pound","One pound fifty"]},
  {k:"text",hear:true,txt:T2,q:"How much is an ice cream?",ca:"Quant costa un gelat?",a:"One pound",o:["Two pounds","One pound fifty"]},
  {k:"text",hear:true,txt:T2,q:"What does Emma buy?",ca:"Què compra l'Emma?",a:"A sandwich and a juice",o:["A sandwich and an ice cream","An ice cream and a juice"]},
  {k:"spell",en:"sandwich",ca:"entrepà"},
  {k:"text",hear:true,txt:T3,q:"What does Tom eat for lunch?",ca:"Què dina el Tom?",a:"Pasta and salad",o:["Fish and salad","Pasta and fish"]},
  {k:"text",hear:true,txt:T3,q:"What does Tom have for dessert?",ca:"Què pren el Tom de postres?",a:"a banana",alt:["banana","bananas"]},
  {k:"text",hear:true,txt:T3,q:"Tom likes fish. True or false?",ca:"Al Tom li agrada el peix. Cert o fals?",a:"False",o:["True"]},
  {k:"listen",en:"How much is the bread?",x:["many","are"],ca:"Quant costa el pa?"},
  {k:"spell",en:"apple",ca:"poma"}
 ]});
}

/* 8 Weather and clothes ----------------------------------------- */
{
const T1="Today it is cold and windy, and it is raining too. Mia is wearing a yellow raincoat, blue boots and a hat. She has got an umbrella.";
const T2="It is summer and it is very hot and sunny. Jack is at the beach. He is wearing shorts, a T-shirt and sunglasses. He isn't wearing a hat.";
const T3="In winter it snows in the mountains. Emma puts on her warm coat, a scarf and gloves. She makes a snowman with her dad. The snowman has got a carrot nose.";
U.push({id:"lweather",title:"Weather and clothes",sub:"el temps i la roba",img:"umbrella",
 learn:[
  {img:"sun",t:"Quin temps fa?",p:"Per preguntar: <b>What's the weather like?</b>",
   ex:[["It's sunny.","Fa sol."],["It's raining.","Plou."],["It's windy.","Fa vent."],["It's snowing.","Neva."],["It's cold · It's hot","Fa fred · Fa calor"]],
   tip:"Sempre comencem amb <b>It's</b>: <i>It's cold</i> = fa fred."},
  {img:"snowman",t:"La roba",p:"Per dir què porta algú: <b>is wearing</b>.",
   ex:[["She is wearing a raincoat.","Porta un impermeable."],["a jumper · a coat","un jersei · un abric"],["shorts · boots","pantalons curts · botes"],["a scarf · gloves","una bufanda · guants"],["a hat","un barret"]],
   tip:"A Anglaterra un jersei és un <b>jumper</b>."}
 ],
 ex:[
  {k:"match",p:[["sunny","assolellat"],["rainy","plujós"],["windy","ventós"],["snowy","nevat"],["cloudy","ennuvolat"]]},
  {k:"text",hear:true,txt:T1,q:"What's the weather like?",ca:"Quin temps fa?",a:"Cold, windy and rainy",o:["Hot and sunny","Cold and snowy"]},
  {k:"text",hear:true,txt:T1,q:"What colour is Mia's raincoat?",ca:"De quin color és l'impermeable de la Mia?",a:"Yellow",o:["Blue","Red"]},
  {k:"text",hear:true,txt:T1,q:"Mia has got an umbrella. True or false?",ca:"La Mia té un paraigua. Cert o fals?",a:"True",o:["False"]},
  {k:"spell",en:"umbrella",ca:"paraigua"},
  {k:"text",hear:true,txt:T2,q:"Where is Jack?",ca:"On és el Jack?",a:"At the beach",o:["At the park","At school"]},
  {k:"text",hear:true,txt:T2,q:"What is Jack wearing?",ca:"Què porta el Jack?",a:"Shorts and a T-shirt",o:["Jeans and a T-shirt","Shorts and a jumper"]},
  {k:"text",hear:true,txt:T2,q:"Jack is wearing a hat. True or false?",ca:"El Jack porta barret. Cert o fals?",a:"False",o:["True"]},
  {k:"listen",en:"It is sunny and hot today.",x:["cold","are"],ca:"Avui fa sol i calor."},
  {k:"text",hear:true,txt:T3,q:"What does Emma make?",ca:"Què fa l'Emma?",a:"A snowman",o:["A cake","A scarf"]},
  {k:"text",hear:true,txt:T3,q:"Who does Emma make it with?",ca:"Amb qui el fa l'Emma?",a:"Her dad",o:["Her mum","Her brother"]},
  {k:"text",hear:true,txt:T3,q:"What is the snowman's nose?",ca:"Què és el nas del ninot de neu?",a:"A carrot",o:["A banana","A glove"]},
  {k:"spell",en:"jumper",ca:"jersei"}
 ]});
}

/* 9 Last weekend (6è) ------------------------------------------- */
{
const T1="Last Saturday, Sam went to the cinema with his cousin Lucy. They watched a funny film about a dog and a cat. After the film, they had a pizza in a small restaurant near the river. Sam's mum picked them up at nine o'clock.";
const T2="On Sunday morning, Emma and her family went to the mountains. They walked for three hours and they saw lots of birds and a fox. Emma wanted to swim in the lake, but the water was too cold. In the evening she was very tired, so she went to bed early.";
const T3="Last weekend I didn't go out. On Saturday it rained all day, so I stayed at home. I played video games with my brother and I read a book about space. On Sunday I helped my dad in the kitchen. We made a chocolate cake for my grandma's birthday.";
U.push({id:"lweekend",title:"Last weekend",sub:"el passat",img:"kite",min:6,
 learn:[
  {img:"kite",t:"Què vas fer?",p:"Per explicar el cap de setmana fem servir el <b>past simple</b>. Els verbs regulars acaben en <b>-ed</b>:",
   ex:[["We watched a film.","Vam mirar una pel·lícula."],["I stayed at home.","Em vaig quedar a casa."],["She walked for three hours.","Va caminar tres hores."],["It rained all day.","Va ploure tot el dia."]],
   tip:"La <b>-ed</b> de vegades gairebé no se sent: escolta amb atenció!"},
  {img:"thinking",t:"Verbs irregulars",p:"Els més freqüents no porten -ed: canvien.",
   ex:[["go → went","anar → va anar"],["see → saw","veure → va veure"],["have → had","tenir, prendre → va prendre"],["make → made","fer → va fer"],["read → read","llegir → va llegir"]],
   tip:"Negatives: <b>didn't</b> + verb normal: <i>I didn't go out</i>."},
  {img:"calendar",t:"Paraules de temps",p:"Aquestes paraules t'avisen que parlen del passat:",
   ex:[["last Saturday","dissabte passat"],["last weekend","el cap de setmana passat"],["yesterday","ahir"],["after the film","després de la pel·lícula"]]}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"Who did Sam go to the cinema with?",ca:"Amb qui va anar al cinema el Sam?",a:"His cousin Lucy",o:["His mum","His sister Lucy"]},
  {k:"text",hear:true,txt:T1,q:"What did they eat after the film?",ca:"Què van menjar després de la pel·lícula?",a:"A pizza",o:["Popcorn","A sandwich"]},
  {k:"text",hear:true,txt:T1,q:"What time did Sam's mum pick them up?",ca:"A quina hora els va anar a buscar la mare del Sam?",a:"At nine o'clock",o:["At seven o'clock","At eight o'clock"]},
  {k:"match",p:[["went","va anar"],["saw","va veure"],["had","va prendre"],["made","va fer"],["stayed","es va quedar"]]},
  {k:"text",hear:true,txt:T2,q:"Where did Emma go on Sunday?",ca:"On va anar l'Emma diumenge?",a:"To the mountains",o:["To the beach","To the cinema"]},
  {k:"text",hear:true,txt:T2,q:"Which animal did they see?",ca:"Quin animal van veure?",a:"A fox",o:["A rabbit","A horse"]},
  {k:"text",hear:true,txt:T2,q:"Emma swam in the lake. True or false?",ca:"L'Emma es va banyar al llac. Cert o fals?",a:"False",o:["True"]},
  {k:"spell",en:"yesterday",ca:"ahir"},
  {k:"text",hear:true,txt:T3,q:"Why did the speaker stay at home on Saturday?",ca:"Per què es va quedar a casa dissabte?",a:"Because it rained",o:["Because it snowed","Because the brother was ill"]},
  {k:"text",hear:true,txt:T3,q:"What was the book about?",ca:"De què anava el llibre?",a:"space",alt:["about space"]},
  {k:"text",hear:true,txt:T3,q:"Who was the cake for?",ca:"Per a qui era el pastís?",a:"Grandma",o:["Dad","The brother"]},
  {k:"listen",en:"We watched a film last night.",x:["watch","yesterday"],ca:"Ahir a la nit vam mirar una pel·lícula."},
  {k:"spell",en:"weekend",ca:"cap de setmana"}
 ]});
}

/* 10 Holiday plans (6è) ----------------------------------------- */
{
const T1="This summer, Jack and his family are going to travel to Scotland. They are going to stay in a small cottage near a lake for two weeks. Jack is going to go fishing with his dad, and his sister is going to ride a horse.";
const T2="Mia is packing her suitcase. She is going to Italy with her grandparents. She is going to take three T-shirts, two pairs of shorts, her swimsuit and her camera. She isn't going to take her tablet, because she wants to read books on holiday.";
const T3="Tomorrow is the first day of our holiday. I think it will be sunny and hot. We will go to the beach in the morning and we will have lunch at a fish restaurant. In the evening, maybe we will eat ice cream in the town square. I can't wait!";
U.push({id:"lholiday",title:"Holiday plans",sub:"going to · will",img:"beach",min:6,
 learn:[
  {img:"plane",t:"Plans: going to",p:"Per parlar del que <b>ja tenim decidit</b> fem servir <b>be going to</b> + verb.",
   ex:[["We are going to travel to Scotland.","Viatjarem a Escòcia."],["She is going to ride a horse.","Muntarà a cavall."],["I'm not going to take my tablet.","No m'enduré la tauleta."]],
   tip:"Si sents <b>going to</b>, és un pla per al futur."},
  {img:"sun",t:"Prediccions: will",p:"Per dir el que creiem que passarà, <b>will</b> + verb.",
   ex:[["I think it will be sunny.","Crec que farà sol."],["We will go to the beach.","Anirem a la platja."],["Maybe we will eat ice cream.","Potser menjarem gelat."]],
   tip:"Quan parlen ràpid, <i>we will</i> sona <b>we'll</b>."},
  {img:"beach",t:"Les vacances",p:"Paraules que sentiràs:",
   ex:[["a suitcase","una maleta"],["a swimsuit","un banyador"],["a cottage","una caseta al camp"],["a campsite","un càmping"],["on holiday","de vacances"]]}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"Where are they going to travel?",ca:"On viatjaran?",a:"To Scotland",o:["To Ireland","To London"]},
  {k:"text",hear:true,txt:T1,q:"How long are they going to stay?",ca:"Quant de temps s'hi estaran?",a:"Two weeks",o:["One week","Three weeks"]},
  {k:"text",hear:true,txt:T1,q:"Who is going to ride a horse?",ca:"Qui muntarà a cavall?",a:"Jack's sister",o:["Jack","Jack's dad"]},
  {k:"match",p:[["suitcase","maleta"],["passport","passaport"],["swimsuit","banyador"],["campsite","càmping"],["plane","avió"]]},
  {k:"text",hear:true,txt:T2,q:"Who is Mia going to Italy with?",ca:"Amb qui va a Itàlia la Mia?",a:"Her grandparents",o:["Her parents","Her friends"]},
  {k:"text",hear:true,txt:T2,q:"How many T-shirts is she going to take?",ca:"Quantes samarretes s'endurà?",a:"Three",o:["Two","Four"]},
  {k:"text",hear:true,txt:T2,q:"Mia is going to take her tablet. True or false?",ca:"La Mia s'endurà la tauleta. Cert o fals?",a:"False",o:["True"]},
  {k:"spell",en:"suitcase",ca:"maleta"},
  {k:"text",hear:true,txt:T3,q:"When does the holiday start?",ca:"Quan comencen les vacances?",a:"Tomorrow",o:["Today","Next week"]},
  {k:"text",hear:true,txt:T3,q:"Where will they have lunch?",ca:"On dinaran?",a:"At a fish restaurant",o:["At the beach","In the town square"]},
  {k:"text",hear:true,txt:T3,q:"What will they maybe eat in the evening?",ca:"Què potser menjaran al vespre?",a:"ice cream",alt:["an ice cream","icecream","ice creams"]},
  {k:"listen",en:"We are going to visit our cousins.",x:["go","will"],ca:"Anirem a veure els nostres cosins."},
  {k:"spell",en:"holiday",ca:"vacances"}
 ]});
}

/* 11 Directions in town (6è) ------------------------------------ */
{
const T1="Tom asks a woman the way to the library. She says: go straight on and take the second street on the left. The library is next to the post office, opposite the park. It's only a five-minute walk. Tom says thank you and walks to the library with his little sister.";
const T2="Lucy's flat is in the town centre. When she leaves her building, she turns right. She walks past the bakery and the bank. At the traffic lights she crosses the road. Her school is on the corner, behind the sports centre.";
const T3="Welcome to our town. The train station is at the top of the map. Opposite the station there is a big supermarket. The museum is between the cinema and the hospital. If you want a swim, the swimming pool is near the river, next to the police station.";
U.push({id:"ltown",title:"Directions in town",sub:"on és?",img:"point",min:6,
 learn:[
  {img:"point",t:"Donar direccions",p:"Les ordres que sentiràs quan algú t'indica el camí:",
   ex:[["Go straight on.","Ves tot recte."],["Turn left · Turn right","Gira a l'esquerra · Gira a la dreta"],["Take the second street on the left.","Agafa el segon carrer a l'esquerra."],["Cross the road.","Travessa el carrer."]],
   tip:"<b>left</b> = esquerra · <b>right</b> = dreta. Compte a no confondre-les!"},
  {img:"house",t:"On és?",p:"Preposicions per situar llocs:",
   ex:[["next to the bank","al costat del banc"],["opposite the park","davant del parc"],["between the cinema and the hospital","entre el cinema i l'hospital"],["behind the sports centre","darrere del poliesportiu"],["on the corner","a la cantonada"]],
   tip:"<b>opposite</b> = a l'altra banda del carrer, de cara."},
  {img:"bus",t:"Llocs de la ciutat",p:"Alguns llocs que sentiràs:",
   ex:[["the library","la biblioteca"],["the post office","l'oficina de correus"],["the train station","l'estació de tren"],["the bakery","la fleca"],["the swimming pool","la piscina"]],
   tip:"<b>library</b> és biblioteca, no llibreria! Llibreria és <i>bookshop</i>."}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"Where does Tom want to go?",ca:"On vol anar el Tom?",a:"To the library",o:["To the post office","To the park"]},
  {k:"text",hear:true,txt:T1,q:"Which street does he need to take?",ca:"Quin carrer ha d'agafar?",a:"The second on the left",o:["The first on the left","The second on the right"]},
  {k:"text",hear:true,txt:T1,q:"What is opposite the library?",ca:"Què hi ha davant de la biblioteca?",a:"The park",o:["The post office","The station"]},
  {k:"match",p:[["turn left","gira a l'esquerra"],["turn right","gira a la dreta"],["go straight on","ves tot recte"],["opposite","davant de"],["next to","al costat de"]]},
  {k:"text",hear:true,txt:T2,q:"Which way does Lucy turn when she leaves her building?",ca:"Cap a on gira la Lucy quan surt de casa?",a:"Right",o:["Left"]},
  {k:"text",hear:true,txt:T2,q:"What does Lucy walk past?",ca:"Per davant de què passa la Lucy?",a:"The bakery and the bank",o:["The bank and the park","The bakery and the library"]},
  {k:"text",hear:true,txt:T2,q:"Where is Lucy's school?",ca:"On és l'escola de la Lucy?",a:"Behind the sports centre",o:["Next to the bakery","Opposite the bank"]},
  {k:"spell",en:"library",ca:"biblioteca"},
  {k:"text",hear:true,txt:T3,q:"What is opposite the station?",ca:"Què hi ha davant de l'estació?",a:"A supermarket",o:["The museum","The cinema"]},
  {k:"text",hear:true,txt:T3,q:"Where is the museum?",ca:"On és el museu?",a:"Between the cinema and the hospital",o:["Next to the police station","Opposite the station"]},
  {k:"text",hear:true,txt:T3,q:"The swimming pool is near the river. True or false?",ca:"La piscina és a prop del riu. Cert o fals?",a:"True",o:["False"]},
  {k:"listen",en:"Take the first street on the right.",x:["left","second"],ca:"Agafa el primer carrer a la dreta."},
  {k:"spell",en:"station",ca:"estació"}
 ]});
}

/* 12 A phone call and messages (6è) ----------------------------- */
{
const T1="Hi Emma, it's Jack. Are you free on Saturday? It's my birthday and I'm having a party at my house at four o'clock. Please bring your swimsuit, because we're going to play in the pool. Call me back, OK? Bye!";
const T2="Hi Mum, I'm at Sam's house. We're doing our Science project together and it's nearly finished. Can I stay for dinner? Sam's mum is making pasta. Sam's dad can drive me home at eight. Don't worry, I've got my keys. Love, Mia.";
const T3="Hello, this is Lucy from the swimming club. I'm calling about tomorrow's lesson. The pool is closed for cleaning, so there is no lesson on Tuesday this week. The lesson is on Thursday at the same time, half past five. Sorry about that! See you on Thursday.";
U.push({id:"lphone",title:"Phone calls and messages",sub:"trucades i missatges",img:"party",min:6,
 learn:[
  {img:"party",t:"Al telèfon",p:"Al telèfon no diem <i>I am Jack</i>, sinó <b>it's Jack</b> o <b>this is Jack</b>.",
   ex:[["Hello, it's Jack.","Hola, soc el Jack."],["Can I speak to Sam, please?","Puc parlar amb el Sam, si us plau?"],["Who's speaking?","Qui parla?"],["Hold on, please.","Un moment, si us plau."],["Call me back.","Torna'm a trucar."]],
   tip:"En un missatge de veu, la informació important sol ser <b>qui</b>, <b>què</b>, <b>quan</b> i <b>on</b>."},
  {img:"question",t:"Missatges",p:"Els missatges escrits solen començar i acabar així:",
   ex:[["Hi Mum,","Hola, mama,"],["Can I stay for dinner?","Puc quedar-me a sopar?"],["Love, Mia.","Petons, Mia."],["See you soon!","Fins aviat!"]],
   tip:"<b>Are you free on Saturday?</b> = Estàs lliure dissabte? Així es convida algú."}
 ],
 ex:[
  {k:"text",hear:true,txt:T1,q:"Why is Jack calling?",ca:"Per què truca el Jack?",a:"To invite Emma to his party",o:["To ask Emma for her homework","To say happy birthday to Emma"]},
  {k:"text",hear:true,txt:T1,q:"What time is the party?",ca:"A quina hora és la festa?",a:"At four o'clock",o:["At five o'clock","At two o'clock"]},
  {k:"text",hear:true,txt:T1,q:"What does Emma need to bring?",ca:"Què ha de portar l'Emma?",a:"Her swimsuit",o:["A football","Her bike"]},
  {k:"match",p:[["Hold on, please.","Un moment, si us plau."],["Can I speak to Sam?","Puc parlar amb el Sam?"],["Call me back.","Torna'm a trucar."],["See you soon!","Fins aviat!"],["Who's speaking?","Qui parla?"]]},
  {k:"text",hear:true,txt:T2,q:"Where is Mia?",ca:"On és la Mia?",a:"At Sam's house",o:["At school","At home"]},
  {k:"text",hear:true,txt:T2,q:"What are Mia and Sam doing?",ca:"Què estan fent la Mia i el Sam?",a:"A Science project",o:["Maths homework","Dinner"]},
  {k:"text",hear:true,txt:T2,q:"Who can drive Mia home?",ca:"Qui pot portar la Mia a casa?",a:"Sam's dad",o:["Mia's mum","Sam's mum"]},
  {k:"spell",en:"message",ca:"missatge"},
  {k:"text",hear:true,txt:T3,q:"Why is the pool closed?",ca:"Per què està tancada la piscina?",a:"For cleaning",o:["Because it's a holiday","Because Lucy is ill"]},
  {k:"text",hear:true,txt:T3,q:"When is the lesson this week?",ca:"Quan és la classe aquesta setmana?",a:"On Thursday",o:["On Tuesday","On Wednesday"]},
  {k:"text",hear:true,txt:T3,q:"What time is the lesson?",ca:"A quina hora és la classe?",a:"At half past five",o:["At five o'clock","At half past six"]},
  {k:"listen",en:"Can I speak to Lucy, please?",x:["talk","Is"],ca:"Puc parlar amb la Lucy, si us plau?"},
  {k:"spell",en:"tomorrow",ca:"demà"}
 ]});
}

return U;
})();
