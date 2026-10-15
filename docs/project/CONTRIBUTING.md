# Contribuire ad Agent V1

Agent V1 è un downstream di OpenClaw. Prima di contribuire leggere `PROJECT.md`, la governance di progetto e gli `AGENTS.md` applicabili.

## Regola principale

Le nuove capability del progetto devono vivere fuori dal core OpenClaw quando il Plugin SDK le può esprimere.

## Workflow

1. aggiornare la propria branch da `main`;
2. creare una branch `feat/...`, `fix/...`, `docs/...` o `chore/...`;
3. dichiarare quale owner/boundary viene toccato;
4. implementare la modifica minima completa;
5. eseguire i test scoped richiesti dagli `AGENTS.md` OpenClaw;
6. aggiornare contesto/stato quando necessario;
7. aprire PR con evidenze verificabili.

## PR minima

- problema;
- soluzione;
- file/owner coinvolti;
- perché non duplica una capability OpenClaw esistente;
- test eseguiti;
- impatti sicurezza/privacy/state;
- eventuali unknown rimasti.
