Databastyper (kursmål 2)

1. Vilka olika typer av databaser finns det? Beskriv kort de vanligaste databastyperna och deras huvudsakliga användningsområden.
   Svar:

Det finns flera olika typer av databaser men de vanligaste är relationsdatabaser (SQL) och NoSQL databaser.
För relationsdatabaser finns det ex PostgresSQL och MySQL, där datan lagras i tabeller med rader och kolumner. Tabeller kan ha relationer till varandra med foreign keys och primary keys, där en relation kan vara "one to many" eller "many to many".
SQL är användbart när man behöver ha kontroll över datan, ex hur den får sparas i databasen och man kan styra så att ett fält inte får vara tomt eller värdet måste vara unikt. Detta gör att alla tabeller och kolumner kommer lagra datan på samma sätt, vilket kan vara viktigt på ex en myndighet eller i ett ekonomisystem där viktiga fält som ex personnummer aldrig får lämnas tomt.

No SQL kan exempelvis vara dokumentdatabaser så som MongdoDB där data lagras som dokument i "collections" istället för i tabeller.
Det finns även grafdatabaser, som ofta räknas som en typ av NoSQL-databaser.

Dokumentdatabaser är inte lika strikta. En "collection" kan innehålla dokument där struktur och fält skiljer sig åt mellan dokumenten och det kan vara fördelaktigt om man behöver sätta upp eller ändra en databasstruktur snabbt, eller där datan inte behöver ha strikta relationer till varandra.

2. Vilken databastyp har ni valt för ert projekt? Motivera ert val genom att jämföra med minst en alternativ databastyp. Beskriv minst en fördel och en nackdel som
   databastypen har gett er i erat projekt.
   Svar:

Jag valt relationsdatabas med PostgreSQL som består av tre stycken tabeller med relationer till varandra.
Ex "one to many" : En "user" kan ha flera "posts" men en "post" kan bara ha en "user".
På samma sätt är det uppsatt i "posts", där kan en "post" ha flera "comments" men en "comment" är kopplad till en specifik "post"

Jag valde SQL för att jag själv föredrar att arbeta med strukturerad data, då det påminner en del om excel som jag arbetat mycket med tidigare.
Jag tyckte det passade bra för detta projekt då jag visste att jag skulle ha tabeller med relationer till varandra och då passar relationsdatabas bra. En nackdel med detta var att under arbetets gång så ändrade jag riktning, minimalt, men det gjorde ändå att jag stötte på databasfel och fick justera tabellerna och relationerna.
Det hade varit lättare att ändra datastrukturen med MongoDB eftersom dokumentdatabaser är mer flexibla.
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

Jag hade valt att lägga till en connection pool mot databasen för att hantera många anrop för bättre prestanda. I min nuvarande app skulle svarstiden för varje anrop kunna bli sämre vid hög belastning.
Jag hade valt att logga alla felmeddelanden i en egen tabell i databasen så att jag snabbt kan följa upp och felsöka om ett fel inträffar. I min nuvarande uppsättning skulle ett fel gå förlorat.

Jag hade också valt att använda mig av cache för att inte minska antalet anrop mot databasen vid återkommande anrop, så som GET/posts, som hämtar alla inlägg varje gång sidan laddas om.
Jag har hört lite om Redis och att det skulle kunna vara en lösning för en större applikation.

4. Beskriv hur ert Node.js-projekt är strukturerat. Vilka lager eller moduler har ni delat upp koden i, och varför? Förklara hur er struktur bidrar till att koden blir lättare att
   underhålla eller vidareutveckla.
   Beskriv er projektstruktur och motivera minst ett strukturellt val. Om ni har följt ett namngivet designmönster, så ska ni beskriva hur er struktur följer detta mönster
   och förklara fördelarna med det.
   Svar:

Jag har valt att strukturera projektet i tydliga lager inspirerat av MVC tillsammans med Repository Pattern.
När en request kommer in går den först via mina routes där middlewares används, till exempel schema validering och auth-plugin, som validerar att inputen följer min uppsättning och att användaren är autentiserad med en token.

Om requesten tar sig igenom schema och auth så skickas det vidare till "Controller" som läser av requesten och hämtar body och params för att sen skicka vidare till "Service".
I "Service" har jag min affärslogik som validerar datan och avgör vilka regler som gäller, ex om användaren finns och vilket eventuellt fel som ska kastas . Jag har även valt att ha Repository Pattern genom att ha "repository" som enda "väg" till databasen. Repository lagret innehåller all SQL och dess ansvar är enbart att prata med databasen.

Om något är fel i ett av lagren så stoppas requesten direkt med en global error-handling struktur som fångar felet och kastar ett standard felmeddelande tillbaka till klienten.

Jag tycker att fördelen med denna uppsättning är att en requests "livscykel" blir väldigt tydlig och det är lätt att både skala upp och ned vid behov. Det är även lätt att felsöka, eftersom var sak har sin plats i projektet. Varje lager har ett tydligt ansvar och varje modul gör bara det den ska göra.

Säkerhet (kursmål 3)

5. Beskriv vanliga säkerhetshot mot webbapplikationer (t.ex. från OWASP Top 10). Förklara kort hur varje hot fungerar och vilka konsekvenser det kan få om det utnyttjas.
   Beskriv minst 2 hot.

SQL injection, där man från klienten kan påverka en SQL fråga mot databasen om man inte har säkrat upp SQL koden. Detta görs om input från användaren sätts direkt in i en query mot databasen och kan leda till att angriparen kan läsa, ändra eller radera data i databasen och i värsta fall få full kontroll över databasen.

Broken Access Control betyder att backend inte kontrollerar rättigheter rätt och en användare kan då få åtkomst till funktioner som den egentligen inte ska ha tillgång till, ex att en vanlig användare kan ta bort andra användares data eller komma åt admin-funktioner. Detta kan leda till att känslig information läcker eller att data kan manipuleras av obehöriga användare.

Svar:

6. Vilka säkerhetsåtgärder har ni implementerat i ert API? Beskriv hur varje åtgärd skyddar mot ett specifikt hot och motivera varför ni valde just dessa. Om ni ser
   brister eller saknade skydd i er nuvarande implementation, beskriv vad ni hade lagt till givet mer tid.
   Beskriv minst 2 åtgärder samt identifiera minst 1 brist.
   Svar:

Jag har valt att implementera:

- Helmet som sätter security Headers för att skydda mot ex clickjacking. Det var en väldigt liten mängd kod som verkar göra stor skillnad för appens säkerhet därför valde jag att ta med.
- CORS som bla begräsar vilka klienter som kan göra anrop från webbläsare till APIet och att man kan definera vilka metoder ex GET som är godkända, vilket dels behövdes då jag har en liten Frontend i React. Men det ger också ett gott skydd mot attacker och obehörig tillgång till APIet.
- Input Sanitation, (SantizieHTML) som städar texten i inputfälten för Posts och Comments och förhindrar att kod försöker köras då alla HTML taggar tas bort och texten trimmas innan den når databasen.
  Jag tyckte detta var viktigt då min app hanterar input från användare och jag vill minimera risken att någon försöker exekvera skadlig kod. (XSS)

Vid mer tid hade jag lagt till Rate Limiting för att lägga in ett skydd mot brute force attacker samt lagt mer tid på roles och permissions i Auth0.
Eftersom jag har valt att inte skicka role i token från Auth0, utan enbart permissions så kan jag utöka skyddet på flera endpoints genom att lägga till fler permissions för både user och admin och på så sätt styra vem som får göra vad.

Node.js vs PHP (kursmål 9)

7. Jämför Node.js och PHP som backend-tekniker utifrån följande perspektiv: arkitektur, ekosystem och prestanda. Beskriv likheter och skillnader.
   Jämför utifrån minst 2 perspektiv.
   Svar:

Även om syntaxen är annorlunda i PHP så följer båda liknande strukturer för att bygga upp backenden. Jag gjorde PHP projektet efter att jag gjort klart Fastify/Bun projektet och insåg att det krävdes mindre kod och tid med PHP för att göra "samma" sak som jag redan spenderat timmar på att göra i Fastify.
Nu använde jag inga ramverk för PHP, utan körde bara “vanlig” PHP men det kändes ganska “basic” och okrångligt när jag väl kommit in i det.
När jag har sökt runt för att läsa mer om PHP så hittar jag väldigt mycket stabil information, guider och tutorials, vilket är förståeligt eftersom det är ett mycket äldre och stabilt språk med ett stort community.
Dock för en juniorutvecklare känns Fastify och Bun mycket modernare, snabbare och bättre prestanda och att det snygga skalet eller paketeringen lockar.

Jag ser fördelarna med båda språken men en sak jag verkligen gillade med PHP är att det gick så snabbt att sätta upp en backend och frontend tillsammans i och med att hela appen körs server side.

8. Vilken av teknikerna (Node.js eller PHP) föredrar ni för backendutveckling? Motivera ert val och beskriv i vilken typ av projekt den ena tekniken hade passat bättre
   än den andra.
   Svar:

Jag föredrar Bun/Node.js/Fastify enbart för att det känns tryggt med typescript och att det är så jag har lärt mig. Men efter att ha gjort php-projektet, även om det var litet, så vill jag utforska det mer och även lära mig mer om objektorienterad programmering.

Jag gillade enkelheten i PHP och nu i efterhand önskar jag att jag hade haft mer tid att lära mig Laravel eller annat ramverk för att sätta upp projektet exakt som i Fastify/bun.
Mitt projekt, som egentligen började som ett blogg-api, passar jättebra i PHP men exempelvis projektet med Chatappen hade nog inte passat lika bra pga att den behöver hålla anslutningen öppen för att lyssna på servern efter nya meddelanden, medan PHP skickar request och response vilket skulle starta en ny process ex vid varje nytt meddelande.
Det går kanske att lösa med ramverk och plugins för PHP men jag har förstått att real time lösningar inte är optimalt för PHP.
Med det sagt upplever jag Bun/Fastify som mer mångsidigt.
