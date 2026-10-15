# Stato progetto

Aggiornato: 2026-10-15

## Fase

`OPENCLAW_FOUNDATION`

## Componenti

| Componente | Stato | Owner |
|---|---|---|
| OpenClaw baseline | ACTIVE | upstream/downstream sync |
| Project governance | ACTIVE | `docs/project/GOVERNANCE.md` |
| Project context | ACTIVE | `docs/project/CONTEXT.md` |
| Project state | ACTIVE | questo file |
| Project architecture | ACTIVE | `docs/project/ARCHITECTURE.md` |
| Agent V1 plugin boundary | SCAFFOLD | `extensions/agent-v1/` |
| Ollama runtime | VERIFIED_AVAILABLE | host locale |
| `qwen3-vl:8b` | VERIFIED_AVAILABLE | Ollama |
| OpenRouter | PLANNED | OpenClaw provider layer |
| Model router | NOT_IMPLEMENTED | project extension/config |
| RAG/retrieval | DISCOVERY | prima riuso OpenClaw, poi gap analysis |
| Embeddings | UNDECIDED | provider/extension |
| OCR/vision | AVAILABLE_TO_INTEGRATE | local multimodal model |
| Domain modules | DEFERRED | project extensions |

## Runtime state

Lo stato runtime dell'agente NON viene salvato in file YAML/JSON di progetto. Deve utilizzare gli owner storage/state OpenClaw (SQLite/PostgreSQL e relativi contratti). Questo documento descrive esclusivamente lo stato di sviluppo del progetto.

## Blocco successivo autorizzato

`FOUNDATION-OPENCLAW-01`

1. installare le dipendenze upstream con pnpm;
2. verificare build e CLI OpenClaw sul Mac Studio;
3. verificare discovery/configurazione Ollama attraverso il provider OpenClaw;
4. configurare OpenRouter senza committare credenziali;
5. avviare Gateway + Control UI;
6. eseguire smoke test locale e cloud;
7. solo dopo definire il primo routing local/cloud.
