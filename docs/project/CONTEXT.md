# Contesto canonico

## FACT

- Il progetto parte da OpenClaw e ne preserva l'architettura principale.
- Il repository locale canonico è `/Users/gianlucatreppete/Seshix/developed/agent-v1`.
- Il precedente prototipo è conservato in `/Users/gianlucatreppete/Seshix/developed/agent-v1-pre-openclaw-20261015`.
- OpenClaw è un workspace TypeScript/pnpm con Gateway, agent runtime, provider, tool, plugin SDK, memoria, sessioni, UI e storage.
- Il Plugin SDK è il boundary supportato per le estensioni; un plugin downstream non deve importare internals `src/**`.
- OpenClaw supporta SQLite e PostgreSQL come database engine.
- Sul Mac Studio sono verificati `ollama/qwen3:14b` per reasoning locale e `ollama/qwen3-vl:8b` per vision/OCR.
- OpenRouter è autenticato e verificato; l'agente `ceo` usa `openrouter/openrouter/free`, mentre il modello di default resta locale.
- Il Gateway locale è verificato su `127.0.0.1:18789`.
- Gmail è autenticato tramite OAuth con scope `gmail.readonly`; le credenziali sono cifrate nel keyring locale e non appartengono alla repository.
- Il plugin `extensions/agent-v1/` espone `agent_v1_gmail_search` e `agent_v1_gmail_get_metadata` come tool opzionali senza workspace access.
- Il runtime ha caricato il plugin da `plugins.load.paths`; il validator nativo OpenClaw lo considera valido.
- Il CEO ha completato uno smoke test end-to-end del tool `agent_v1_gmail_search`.
- Il CEO ha un deny esplicito su `group:runtime` e `terminal`; non riceve quindi accesso generico a shell/exec per usare Gmail.

## DECISION

- OpenClaw è la piattaforma base del primo agente.
- Il core OpenClaw non viene modificato per aggiungere domini se la capability è esprimibile tramite Plugin SDK, skill o tool.
- Runtime state, session lifecycle, autorizzazioni e storage restano sotto gli owner OpenClaw esistenti.
- Le funzioni di dominio partono da `extensions/agent-v1/` e da skill/tool collegati.
- La strategia modello è local-first con OpenRouter disponibile per escalation; il routing automatico deve essere validato prima di essere attivato.
- Nessuna chiave API, token OAuth, refresh token o client secret viene committato.
- Ogni task entra con contesto pertinente e produce un aggiornamento di stato solo dopo validazione.
- I connettori utente seguono least privilege e vengono integrati uno per volta.
- Gmail Stage 1 è esclusivamente read-only. Il CEO vede soltanto dati minimizzati: ricerca con ID opachi e metadati ridotti.
- `snippet`, subject, body, allegati, destinatari, custom label e indirizzo completo del mittente non devono uscire dal boundary locale del connettore Stage 1.
- La lettura del body email non viene esposta direttamente al CEO cloud. Prima di abilitarla deve esistere un reducer/summarizer locale con contratto esplicito di minimizzazione.
- Il CEO non deve ricevere un tool shell o `gws` generico per l'accesso Gmail; il plugin deve usare il runner OpenClaw con eseguibile fisso e argv validati.

## UNKNOWN

- Regole finali del model router e soglie di escalation OpenRouter.
- Embedding model definitivo.
- Reranker definitivo.
- Backend RAG definitivo: valutare prima le capability OpenClaw esistenti e benchmarkare eventuali estensioni.
- Politiche di retention e classificazione dati per i futuri domini.
- Contratto del futuro reducer/summarizer locale per body e allegati email.
- Prossimo strumento utente da integrare dopo Gmail Stage 1.

## CONFLICT

Nessun conflitto architetturale aperto sul boundary Gmail Stage 1. La precedente architettura Python/LangGraph/PydanticAI non è il runtime canonico: le sue responsabilità devono essere prima mappate sugli owner OpenClaw esistenti.
