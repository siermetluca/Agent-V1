# Governance Agent V1

## 1. Autorità

- OpenClaw upstream possiede core, Gateway, agent runtime, session lifecycle, Plugin SDK e contratti generici.
- Agent V1 possiede esclusivamente il layer downstream e i domini introdotti dal progetto.
- Un nuovo owner è ammesso solo quando nessun owner OpenClaw esistente copre la responsabilità.

## 2. Ingresso obbligatorio di ogni agente

Prima di modificare la repository, l'agente deve:

1. leggere `AGENTS.md`;
2. leggere `PROJECT.md`;
3. leggere `docs/project/CONTEXT.md`;
4. leggere `docs/project/STATE.md`;
5. leggere `docs/project/GOVERNANCE.md`;
6. leggere `docs/project/ARCHITECTURE.md`;
7. leggere gli `AGENTS.md` scoped dei path interessati;
8. eseguire `git status -sb`;
9. identificare owner e boundary prima di scrivere codice.

## 3. Classificazione dell'informazione

Ogni decisione rilevante deve essere riconducibile a una delle classi:

- `FACT`: verificato da codice, runtime, fonte o test;
- `DECISION`: scelta approvata e corrente;
- `ASSUMPTION`: ipotesi esplicita e non ancora verificata;
- `UNKNOWN`: informazione necessaria ma mancante;
- `CONFLICT`: evidenze o decisioni incompatibili da risolvere.

Mai convertire `ASSUMPTION` o `UNKNOWN` in `FACT` senza evidenza.

## 4. Regola core-first/plugin-first

Per una nuova capability seguire questo ordine:

1. owner/capability OpenClaw esistente;
2. configurazione esistente;
3. skill/tool/plugin contract esistente;
4. estensione `extensions/agent-v1/`;
5. nuovo generic Plugin SDK contract solo se il gap è dimostrato;
6. modifica core solo se nessuna superficie precedente può esprimere la capability.

Ogni modifica al core deve documentare il gap e il costo di mantenimento downstream/upstream.

## 5. Stato e contesto

- Il contesto fornito al task deve essere minimo, pertinente e autorizzato.
- Ogni output che modifica stato deve essere validato prima del commit dello stato.
- Runtime state usa gli owner OpenClaw; non introdurre sidecar JSON/YAML come database paralleli.
- `docs/project/STATE.md` è stato di sviluppo, non memoria runtime.

## 6. Modelli

- Local-first è una preferenza, non una scorciatoia di sicurezza.
- OpenRouter e provider locali passano dal provider layer OpenClaw.
- Nessun cambio modello deve bypassare policy, approval o capability boundary.
- Model routing automatico richiede test su qualità, tool use, context length, latency e costo.

## 7. Git e contributi

- `main` rappresenta lo stato integrato del progetto.
- Le modifiche non banali devono usare branch dedicati e pull request.
- Un contributor non modifica direttamente core OpenClaw per una capability downstream senza gap analysis.
- Ogni PR deve indicare: problema, owner, soluzione, impatto, test/evidenze, eventuale differenza rispetto upstream.
- Non committare segreti, credenziali, dati privati o configurazioni host-specific sensibili.

## 8. Sincronizzazione upstream

- `upstream` deve puntare a `https://github.com/openclaw/openclaw.git`.
- `.openclaw-upstream-sha` registra il commit upstream della baseline/snapshot corrente.
- Prima di importare un aggiornamento upstream: working tree pulito, backup/tag, lettura changelog e verifica dei boundary toccati.
- Gli update upstream non devono sovrascrivere silenziosamente le decisioni downstream.

## 9. Chiusura task

Un task è chiuso solo quando:

- output richiesto presente;
- comportamento validato al boundary corretto;
- regressioni pertinenti verificate;
- `CONTEXT.md` aggiornato se cambiano fatti/decisioni/unknown;
- `STATE.md` aggiornato se cambia lo stato del progetto;
- working tree e commit coerenti con lo scope.
