# Agent V1 Extension

Questo package è il boundary downstream del progetto.

Prima di modificarlo leggere:

- `/PROJECT.md`
- `/docs/project/CONTEXT.md`
- `/docs/project/STATE.md`
- `/docs/project/GOVERNANCE.md`
- `/docs/project/ARCHITECTURE.md`
- `/extensions/AGENTS.md`
- `/src/plugin-sdk/AGENTS.md`

Regole:

- import di produzione solo da `openclaw/plugin-sdk/*` e file locali del package;
- nessun import diretto da `/src/**` o internals di altri plugin;
- nessun nuovo store parallelo per session/state;
- nessun side effect esterno senza capability/approval appropriata;
- nessuna credenziale nel repository;
- capability nuove solo dopo inventario del riuso possibile nel core/SDK;
- aggiornare Context/State quando una decisione o capability cambia stato.
