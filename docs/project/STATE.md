# Stato progetto

Aggiornato: 2026-10-15

## Fase

`OPENCLAW_FOUNDATION`

## Componenti

| Componente                  | Stato                  | Owner                                                   |
| --------------------------- | ---------------------- | ------------------------------------------------------- |
| OpenClaw baseline           | ACTIVE                 | upstream/downstream sync                                |
| Project governance          | ACTIVE                 | `docs/project/GOVERNANCE.md`                            |
| Project context             | ACTIVE                 | `docs/project/CONTEXT.md`                               |
| Project state               | ACTIVE                 | questo file                                             |
| Project architecture        | ACTIVE                 | `docs/project/ARCHITECTURE.md`                          |
| Agent V1 plugin boundary    | SCAFFOLD               | `extensions/agent-v1/`                                  |
| Ollama runtime              | VERIFIED_OPENCLAW      | host locale / provider OpenClaw                         |
| `qwen3-vl:8b`               | VERIFIED_OPENCLAW      | `ollama/qwen3-vl:8b`                                    |
| OpenRouter                  | AUTH_PENDING           | OAuth OpenRouter avviato; attesa autorizzazione browser |
| Gateway + Control UI        | VERIFIED_RUNNING       | `127.0.0.1:18789`, HTTP 200, WebSocket OK               |
| Build OpenClaw + Control UI | VERIFIED               | OpenClaw 2026.10.3                                      |
| Model router                | NOT_IMPLEMENTED        | attende smoke OpenRouter                                |
| RAG/retrieval               | DISCOVERY              | prima riuso OpenClaw, poi gap analysis                  |
| Embeddings                  | UNDECIDED              | provider/extension                                      |
| OCR/vision                  | AVAILABLE_TO_INTEGRATE | local multimodal model                                  |
| Domain modules              | DEFERRED               | project extensions                                      |

## Runtime state

Lo stato runtime dell'agente NON viene salvato in file YAML/JSON di progetto. Deve utilizzare gli owner storage/state OpenClaw (SQLite/PostgreSQL e relativi contratti). Questo documento descrive esclusivamente lo stato di sviluppo del progetto.

## Blocco corrente

`FOUNDATION-OPENCLAW-01`

- [x] dipendenze pnpm installate e lockfile allineato al plugin `agent-v1`;
- [x] build OpenClaw verificata;
- [x] build Control UI verificata;
- [x] Ollama configurato tramite OpenClaw;
- [x] smoke locale: `OLLAMA_OK`;
- [x] Gateway verificato su loopback;
- [x] Control UI verificata HTTP/WebSocket;
- [ ] OAuth OpenRouter: attesa autorizzazione browser;
- [ ] smoke OpenRouter;
- [ ] definizione del primo routing local/cloud.

Runtime isolato: `/Users/gianlucatreppete/Seshix/developed/.agent-v1-openclaw-state`.

## Ambiente macOS

- `Agent-V1.app` installata in `/Applications` dalla release ufficiale firmata OpenClaw 2026.10.3 arm64.
- macOS indicizza il display name come `Agent-V1`.
- Firma bundle verificata con `codesign --verify --deep --strict`.
- Gateway verificato unico su `127.0.0.1:18789`; Control UI HTTP 200.
- Xcode completo non e installato; il fork non viene quindi compilato come app Swift nativa in questa fase. La CLI/Gateway resta eseguita dal checkout canonico.
