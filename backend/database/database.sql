BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "account" (
	"accountid"	int,
	"login"	text,
	"password"	text,
	"email"	text,
	PRIMARY KEY("accountid")
);
CREATE TABLE IF NOT EXISTS "Cards" (
	"cardsId"	int,
	"accountid"	int,
	"data"	text,
	PRIMARY KEY("cardsId"),
	FOREIGN KEY("accountid") REFERENCES "account"("accountid")
);
CREATE TABLE IF NOT EXISTS "statistic" (
	"accountid"	int,
	"date"	text,
	"lastTask"	int,
	"lastTaskScore"	text,
	"userScore"	text,
	PRIMARY KEY("accountid"),
	FOREIGN KEY("lastTask") REFERENCES "Cards"("cardsId"),
	FOREIGN KEY("accountid") REFERENCES "account"("accountid")
);
CREATE TABLE IF NOT EXISTS "learningCards" (
	"id"	INTEGER,
	"data"	TEXT,
	"accountid"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "achivments" (
	"id"	INTEGER,
	"name"	TEXT,
	"description"	TEXT,
	"path"	TEXT,
	"accountid"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "account" VALUES (1,'Kacper','kacper123','kacper@wp.pl');
INSERT INTO "account" VALUES ('1d6796a2-93ed-4914-8f7a-b5aef91e32e5','kacpirius','kac123','kac1@wp.pl');
INSERT INTO "account" VALUES ('80c0b9b6-b165-4d84-a8ba-cc4b031c49f9','xd1','test','xd@wp.pl');
INSERT INTO "account" VALUES ('112dcae6-8b8b-4d17-80c9-ba977e1f09b2','kolo','test','xd1@wp.pl');
INSERT INTO "Cards" VALUES ('0cb0388a-c31b-480a-ac93-d846982d7f96',1,'{"name":"angielski1","values":[{"id":1,"left":"kot","right":"cat"}]}');
INSERT INTO "Cards" VALUES ('ea67be41-671e-4815-b1ae-8c45a71f90a5',1,'{"name":"słowa","values":[{"id":1,"left":"marichuana","right":"Marichuana"},{"id":2,"left":"rolki","right":"Roll"},{"id":3,"left":"ryba","right":"fish"}]}');
INSERT INTO "Cards" VALUES ('29b8ff5d-30f5-4db2-b661-a7c2714a3544',1,'{"name":"praca","values":[{"id":1,"left":"pies","right":"dog"},{"id":2,"left":"komplet kół","right":"set of wheels"},{"id":3,"left":"jestem w domu","right":"I''m home"},{"id":4,"left":"to jest niedozwolone","right":"This is not allowed"},{"id":5,"left":"burak","right":"beetroot"},{"id":6,"left":"on bardzo lubi jeść brokuły","right":"He is very fond of eating broccoli"},{"id":7,"left":"okazywać uczucia","right":"show affection"},{"id":8,"left":"to jest niespotykane","right":"This is unheard of"},{"id":9,"left":"marchew","right":"carrot"},{"id":10,"left":"myć się","right":"wash yourself"}]}');
INSERT INTO "Cards" VALUES ('3507baae-1a6d-4c52-a9f1-28daa1ee4f50','112dcae6-8b8b-4d17-80c9-ba977e1f09b2','{''name'': ''kot'', ''values'': [{''id'': 1, ''left'': ''jeść'', ''right'': ''eat''}]}');
INSERT INTO "Cards" VALUES ('0ee4073a-ab94-4acf-958c-a371430494b8','112dcae6-8b8b-4d17-80c9-ba977e1f09b2','{''name'': '''', ''values'': [{''id'': 1, ''left'': ''kocham polske'', ''right'': ''I love Poland''}]}');
INSERT INTO "Cards" VALUES ('da661c04-e13c-428f-b2bb-1871cdee12ff','112dcae6-8b8b-4d17-80c9-ba977e1f09b2','{''name'': ''lane'', ''values'': [{''id'': 1, ''left'': ''mieć'', ''right'': ''have''}, {''id'': 2, ''left'': ''miedź'', ''right'': ''copper''}]}');
INSERT INTO "Cards" VALUES ('1b70f9d8-8421-4bb5-b29a-24accbd61c89','112dcae6-8b8b-4d17-80c9-ba977e1f09b2','{''name'': ''ss'', ''values'': [{''id'': 1, ''left'': ''jestem w domu'', ''right'': "I''m home"}]}');
INSERT INTO "Cards" VALUES ('c600ed37-8559-4918-99b8-3f768b230236',1,'{''name'': ''słówka'', ''values'': [{''id'': 1, ''left'': ''pies'', ''right'': ''dog''}, {''id'': 2, ''left'': ''chomik'', ''right'': ''hamster''}, {''id'': 3, ''left'': ''jestem w domu'', ''right'': "I''m home"}, {''id'': 4, ''left'': ''to jest niedozwolone'', ''right'': ''This is not allowed''}, {''id'': 5, ''left'': ''burak'', ''right'': ''beetroot''}, {''id'': 6, ''left'': ''on bardzo lubi jeść brokuły'', ''right'': ''He is very fond of eating broccoli''}, {''id'': 7, ''left'': ''okazywać uczucia'', ''right'': ''show affection''}, {''id'': 8, ''left'': ''to jest niespotykane'', ''right'': ''This is unheard of''}, {''id'': 9, ''left'': ''marchew'', ''right'': ''carrot''}, {''id'': 10, ''left'': ''gotować kolacje'', ''right'': ''cook dinner''}]}');
INSERT INTO "Cards" VALUES ('5dfb14c9-c961-4a6d-abac-952cb0d65296',1,'{''name'': ''okok'', ''values'': [{''id'': 1, ''left'': ''kot'', ''right'': ''cat''}, {''id'': 2, ''left'': ''pies'', ''right'': ''dog''}]}');
INSERT INTO "Cards" VALUES ('ec31a5e1-9691-47f9-b89e-35951c10ff3c',1,'{''name'': ''okok'', ''values'': [{''id'': 1, ''left'': ''kot'', ''right'': ''cat''}, {''id'': 2, ''left'': ''pies'', ''right'': ''dog''}]}');
INSERT INTO "Cards" VALUES ('57d6458e-cbf9-4e00-87e7-cd998bb03792',1,'{''name'': ''okok'', ''values'': [{''id'': 1, ''left'': ''kot'', ''right'': ''cat''}, {''id'': 2, ''left'': ''pies'', ''right'': ''dog''}]}');
INSERT INTO "Cards" VALUES ('ebe51da9-b1b5-4552-991b-8ecf08d9b950',1,'{''name'': ''okok'', ''values'': [{''id'': 1, ''left'': ''kot'', ''right'': ''cat''}, {''id'': 2, ''left'': ''pies'', ''right'': ''dog''}]}');
INSERT INTO "Cards" VALUES ('a82df864-c8f4-406c-895b-985bce268ece',1,'{''name'': ''okok'', ''values'': [{''id'': 1, ''left'': ''kot'', ''right'': ''cat''}, {''id'': 2, ''left'': ''pies'', ''right'': ''dog''}]}');
INSERT INTO "Cards" VALUES ('8847b65c-d8f7-4778-9a73-04c537883050',1,'{''name'': ''okok'', ''values'': [{''id'': 1, ''left'': ''kot'', ''right'': ''cat''}, {''id'': 2, ''left'': ''pies'', ''right'': ''dog''}]}');
INSERT INTO "Cards" VALUES ('3ef64415-16de-4ec9-ac6b-9bb03fa5e91d',1,'{''name'': '''', ''values'': [{''id'': 1, ''left'': ''pies'', ''right'': ''dog''}, {''id'': 2, ''left'': ''komplet kół'', ''right'': ''set of wheels''}, {''id'': 3, ''left'': ''jestem w domu'', ''right'': "I''m home"}, {''id'': 4, ''left'': ''to jest niedozwolone'', ''right'': ''This is not allowed''}, {''id'': 5, ''left'': ''burak'', ''right'': ''beetroot''}, {''id'': 6, ''left'': ''on bardzo lubi jeść brokuły'', ''right'': ''He is very fond of eating broccoli''}, {''id'': 7, ''left'': ''okazywać uczucia'', ''right'': ''show affection''}, {''id'': 8, ''left'': ''to jest niespotykane'', ''right'': ''This is unheard of''}, {''id'': 9, ''left'': ''marchew'', ''right'': ''carrot''}, {''id'': 10, ''left'': ''gotować kolacje'', ''right'': ''cook dinner''}]}');
INSERT INTO "Cards" VALUES ('8f6b4c86-0587-4dad-b6c0-28971c5937b5',1,'{''name'': '''', ''values'': [{''id'': 1, ''left'': ''pies'', ''right'': ''dog''}, {''id'': 2, ''left'': ''komplet kół'', ''right'': ''set of wheels''}, {''id'': 3, ''left'': ''jestem w domu'', ''right'': "I''m home"}, {''id'': 4, ''left'': ''to jest niedozwolone'', ''right'': ''This is not allowed''}, {''id'': 5, ''left'': ''burak'', ''right'': ''beetroot''}, {''id'': 6, ''left'': ''on bardzo lubi jeść brokuły'', ''right'': ''He is very fond of eating broccoli''}, {''id'': 7, ''left'': ''okazywać uczucia'', ''right'': ''show affection''}, {''id'': 8, ''left'': ''to jest niespotykane'', ''right'': ''This is unheard of''}, {''id'': 9, ''left'': ''marchew'', ''right'': ''carrot''}, {''id'': 10, ''left'': ''gotować kolacje'', ''right'': ''cook dinner''}]}');
INSERT INTO "Cards" VALUES ('64893cd9-76f4-4ea7-bed2-3c9e2b8426d5',1,'{''name'': '''', ''values'': [{''id'': 1, ''left'': ''pies'', ''right'': ''dog''}, {''id'': 2, ''left'': ''komplet kół'', ''right'': ''set of wheels''}, {''id'': 3, ''left'': ''jestem w domu'', ''right'': "I''m home"}, {''id'': 4, ''left'': ''to jest niedozwolone'', ''right'': ''This is not allowed''}, {''id'': 5, ''left'': ''burak'', ''right'': ''beetroot''}, {''id'': 6, ''left'': ''on bardzo lubi jeść brokuły'', ''right'': ''He is very fond of eating broccoli''}, {''id'': 7, ''left'': ''okazywać uczucia'', ''right'': ''show affection''}, {''id'': 8, ''left'': ''to jest niespotykane'', ''right'': ''This is unheard of''}, {''id'': 9, ''left'': ''marchew'', ''right'': ''carrot''}, {''id'': 10, ''left'': ''gotować kolacje'', ''right'': ''cook dinner''}]}');
INSERT INTO "Cards" VALUES ('2bddb0fa-dfab-4964-94a2-7c2f33a87672',1,'{''name'': '''', ''values'': [{''id'': 1, ''left'': ''pies'', ''right'': ''dog''}, {''id'': 2, ''left'': ''komplet kół'', ''right'': ''set of wheels''}, {''id'': 3, ''left'': ''jestem w domu'', ''right'': "I''m home"}, {''id'': 4, ''left'': ''to jest niedozwolone'', ''right'': ''This is not allowed''}, {''id'': 5, ''left'': ''burak'', ''right'': ''beetroot''}, {''id'': 6, ''left'': ''on bardzo lubi jeść brokuły'', ''right'': ''He is very fond of eating broccoli''}, {''id'': 7, ''left'': ''okazywać uczucia'', ''right'': ''show affection''}, {''id'': 8, ''left'': ''to jest niespotykane'', ''right'': ''This is unheard of''}, {''id'': 9, ''left'': ''marchew'', ''right'': ''carrot''}, {''id'': 10, ''left'': ''gotować kolacje'', ''right'': ''cook dinner''}]}');
INSERT INTO "statistic" VALUES (1,'12/7/2023',2,'0.814814814814815','15');
INSERT INTO "statistic" VALUES ('112dcae6-8b8b-4d17-80c9-ba977e1f09b2','12/7/2023',5,'0.333333333333333','4');
INSERT INTO "learningCards" VALUES (1,'{"name":"zamów coś","values":[
{"id":1,"left":"cześć","right":"hello"},
{"id":2,"left":"kawa","right":"coffee"},
{"id":3,"left":"herbata","right":"tea"},
{"id":4,"left":"proszę","right":"please"},
{"id":5,"left":"mleko","right":"milk"},
{"id":6,"left":"nie","right":"no"},
{"id":7,"left":"tak","right":"yes"},
{"id":8,"left":"dzień dobry","right":"good morning "},
{"id":9,"left":"dziękuje","right":"thank you"},
{"id":10,"left":"czy","right":"or"},
{"id":11,"left":"chleb","right":"bread"},
{"id":12,"left":"masło","right":"butter"},
{"id":13,"left":"sól","right":"salt"},
{"id":14,"left":"do widzenia","right":"goodbye"},
{"id":15,"left":"woda","right":"water"},
{"id":16,"left":"kawę proszę","right":"coffee please"},
{"id":17,"left":"herbatę proszę","right":"tea please"},
{"id":18,"left":"kawę i herbatę proszę","right":"coffee and tea please"},
{"id":19,"left":"nie dziękuje","right":"no thank you"},
{"id":20,"left":"kawa czy herbata","right":"coffee or tea"},
{"id":21,"left":"masło poproszę","right":"butter please"},
{"id":22,"left":"sól poproszę","right":"salt please"},
{"id":23,"left":"dziekuje do widzenia","right":"thank you goodbye"},
{"id":24,"left":"masło i sól","right":"butter and salt"},
{"id":25,"left":"tak czy nie","right":"yes or no"},
{"id":26,"left":"mleko poproszę","right":"milk please"},
{"id":27,"left":"tak poproszę","right":"yes please"},
{"id":28,"left":"chleb i masło poproszę","right":"bread and butter please"},
{"id":29,"left":"wode poproszę","right":"water please"}
]}','1,2');
INSERT INTO "learningCards" VALUES (2,'{"name":"skąd jesteś","values":[
{"id":1,"left":"Polska","right":"Poland"},
{"id":2,"left":"Ameryka","right":"America"},
{"id":3,"left":"z","right":"from"},
{"id":4,"left":"ja","right":"I"},
{"id":5,"left":"Francja","right":"France"},
{"id":6,"left":"Meksyk","right":"mexico"},
{"id":7,"left":"ty","right":"you"},
{"id":8,"left":"skąd","right":"where"},
{"id":9,"left":"też","right":"also"},
{"id":10,"left":"cześć","right":"hello"},
{"id":11,"left":"mały","right":"small"},
{"id":12,"left":"piekny","right":"beautiful"},
{"id":13,"left":"duży","right":"big"},
{"id":14,"left":"z Ameryki","right":"from America"},
{"id":15,"left":"z Polski","right":"from Poland"},
{"id":16,"left":"ja jestem z Polski","right":"I am from Poland"},
{"id":17,"left":"tak ja jestem z Ameryki","right":"yes I am from America"},
{"id":18,"left":"dzień dobry jestem z Polski","right":"good morning I am from Poland"},
{"id":19,"left":"z Francji","right":"from France"},
{"id":20,"left":"skąd jesteś","right":"where are you from"},
{"id":21,"left":"nie jestem z Meksyku","right":"I am not from Mexico"},
{"id":22,"left":"ja też jestem z Polski","right":"I am also from Poland"},
{"id":23,"left":"cześć skąd jesteś","right":"hello where are you from"},
{"id":24,"left":"ja też jestem z Francji","right":"I am also from France"},
{"id":25,"left":"Polska nie jest mała","right":"Poland is not small"},
{"id":26,"left":"Ameryka jest piękna","right":"America is beautiful"},
{"id":27,"left":"Francja jest duża","right":"France is big"}
]}','1');
INSERT INTO "learningCards" VALUES (3,'{"name":"przywitaj się","values":[
{"id":1,"left":"dobrze","right":"good"},
{"id":2,"left":"dziękuję","right":"thank you"},
{"id":3,"left":"świetnie","right":"great"},
{"id":4,"left":"jak","right":"how"},
{"id":5,"left":"dzień","right":"day"},
{"id":6,"left":"mieć","right":"have"},
{"id":7,"left":"imię","right":"name"},
{"id":8,"left":"moje","right":"my"},
{"id":9,"left":"jest","right":"is"},
{"id":10,"left":"miło","right":"nice"},
{"id":11,"left":"świetnie","right":"great"},
{"id":12,"left":"wieczór","right":"evening"},
{"id":13,"left":"dobranoc","right":"good night"},
{"id":14,"left":"noc","right":"night"},
{"id":15,"left":"dobrze dziękuję","right":"good thank you"},
{"id":16,"left":"jak się masz","right":"how are you"},
{"id":17,"left":"świetnie a ty","right":"great and you"},
{"id":18,"left":"a ty","right":"and you"},
{"id":19,"left":"moje imię jest Jakub","right":"my name is Jakub"},
{"id":20,"left":"miłego dnia","right":"have a good day"},
{"id":21,"left":"miło cię poznać","right":"nice to meet you"},
{"id":22,"left":"miłego wieczoru","right":"have a good evening"},
{"id":23,"left":"do widzenia dobranoc","right":"goodbye good night"},
{"id":24,"left":"miałem dobry dzień","right":"I have a good day"},
]}','1');
INSERT INTO "learningCards" VALUES (4,'{"name":"przedstaw rodzinę","values":[
{"id":1,"left":"rodzina","right":"family"},
{"id":2,"left":"to jest","right":"this is"},
{"id":3,"left":"mama","right":"mom"},
{"id":4,"left":"tata","right":"dad"},
{"id":5,"left":"brat","right":"brother"},
{"id":6,"left":"siostra","right":"sister"},
{"id":7,"left":"rodzeństwo","right":"siblings"},
{"id":8,"left":"wujek","right":"uncle"},
{"id":9,"left":"ciocia","right":"aunt"},
{"id":10,"left":"dziadek","right":"grandfather"},
{"id":11,"left":"babcia","right":"grandmother"},
{"id":12,"left":"to jest mój tata","right":"this is my dad"},
{"id":13,"left":"czy to twoja mama","right":"is this your mom"},
{"id":14,"left":"to jest Jakub mój brat","right":"this is Jakub my brother"},
{"id":15,"left":"to nie jest moja mama to jest moja ciocia","right":"this is not my mom this is my aunt"},
{"id":16,"left":"mój wujek jest z Francji","right":"my uncle is from France"},
{"id":17,"left":"to jest moja siostra Agata","right":"this is my sister Agata"},
{"id":18,"left":"to jest Tomek i Dawid oni są moim rodzeństwerm","right":"this is Tomek and Dawid they are my siblings"},

]}','1');
INSERT INTO "learningCards" VALUES (5,'{"name":"Porozmawiaj o pracy","values":[
{"id":1,"left":"praca","right":"work/job"},
{"id":2,"left":"nauczyciel","right":"teacher"},
{"id":3,"left":"pracownik budowlany","right":"construction worker"},
{"id":4,"left":"programista","right":"programmer"},
{"id":5,"left":"prawnik","right":"lawyer"},
{"id":6,"left":"lekarz","right":"doctor"},
{"id":7,"left":"kurier","right":"courier"},
{"id":8,"left":"sekretarz","right":"secretary"},
{"id":9,"left":"dentysta","right":"dentist"},
{"id":10,"left":"weterynarz","right":"vet"},
{"id":11,"left":"pilot samolotu","right":"pilot"},
{"id":12,"left":"policjant","right":"policeman"},
{"id":13,"left":"strażak","right":"firefighter"},
{"id":14,"left":"mechanik","right":"mechanic"},
{"id":15,"left":"komisariat","right":"police station"},
{"id":16,"left":"szkoła","right":"school"},
{"id":17,"left":"szpital","right":"hospital"},
{"id":18,"left":"gdzie pracujesz","right":"where do you work"},
{"id":19,"left":"pracuje w szpitalu","right":"I work in hospital"},
{"id":20,"left":"czy jesteś nauczycielem","right":"are you a teacher"},
{"id":21,"left":"nie jestem lekarzem","right":"I am not a doctor"},
{"id":22,"left":"czy twoja mama jest prawnikiem","right":"is your mom a lawyer"},
{"id":23,"left":"czy lubisz swoją prace","right":"do you like your job"},
{"id":24,"left":"nie lubie swojej pracy","right":"I don''t like my job"}
]}','1,112dcae6-8b8b-4d17-80c9-ba977e1f09b2');
INSERT INTO "learningCards" VALUES (6,'{"name":"Porozmawiaj o swoim hobby","values":[
{"id":1,"left":"hobby","right":"hobby"},
{"id":2,"left":"muzyka","right":"music"},
{"id":3,"left":"koszykówka","right":"basketball"},
{"id":4,"left":"grać","right":"play"},
{"id":5,"left":"oglądać","right":"watch"},
{"id":6,"left":"słuchać","right":"listen"},
{"id":7,"left":"piłka nożna","right":"soccer"},
{"id":8,"left":"tenis","right":"tennis"},
{"id":9,"left":"gitara","right":"guitar"},
{"id":10,"left":"spiewać","right":"sing"},
{"id":11,"left":"tańczyć","right":"dance"},
{"id":12,"left":"gotować","right":"cook"},
{"id":13,"left":"ulubiony","right":"favorite"},
{"id":14,"left":"gry","right":"games"},
{"id":15,"left":"jakie jest twoje hobby","right":"what is your hobby"},
{"id":16,"left":"lubię grać na gitarze","right":"I like playing guitar"},
{"id":17,"left":"lubię koszykówkę ale tenis to mój ulubiony sport","right":"I like basketball, but tennis is my favorite sport."},
{"id":18,"left":"moja mama lubi gotować","right":"my mom likes to cook"},
{"id":19,"left":"nie lubie piłki nożnej","right":"I don''t like soccer"},
{"id":20,"left":"czy lubisz słuchać muzyki","right":"do you like listening to the music"},
{"id":21,"left":"lubię grać w gry","right":"I like playing games"},
{"id":22,"left":"co lubisz oglądać","right":"what do you like watch"},
{"id":23,"left":"czy lubisz spiewać","right":"do you like singing"},
{"id":24,"left":"czy gotowanie sprawia ci przyjemność","right":"do you enjoy cooking"}
]}',NULL);
INSERT INTO "learningCards" VALUES (8,'{"name":"Pochwal się pupilem","values":[
{"id":1,"left":"zwierzęta domowe","right":"pet"},
{"id":2,"left":"pies","right":"dog"},
{"id":3,"left":"kot","right":"cat"},
{"id":4,"left":"chomik","right":"hamster"},
{"id":5,"left":"królik","right":"rabbit"},
{"id":6,"left":"ryba","right":"fish"},
{"id":7,"left":"klatka","right":"cage"},
{"id":8,"left":"karmić","right":"feed"},
{"id":9,"left":"czyścić","right":"clean"},
{"id":10,"left":"wyprowadzać psa","right":"walk the dog"},
{"id":11,"left":"myć","right":"wash"},
{"id":12,"left":"ptak","right":"bird"},
{"id":13,"left":"czesać psa","right":"brush the dog"},
{"id":14,"left":"kochać","right":"love"},
{"id":15,"left":"czy masz jakieś zwierzęta","right":"do you have a pet"},
{"id":16,"left":"mam dwa chomiki","right":"I have two hamsters"},
{"id":17,"left":"lubisz króliki","right":"do you like rabbits"},
{"id":18,"left":"lubie mojego psa ale nienawidze go czesać","right":"I love my dog but I hate brushing him"},
{"id":19,"left":"mój chomik ma duża klatke","right":"My hamster have a big cage"},
{"id":20,"left":"nienawidzę czyścić klatek po pupilach","right":"I hate cleaning up pet cages"},
{"id":21,"left":"to mój ptak ma na imie Rafał","right":"This is my bird his name is Rafał"},
{"id":22,"left":"mój kot zjadł mi rybkę","right":"my cat eat my fish"},
{"id":23,"left":"kocham psy","right":"I love dogs"},
{"id":24,"left":"czym karmisz króliki","right":"what do you feed the rabbits"}
]}',NULL);
INSERT INTO "learningCards" VALUES (9,'{"name":"Spytaj o drogę","values":[
{"id":1,"left":"pomoc","right":"help"},
{"id":2,"left":"zagubiony","right":"lost"},
{"id":3,"left":"przystanek autobusowy","right":"bus stop"},
{"id":4,"left":"mapa","right":"map"},
{"id":5,"left":"prawo","right":"right"},
{"id":6,"left":"lewo","right":"left"},
{"id":7,"left":"prosto","right":"straight"},
{"id":8,"left":"na rogu","right":"on the corner"},
{"id":9,"left":"stacja kolejowa","right":"train station"},
{"id":10,"left":"na przeciwko","right":"in front"},
{"id":11,"left":"czas","right":"time"},
{"id":12,"left":"pokazać","right":"show"},
{"id":13,"left":"znak","right":"sign"},
{"id":14,"left":"ulica","right":"street"},
{"id":15,"left":"pomóż mi zgubiłem się","right":"help me I am lost"},
{"id":16,"left":"jak długo zajmie mi dotarcie tam","right":"how much time does it take to get there"},
{"id":17,"left":"czy możesz pokazać mi to na mapie","right":"can you show me on the map"},
{"id":18,"left":"czy możesz mi powiedzieć jak dojść do przystanku autobusowego","right":"could you tell me how to get to bus station"},
{"id":19,"left":"gdzie znajdę tą ulice","right":"where can i find this street"},
{"id":20,"left":"idź prosto a potem w lewo","right":"go straight and then left"},
{"id":21,"left":"spróbuj pujść po znakach","right":"try to go by the signs"},
{"id":22,"left":"przepraszam szukam tego adresu","right":"I am sorry i am looking for this address"},
{"id":23,"left":"to jest całkiem blisko","right":"it is quite close"},
{"id":24,"left":"budynek jest po lewej stronie","right":"the building is on the left"}
]}',NULL);
INSERT INTO "achivments" VALUES (1,'Początek podróży','Ukończ swoje pierwsze zadanie','/succes.png','1');
INSERT INTO "achivments" VALUES (2,'Dycha!','Zdobądź 10 punktów za wykonywanie zadań','/star.png','1');
COMMIT;
