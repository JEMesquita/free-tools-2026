# Quick start — Free Tools 2026 v2.0

1. Instale Node.js 20+.
2. Execute `npm install`.
3. Copie `.env.example` para `.env` e preencha as configurações do aplicativo Web Firebase.
4. Execute `npm run dev`.
5. Crie o projeto Firebase, habilite Authentication por e-mail/senha e Firestore.
6. Copie `.firebaserc.example` para `.firebaserc` e informe o ID do projeto.
7. Crie sua conta no Firebase Authentication, confirme o e-mail e execute: `ADMIN_EMAIL="seu-email-verificado" node scripts/grant-admin.js`.
8. Importe o catálogo: `node scripts/seed-tools.js`.
9. Compile e publique: `npm run build` e `npx firebase deploy`.

O perfil público usa o nome João Mesquita. A permissão de administrador é concedida exclusivamente pelo Admin SDK. Nenhuma senha ou chave privada foi incluída.

## URL de hospedagem
Não configure domínio personalizado. O endereço nativo esperado é `https://free-tools-2026.web.app`, se o Project ID estiver disponível. Confirme a URL efetiva no Firebase Console > Hosting após o deploy.
