# Architettura Agent V1

## Principio

Agent V1 non costruisce un secondo agent runtime sopra OpenClaw. Usa OpenClaw come kernel operativo e aggiunge solo capability di progetto tramite superfici supportate.

```text
Utente / Control UI / Channel
            |
            v
      OpenClaw Gateway
            |
     Agent runtime/session
            |
     Model/provider layer
       /            \
 Ollama locale    OpenRouter
       \            /
        model selection
            |
      Tool / Skill / Plugin SDK
            |
       Agent V1 extension
            |
   Context / Retrieval / Domains
            |
      OpenClaw state/storage
```

## Owner riutilizzati da OpenClaw

- Gateway e session lifecycle;
- agent runtime/harness;
- provider/model configuration;
- tool execution e approval boundary;
- plugin loading e Plugin SDK;
- memory host e context/session facilities esistenti;
- SQLite/PostgreSQL state/storage;
- Control UI, CLI e TUI;
- sandbox/node execution dove applicabile.

## Layer downstream

`extensions/agent-v1/` è il primo boundary applicativo. Deve rimanere piccolo e usare solo `openclaw/plugin-sdk/*`.

Capacità previste, da introdurre solo dopo verifica di riuso:

- context assembly specifico dei nostri domini;
- retrieval/RAG specializzato;
- model routing local/OpenRouter;
- OCR/vision workflow;
- validatori di dominio;
- tool e skill specifiche;
- integrazioni hardware/software future.

## Modelli

Baseline:

```text
LOCAL VISION/FAST: Ollama -> qwen3-vl:8b (verificato)
LOCAL REASONING:   TBD
CLOUD:             OpenRouter -> modello esplicito TBD
EMBEDDINGS:        TBD
RERANKER:          TBD
```

Non assumere che un unico LLM debba eseguire retrieval, embeddings, OCR e reasoning. Ogni funzione può avere un modello/componente specializzato purché il routing resti governato.

## Retrieval/RAG

Prima di introdurre Qdrant, pgvector, LanceDB o un nuovo retriever:

1. inventariare memory/retrieval/embedding capability già presenti in OpenClaw;
2. verificare compatibilità con Ollama/OpenRouter;
3. misurare recall/precision/latency sul nostro dataset;
4. aggiungere una nuova dipendenza solo se colma un gap misurato.

## Stato

```text
conversation/session state -> OpenClaw owner
agent runtime state         -> OpenClaw owner
memory                      -> OpenClaw memory capability/plugin
project development state   -> docs/project/STATE.md
future domain state         -> OpenClaw SQLite/PostgreSQL contract, non sidecar parallelo
```
