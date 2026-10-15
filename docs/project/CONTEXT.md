# Contesto canonico

## FACT

- Il progetto parte da OpenClaw e ne preserva l'architettura principale.
- Il repository locale canonico è `/Users/gianlucatreppete/Seshix/developed/agent-v1`.
- Il precedente prototipo è conservato in `/Users/gianlucatreppete/Seshix/developed/agent-v1-pre-openclaw-20261015`.
- OpenClaw è un workspace TypeScript/pnpm con Gateway, agent runtime, provider, tool, plugin SDK, memoria, sessioni, UI e storage.
- Il Plugin SDK è il boundary supportato per le estensioni; un plugin downstream non deve importare internals `src/**`.
- OpenClaw supporta SQLite e PostgreSQL come database engine.
- Le preferenze modello del progetto sono OpenRouter per cloud e modelli locali per esecuzione locale.
- Sul Mac Studio è installato Ollama ed è stato verificato `qwen3-vl:8b`; il modello ha risposto correttamente a uno smoke test locale.
- Il sistema deve sostenere retrieval/RAG, contesto, stato, task semplici e complessi, OCR e vision.

## DECISION

- OpenClaw è la piattaforma base del primo agente.
- Il core OpenClaw non viene modificato per aggiungere domini se la capability è esprimibile tramite Plugin SDK, skill o tool.
- Runtime state, session lifecycle, autorizzazioni e storage restano sotto gli owner OpenClaw esistenti.
- Le nostre funzioni di dominio partono da `extensions/agent-v1/` e da skill/tool collegati.
- La strategia modello è local-first con OpenRouter disponibile per escalation; il routing preciso deve essere validato prima di essere reso automatico.
- Nessuna chiave API o credenziale viene committata.
- Ogni task entra con contesto pertinente e produce un aggiornamento di stato solo dopo validazione.

## UNKNOWN

- Modello locale principale per reasoning oltre a `qwen3-vl:8b`.
- Regole finali del model router e soglie di escalation OpenRouter.
- Embedding model definitivo.
- Reranker definitivo.
- Backend RAG definitivo: valutare prima le capability OpenClaw esistenti e benchmarkare eventuali estensioni.
- Politiche di retention e classificazione dati per i futuri domini.

## CONFLICT

Nessun conflitto architetturale aperto alla baseline. La precedente architettura Python/LangGraph/PydanticAI non è più il runtime canonico: le sue responsabilità devono essere prima mappate sugli owner OpenClaw esistenti.
