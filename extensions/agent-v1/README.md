# Agent V1 plugin

Layer downstream del progetto Agent V1 costruito sul Plugin SDK OpenClaw. Le capability vengono aggiunte qui soltanto quando non sono già coperte da un owner/configurazione/plugin OpenClaw esistente.

## Gmail read-only

Il primo connettore validato espone due tool opzionali:

- `agent_v1_gmail_search`: ricerca Gmail e restituisce solo `id`, `threadId` e stima dei risultati;
- `agent_v1_gmail_get_metadata`: restituisce solo identificativi, timestamp interno, label di sistema allowlisted, dimensione stimata e dominio del mittente.

Boundary di sicurezza e privacy:

- OAuth Gmail è `gmail.readonly`; il plugin non implementa invio, modifica o cancellazione;
- le credenziali OAuth restano fuori dalla repository e sono cifrate dal keyring locale;
- `gws` viene eseguito tramite `openclaw/plugin-sdk/process-runtime` con binario fisso `/opt/homebrew/bin/gws` e argv costruiti dal plugin; non viene esposta una shell generica al modello;
- entrambi i tool sono `optional: true` e `workspaceAccess: false`;
- query e quantità risultati hanno limiti espliciti; gli ID messaggio sono validati;
- `snippet`, subject, body, allegati, destinatari e indirizzo completo del mittente vengono scartati localmente prima dell'output;
- i custom label Gmail non vengono esportati;
- il body email non è ancora una capability del CEO cloud. Una futura lettura contenutistica dovrà passare da un reducer/summarizer locale e da un contratto di minimizzazione separato.

## Attivazione locale

Nello sviluppo locale il plugin viene selezionato esplicitamente con `plugins.load.paths`. I tool Gmail restano invisibili finché non vengono allowlistati per l'agente che deve usarli. La configurazione runtime e le credenziali non sono materiale da committare.
