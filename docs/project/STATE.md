# Stato progetto

Aggiornato: 2026-10-16

## Fase

`OPENCLAW_FOUNDATION`

## Componenti

| Componente                  | Stato                  | Owner                                       |
| --------------------------- | ---------------------- | ------------------------------------------- |
| OpenClaw baseline           | ACTIVE                 | upstream/downstream sync                    |
| Project governance          | ACTIVE                 | `docs/project/GOVERNANCE.md`                |
| Project context             | ACTIVE                 | `docs/project/CONTEXT.md`                   |
| Project state               | ACTIVE                 | questo file                                 |
| Project architecture        | ACTIVE                 | `docs/project/ARCHITECTURE.md`              |
| Agent V1 plugin boundary    | ACTIVE                 | `extensions/agent-v1/`                      |
| Ollama runtime              | VERIFIED_OPENCLAW      | host locale / provider OpenClaw             |
| `qwen3:14b`                 | VERIFIED_OPENCLAW      | `ollama/qwen3:14b`                          |
| `qwen3-vl:8b`               | VERIFIED_OPENCLAW      | `ollama/qwen3-vl:8b`                        |
| OpenRouter                  | VERIFIED               | OAuth/provider OpenClaw                     |
| CEO agent                   | VERIFIED               | `ceo`, modello `openrouter/openrouter/free` |
| Gmail OAuth read-only       | VERIFIED               | Google Workspace CLI locale + keyring       |
| Gmail controlled tools      | VERIFIED_RUNTIME       | `extensions/agent-v1/`                      |
| Gateway + Control UI        | VERIFIED_RUNNING       | `127.0.0.1:18789`                           |
| Build OpenClaw + Control UI | VERIFIED               | OpenClaw 2026.10.3                          |
| Model router automatico     | NOT_IMPLEMENTED        | routing automatico ancora da definire       |
| RAG/retrieval               | DISCOVERY              | prima riuso OpenClaw, poi gap analysis      |
| Embeddings                  | UNDECIDED              | provider/extension                          |
| OCR/vision                  | AVAILABLE_TO_INTEGRATE | local multimodal model                      |
| Domain modules              | DEFERRED               | project extensions                          |

## Runtime state

Lo stato runtime dell'agente NON viene salvato in file YAML/JSON di progetto. Usa gli owner storage/state OpenClaw e il profilo locale sotto `~/.openclaw`. Questo documento descrive esclusivamente lo stato di sviluppo del progetto.

## Blocco corrente

`FOUNDATION-OPENCLAW-01`

- [x] dipendenze pnpm installate e lockfile allineato;
- [x] build OpenClaw e Control UI verificate;
- [x] Ollama configurato tramite OpenClaw;
- [x] smoke locale modelli verificato;
- [x] Gateway verificato su loopback;
- [x] OpenRouter verificato;
- [x] CEO creato e smoke test completato;
- [x] Gmail OAuth limitato a `gmail.readonly`;
- [x] plugin Gmail read-only validato dal validator nativo;
- [x] `agent_v1_gmail_search` validato end-to-end dal CEO;
- [x] policy CEO nega `group:runtime` e `terminal`;
- [ ] reducer/summarizer locale per eventuale contenuto email;
- [ ] definizione del routing automatico local/cloud;
- [ ] integrazione del prossimo strumento utente.

## Gmail boundary validato

Il CEO non riceve accesso generico a `gws` o alla shell. Il plugin usa un binario fisso locale e restituisce solo output minimizzato. Non sono implementate capability di invio, modifica o cancellazione. Il body dei messaggi non viene esposto al CEO cloud.

## Ambiente macOS

- `Agent-V1.app` è installata in `/Applications` dalla release ufficiale firmata OpenClaw 2026.10.3 arm64.
- Gateway verificato unico su `127.0.0.1:18789`.
- Runtime CLI/Gateway usa il profilo locale `~/.openclaw`.
- La repository canonica resta `/Users/gianlucatreppete/Seshix/developed/agent-v1`.
