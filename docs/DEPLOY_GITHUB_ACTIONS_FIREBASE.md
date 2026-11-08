# GitHub Actions + Firebase Hosting

O workflow `.github/workflows/firebase-hosting.yml` valida Pull Requests e publica automaticamente no Firebase Hosting quando há push na branch `main`.

## Pré-requisitos

- Projeto Firebase criado e Firebase Hosting inicializado.
- Aplicativo Web Firebase registrado.
- Conta de serviço Google Cloud dedicada, com permissões mínimas necessárias para implantar Firebase Hosting.
- Acesso de administrador às configurações do repositório GitHub.

## Configuração no GitHub

Abra **Settings > Secrets and variables > Actions**.

### Repository variable

| Nome | Valor |
|---|---|
| `FIREBASE_PROJECT_ID` | Project ID real do Firebase |

### Repository secrets

| Nome | Conteúdo |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | Conteúdo JSON integral da conta de serviço de deploy |
| `VITE_FIREBASE_API_KEY` | API key do aplicativo Web Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `PROJECT_ID.firebaseapp.com` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket informado pelo Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID do aplicativo |
| `VITE_FIREBASE_APP_ID` | App ID do aplicativo Web |

## Criar a conta de serviço

1. No Google Cloud Console, selecione o projeto Firebase correto.
2. Crie uma conta de serviço dedicada, por exemplo `github-firebase-hosting-deployer`.
3. Conceda somente os papéis necessários para publicar Hosting (por exemplo, Firebase Hosting Admin, conforme a política IAM do projeto).
4. Gere uma chave JSON apenas se a política de segurança permitir.
5. Cadastre o JSON como secret `FIREBASE_SERVICE_ACCOUNT`.
6. Nunca faça commit da chave, não a coloque em `.env`, frontend, issue ou log.
7. Rotacione e revogue chaves conforme a política de segurança.

Prefira Workload Identity Federation quando disponível na organização, evitando chaves de longa duração. A configuração atual usa credencial JSON armazenada como secret.

## Execução do pipeline

- Pull Request para `main`: instala dependências e executa `npm run build`; não publica.
- Push na `main`: instala dependências, compila e publica Firebase Hosting após sucesso do build.
- Execução manual: disponível em **Actions > CI and Firebase Hosting > Run workflow**.

O workflow publica somente Hosting. Regras Firestore, Storage e Cloud Functions devem ser implantadas em uma etapa separada, controlada e testada.

## URL

Após o primeiro deploy bem-sucedido, confirme Firebase Console > Hosting. O endereço nativo é `https://PROJECT_ID.web.app`. Se o ID for `free-tools-2026`, a URL esperada é `https://free-tools-2026.web.app`. Ela não estará ativa antes do deploy.

## Diagnóstico

- **Missing FIREBASE_SERVICE_ACCOUNT:** cadastre o secret com o JSON integral.
- **Project ID ausente:** configure `FIREBASE_PROJECT_ID`.
- **Permission denied:** revise IAM da conta de serviço.
- **Firebase config undefined:** confira os secrets `VITE_FIREBASE_*`.
- **Build falhou:** abra o log do job Build e corrija a primeira falha reportada.

As configurações Web do Firebase são públicas no bundle; a segurança depende de Authentication, Security Rules e App Check. A chave JSON de serviço é privada e nunca pode ser exposta.
