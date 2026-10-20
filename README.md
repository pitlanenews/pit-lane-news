# Pit Lane News — starter project

Prototipo statico bilingue (italiano/inglese) per un portale di notizie sulla Formula 1.

## Avvio locale
1. Estrai lo ZIP.
2. Apri `index.html` in un browser. Per un'esperienza più affidabile, avvia un server statico locale:
   - Python: `python -m http.server 8000`
   - poi visita `http://localhost:8000`
3. Per modificare gli articoli, modifica `news.js`.

## File
- `index.html`: struttura e sezioni della homepage
- `styles.css`: grafica responsive
- `news.js`: contenuti editoriali di esempio, con campi IT/EN
- `app.js`: rendering delle notizie, selettore lingua e finestra articolo

## Pubblicazione e prossimi passi
Questo è un prototipo frontend: non include un pannello amministratore, un database, API live, autenticazione o pubblicazione automatica. Le notizie e le classifiche sono dimostrative e non vanno presentate come aggiornamenti reali.
Per la fase successiva:
1. Scegliere dominio e hosting (ad esempio un hosting statico per il prototipo).
2. Sostituire tutti gli articoli dimostrativi con contenuti originali verificati.
3. Scegliere una fonte autorizzata per calendario, risultati e classifiche.
4. Aggiungere un backend/CMS e un flusso di approvazione per la pubblicazione bilingue.
5. Verificare licenze di foto, marchi, fonti e requisiti legali/privacy prima del lancio.

Le immagini remote e i font richiedono una connessione Internet. Verifica i diritti d'uso di ogni immagine prima della pubblicazione.
