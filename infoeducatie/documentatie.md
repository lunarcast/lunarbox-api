# API-ul pentru Lunarbox

Acesta este API-ul pentru [Lunarbox](https://lunarbox.netlify.app/), o unealta pentru a invata persoane ce nu au mai interactionat cu programarea functionala, principii fundamentale, pentru a-i pune pe calea spre a stapani programarea functionala.

Proiectul a fost scis in [TypeScript](https://www.typescriptlang.org/), o extindere a limbajului arhicunoscut, JavaScript, ce isi propuna sa elimine o problema cruciala a limbajului, si anume lipsa tipurilor, deoarece prefer sa am erori minore la compile-time, decat batai de cap majore in productie. Pot spune ca avantajele folosirii TypeScript-ului sunt enorme.

- Ca MVC Framework am folosit [Koa](https://koajs.com/), o biblioteca care este facuta de echipa din spatele bibliotecii express, aceasta fiind succesorul spiritual al lui Express, fiind ce echipa initiala si-a dorit de la Express.
- Pentru pacakge managementul dependentelor de pe [npm](https://www.npmjs.com/) am folosit [yarn](https://yarnpkg.com/) - un CLI care nu numai ca are o performanta imbunatatita, dar are o gama mai larga de posibile proiect in care poate fi folosit, de la proiecte de incepatori la monorepo-uri gigantice.
- Ca Database Engine am folosit [PostgreSQL](https://www.postgresql.org/), iar pentru query building am folosit [Knex](http://knexjs.org/).
- Pentru hot-reloading(rerulare a programului la fiecare schimbare) am folosit [nodemon](https://nodemon.io/), iar pentru a putea folosi TypeScript direct in development am folosit [ts-node](https://www.npmjs.com/package/ts-node).

## De ce Koa

De a lungul experientei mele cu back-end-ul, am incercat o varietate de framework-uri, dar ce am apreciat la koa cel mai mult a fost modularitatea, simplitatea si minimalismul.

1. **Suport mai bun pentru TypeScript**: Type definition-urile pentru Koa sunt mult mai bine scrise, si mai complexe, ceea ce duce la un mult mai bun suport pentru cei ce vor sa foloseasca Koa impreuna cu TypeScript.

2. **O mai bune performanta**: Pe orice benchmark ne-am uita, vom observa ca Koa are o mult mai buna performanta decat Express daca este folosita in acelasi fel.

3. **Cod modern**: Deoarece Express este vechi, acesta este intepenit cu un codebase scris pentru versiuni vechi de JavaScript(pre-ES6), in timp ce Koa este scris cu ES6+ in minte. De exemplu, Koa are suport built-in pentru middleware-uri asynchronous, ce permite evitarea callback-urilor complet, dar si un mai bun error handling. Alte feature-uri folositoare ar fi two-way communication intre middleware-uri ce muta limita in ceea ce priveste ce poate face un middleware, practic vorbind, la cer.

## De ce Postgres

Nu voi intra in detalii de ce am preferat un engine bazat pe SQL in loc de NoSQL, deoarece consider ca 99% din cazurile in care o baza de date este folosita, informatia stocata in aceasta este relationala. In schimb, fata de alte engine-uri bazate pe SQL, am avut de ales intre PostgreSQL si MySQL, alegand Postgres din varii motive cum ar fi: sintaxa mult mai apropiata de standard-ul SQL, este un engine complet open-source, performanta mai buna conform *unor* benchmark-uri(desi citirea poate fi mai inceata, scrierea este in general mai rapida, iar scrierea in paralel este obiectiv superioara),

## De ce knex

1. **It just works**: Pentru mare parte din experienta mea cu Knex, aceasta a fost foarte straight-forward, definitiile pentru TypeScript fiind incluse cu biblioteca, configurarea fiind relativ flexibila si minimalista
2. **Este strictul necesar**: Fata de un ORM(ex: TypeORM), Knex este doar un query builder, aceasta ocupandu-se doar cu constructia query-urilor si curatarea acestora(pentru prevenirea injectarilor de cod), lasand gestionarea obiectelor in cod la latitudinea utilizatorului, ceea ce consider un plus deoarece imi permite sa pot prelucra informatii scrisa si citita din baza de data cum doresc.

## Arhitectura

Desi TypeScript, si implicit JavaScript, este un limbaj multi-paradigm, am folosit paradigma functionala de programare. Nicio functie nu are effecte secundare si totul este constant.

## Gestionarea codului

De la inceput am folosit [git](https://git-scm.com/). Deoarece in fiecare repository (front-end / back-end) a lucrat o singura persoana am folosit un sistem de branching destul de simplu:

Branchul default este `develop` care contine cele mai recente surse ale aplicatii. Fiecare commit in develop este testat si construit automat folosind GitHub actions. Mereu cand vreau sa fac un release creeez un pull request in `master`. Dupa ce totul e testat si compilat se genereaza un changelog din commituri (acest lucru este posibil deoarece folosesc [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)) si un GitHub release avand ca descriere sectiunea din changelog a respectibului release. Dupa acesti pasi proiectul este publicat automat pe [Heroku](https://www.heroku.com/).

## Structura fisierelor

In folderul [src](../src) se afla urmatoarele fisiere si foldere:

- [index.ts](../src/index.ts) - fisierul care gestioneaza serverul ce foloseste Koa
- [modules](../src/modules) & [common](../src/common) - Aceste foldere contin aplicatia propriu-zisa

### Folderele 'modules' si 'common'

Am ales sa folosesc structura folosita de [WaveDistrict](https://gitlab.com/wavedistrict/web-client/tree/master/src). Aceasta consta in 2 foldere: `common` si `modules`. Acestea contin subfoldere numite dupa functionalitatea pe care o implementeaza. La randul lor, acestea, contin foldere care sunt numite dupa tipul de fisiere continute.

Exemplu:

```bash
/modules
    /user
        /actions
            findUser.ts
        /schema
            registerBody.ts
        router.ts
/common
    /types
        /helpers
            ValueOf.ts
```
