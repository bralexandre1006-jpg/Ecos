// Prépare le projet Android généré par Capacitor :
// - signature fixe (même clé à chaque build => mise à jour sans désinstaller)
// - versionCode auto (numéro du build GitHub)
// - écran bloqué en portrait + permission vibration
const fs = require('fs');

function edit(path, fn) {
  const before = fs.readFileSync(path, 'utf8');
  const after = fn(before);
  if (after === before) throw new Error('Rien modifié dans ' + path);
  fs.writeFileSync(path, after);
  console.log('OK  ' + path);
}

edit('android/app/build.gradle', s => s
  .replace(/versionCode \d+/, 'versionCode((System.getenv("VERSION_CODE") ?: "1").toInteger())')
  .replace(/versionName "[^"]*"/, 'versionName(System.getenv("VERSION_NAME") ?: "1.0")')
  .replace('    buildTypes {\n        release {', `    signingConfigs {
        release {
            storeFile file("../../android-signing/ecos-release.jks")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias "ecos"
            keyPassword System.getenv("KEYSTORE_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release`)
);

edit('android/app/src/main/AndroidManifest.xml', s => {
  if (!s.includes('screenOrientation'))
    s = s.replace('android:name=".MainActivity"', 'android:name=".MainActivity"\n            android:screenOrientation="portrait"');
  if (!s.includes('android.permission.VIBRATE'))
    s = s.replace('<uses-permission android:name="android.permission.INTERNET" />',
      '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.VIBRATE" />');
  return s;
});

// icône de notification
fs.mkdirSync('android/app/src/main/res/drawable', { recursive: true });
fs.copyFileSync('assets/notif/ic_stat_ecos.png', 'android/app/src/main/res/drawable/ic_stat_ecos.png');
console.log('OK  icône de notification');

// vérifications
const g = fs.readFileSync('android/app/build.gradle', 'utf8');
if (!g.includes('signingConfig signingConfigs.release') || !g.includes('VERSION_CODE')) {
  throw new Error('Patch Gradle incomplet');
}
console.log('Projet Android prêt.');
