# Écos

App de gestion des dépenses (HTML + Capacitor 8 → APK Android).

## Mise en place (une seule fois)
1. Crée un dépôt GitHub **privé** nommé `ecos`.
2. Envoie TOUT le contenu de ce dossier à la racine du dépôt (y compris `.github` et `android-signing`).
3. Settings → Secrets and variables → Actions → New repository secret
   - Nom : `KEYSTORE_PASSWORD`
   - Valeur : `eJ6QQCjLeJcykaUCZLuv`
4. Onglet Actions → "Build APK Écos" → Run workflow.

L'APK apparaît dans **Releases** (téléchargement direct sur le téléphone).

## Mises à jour
Modifie `www/index.html` et pousse sur `main`. Chaque build :
- signe avec la même clé `android-signing/ecos-release.jks`
- augmente le versionCode tout seul

→ l'APK s'installe par-dessus l'ancienne, sans désinstaller, données conservées.

## Fonctions Android
- Empreinte : Réglages → Sécurité. Demandée à l'ouverture et après 15 s hors de l'app.
- Rappels et bilan du 1er : Réglages → Notifications.
- Sur Xiaomi/HyperOS : Paramètres → Applis → Écos → Économiseur de batterie → « Pas de restrictions », et active « Démarrage automatique », sinon les notifications planifiées peuvent sauter.

## À ne jamais perdre
`android-signing/ecos-release.jks` + le mot de passe ci-dessus. Sans eux, plus de mise à jour possible.
Empreinte SHA-256 du certificat :
58:A5:8F:91:E2:89:14:0D:F4:A6:DD:71:B7:3A:C8:12:D9:C9:34:9C:99:B3:C0:CC:0A:01:67:AC:3B:0F:4E:25
