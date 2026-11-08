// Execute somente depois de criar sua conta no Firebase Authentication
// e confirmar o e-mail. Defina ADMIN_EMAIL no ambiente antes de executar.
import admin from 'firebase-admin';

admin.initializeApp();
const email = process.env.ADMIN_EMAIL;
if (!email) throw new Error('Defina ADMIN_EMAIL com o e-mail verificado da sua conta.');

try {
  const user = await admin.auth().getUserByEmail(email);
  if (!user.emailVerified) throw new Error('A conta ainda não confirmou o e-mail.');
  await admin.auth().setCustomUserClaims(user.uid, {
    ...(user.customClaims || {}),
    admin: true,
    role: 'superadmin'
  });
  console.log(`Administrador principal habilitado: ${email} (${user.uid}).`);
  console.log('Saia e entre novamente ou atualize o token para aplicar a permissão.');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
