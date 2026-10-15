# Agent V1 — OpenClaw downstream

Agent V1 è il progetto downstream costruito sopra OpenClaw. Il core OpenClaw resta la piattaforma di riferimento; le capacità specifiche del progetto vengono aggiunte tramite plugin, skill, tool e configurazione, senza duplicare owner già presenti nel core.

## Obiettivo iniziale

Costruire un agente local-first capace di:

- usare modelli locali e OpenRouter;
- gestire contesto e stato persistente;
- eseguire task semplici e complessi con routing del modello;
- usare retrieval/RAG ed embeddings;
- comprendere immagini e documenti, inclusi OCR/vision;
- estendersi in seguito a domini applicativi specifici.

## Base canonica

- Upstream: `https://github.com/openclaw/openclaw`
- Commit upstream importato: vedere `.openclaw-upstream-sha`
- Core: OpenClaw `2026.10.3` al momento della baseline
- Licenza upstream: MIT
- Downstream repository: `siermetluca/Agent-V1`

## Fonti canoniche del progetto

Leggere nell'ordine:

1. `AGENTS.md`
2. `PROJECT.md`
3. `docs/project/CONTEXT.md`
4. `docs/project/STATE.md`
5. `docs/project/GOVERNANCE.md`
6. `docs/project/ARCHITECTURE.md`
7. l'`AGENTS.md` più vicino ai file interessati dal task

Le istruzioni OpenClaw continuano ad applicarsi a tutto il core. Le regole del progetto possono restringere il comportamento, non indebolire sicurezza, ownership o autorizzazioni upstream.

## Principio di estensione

`existing OpenClaw owner -> existing Plugin SDK contract -> project plugin/skill/tool -> core change only if a proven generic gap exists`

Il primo boundary downstream è `extensions/agent-v1/`.
