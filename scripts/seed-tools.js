// Importa catálogo inicial no Firestore usando credenciais seguras do Admin SDK / ADC.
import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

const tools = JSON.parse(readFileSync(new URL('../src/tools.seed.json', import.meta.url), 'utf8'));
admin.initializeApp();
const db = admin.firestore();

try {
  for (let i = 0; i < tools.length; i += 400) {
    const batch = db.batch();
    for (const item of tools.slice(i, i + 400)) {
      const { id, ...data } = item;
      batch.set(db.collection('tools').doc(id), {
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
    await batch.commit();
  }
  console.log(`${tools.length} ferramentas importadas.`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await admin.app().delete();
}
