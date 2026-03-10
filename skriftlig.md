Databastyper (kursmål 2)

1. Vilka olika typer av databaser finns det? Beskriv kort de vanligaste databastyperna och deras huvudsakliga användningsområden.
Svar:

Det finns flera olika typer av databaser men de vanligaste är SQL och NoSQL databaser.
SQL är relationsdatabaser ex Postgres och MySQL, där datan lagras i tabeller med rader och kolumner. Tabeller kan ha relationer till varandra med foreign keys och primary keys, där en relation kan vara "one to many" eller "many to many". 
SQL är användbart när man behöver ha kontroll över datan, ex hur den får sparas i databasen och man kan styra så att ett fält inte får vara tomt eller värdet måste vara unikt. Detta gör att alla tabeller och kolumner kommer lagra datan på samma sätt, vilket kan vara viktigt på ex en myndighet eller i ett ekonomisystem där viktiga fält som ex personnummer aldrig får lämnas tomt.

No SQL kan exempelvis vara dokumentdatabaser så som MongdoDB där data lagras som dokument i "collections" istället för i tabeller.
Det finns även grafdatabaser som också är NoSQL.

Dokumentdatabaser är inte lika strikta. En "collection" kan innehålla dokument där struktur och fält skiljer sig åt mellan varje.
Detta kan vara fördelaktigt om man behöver sätta upp eller ändra en databasstruktur snabbt och och där datan inte behöver ha strikta relationer till varandra. 


2. Vilken databastyp har ni valt för ert projekt? Motivera ert val genom att jämföra med minst en alternativ databastyp. Beskriv minst en fördel och en nackdel som
databastypen har gett er i erat projekt.
Svar:
I mitt projekt har jag valt relationsdatabas med PostgreSQL som består av tre stycken tabeller med relationer till varandra. 
Ex "one to many" : En "user" kan ha flera "posts" men en "post" kan bara ha en "user". 
På samma sätt är det uppsatt i "posts", där kan en "post" ha flera "comments" men en "comment" är kopplad till en specifik "post"


Jag valde SQL för att jag själv föredrar att arbeta med strukturerad data, då det påminner en del om excel som jag arbetat mycket med tidigare.
Jag tyckte det passade bra för detta projekt då jag visste att jag skulle ha tabeller med relationer till varandra och då passar relationsdatabas bra. En nackdel med detta var att under arbetets gång så ändrade jag riktning, minimalt, men det gjorde ändå att jag stötte på databasfel och fick justera tabellerna och relationerna. Det hade jag sluppit med MongoDb helt och hållet eftersom det är mer flexibelt. 
Men fördelen är istället att det blir väldigt strukturerad data när det väl är klart.

Skalbarhet och arkitektur (kursmål 8)

3. Föreställ er att er backendtjänst används av en mycket stor publik med höga krav på tillgänglighet, prestanda och tillförlitlighet. Det är dessutom kritiskt att inga
requests tappas bort.
Beskriv och motivera hur ni skulle designa eller vidareutveckla er arkitektur för att:
hantera hög belastning
säkerställa hög tillgänglighet
undvika förlorade requests
bibehålla god responstid
Ge minst 2 exempel på åtgärder ni skulle vidta för att bemöta detta behov.
Svar:

4. Beskriv hur ert Node.js-projekt är strukturerat. Vilka lager eller moduler har ni delat upp koden i, och varför? Förklara hur er struktur bidrar till att koden blir lättare att
underhålla eller vidareutveckla.
Beskriv er projektstruktur och motivera minst ett strukturellt val. Om ni har följt ett namngivet designmönster, så ska ni beskriva hur er struktur följer detta mönster
och förklara fördelarna med det.
Svar:

Jag har valt att strukturera projektet i tydliga lager enligt MVC där varje lager har sitt ansvar. 
När en request kommer i når den först mina "Routes" där jag har mina middlewares så som schema och authplugin som validerar att inputen följer min uppsättning och att användaren är autentiserad med en token.

Om schema och auth går igenom skickas det vidare till "Controller" som läser av requesten och hämtar body och params för att sen skicka vidare till "Service".
I "Service" har jag min affärslogik som validerar datan och avgör vilka regler som gäller, ex om användaren finns och vilket eventuellt fel som ska kastas . Jag har även valt att ha Repository Pattern genom att ha "repository" som enda "väg" till databasen. Repository lagret innehåller all SQL är en dess ansvar är enbart att prata med databasen. 

Om något är fel i ett av lagren så stoppas requesten direkt med en global error-handling struktur som fångar felet och kastar konsekvent felmeddelande tillbaka till klienten.

Jag tycker att fördelen med denna uppsättning är att en requests "livscykel" blir väldigt tydlig och det är lätt att både skala upp och ned vid behov. Det är även lätt att felsöka, eftersom var sak har sin plats i projektet. Varje lager har ett tydligt ansvar och varje modul gör bara det den ska göra.

Säkerhet (kursmål 3)

5. Beskriv vanliga säkerhetshot mot webbapplikationer (t.ex. från OWASP Top 10). Förklara kort hur varje hot fungerar och vilka konsekvenser det kan få om det utnyttjas.
Beskriv minst 2 hot.

SQL injection, där man från klienten genom data input kan påverka en SQL fråga om man inte har säkrat upp sin SQL kod. Om input från användaren sätts direkt in i en query kan en angripare skriva egen SQL kod i inputfält. Detta kan leda till att angriparen kan läsa, ändra eller radera data i databasen och i värsta fall få full kontroll över databasen.

Broken Access Control, där backend inte kontrollerar rättigheter korrekt. En användare kan då få åtkomst till resurser eller funktioner som den egentligen inte ska ha tillgång till, till exempel att en vanlig användare kan ta bort andra användares data eller komma åt admin-funktioner. Detta kan leda till att känslig information läcker eller att data manipuleras av obehöriga användare.

Svar:

6. Vilka säkerhetsåtgärder har ni implementerat i ert API? Beskriv hur varje åtgärd skyddar mot ett specifikt hot och motivera varför ni valde just dessa. Om ni ser
brister eller saknade skydd i er nuvarande implementation, beskriv vad ni hade lagt till givet mer tid.
Beskriv minst 2 åtgärder samt identifiera minst 1 brist.
Svar:


Node.js vs PHP (kursmål 9)

7. Jämför Node.js och PHP som backend-tekniker utifrån följande perspektiv: arkitektur, ekosystem och prestanda. Beskriv likheter och skillnader.
Jämför utifrån minst 2 perspektiv.
Svar:
8. Vilken av teknikerna (Node.js eller PHP) föredrar ni för backendutveckling? Motivera ert val och beskriv i vilken typ av projekt den ena tekniken hade passat bättre
än den andra.
Svar