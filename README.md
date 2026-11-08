# Free Tools 2026

> Diretório curado de ferramentas digitais para estudar, criar, programar, analisar dados e explorar segurança da informação.

**Projeto:** Free Tools 2026  
**Versão documental:** 2.0.0  
**Curadoria e administração:** João Mesquita  
**Repositório:** https://github.com/JEMesquita/free-tools-2026  
**Hospedagem planejada:** Firebase Hosting nativo — `https://SEU_PROJECT_ID.web.app`

© 2026 João Mesquita — Todos os direitos reservados.

---

## 1. Visão geral

O Free Tools 2026 reúne, organiza e descreve serviços digitais acessíveis pela web. O objetivo é facilitar a descoberta de recursos úteis, com filtros por categoria, pesquisa, favoritos, avaliações e sugestões da comunidade.

O catálogo inclui serviços de produtividade, IA, programação, educação, imagens, documentos, matemática, redes, cibersegurança, APIs e infraestrutura em nuvem.

> **Atenção:** a presença de um serviço no catálogo não significa endosso, parceria, garantia de gratuidade ou validação de segurança. Planos, preços, limites, disponibilidade e termos de uso podem mudar. Confira sempre o site oficial antes de usar.

## 2. Funcionalidades previstas na aplicação

- Catálogo de ferramentas com nome, descrição, endereço, categoria e indicação de modalidade (gratuito, freemium, pago ou a verificar).
- Pesquisa por nome, descrição e categoria.
- Filtros por categoria.
- Favoritos armazenados localmente no navegador.
- Login e cadastro por Firebase Authentication.
- Avaliações de usuários autenticados.
- Envio de sugestões para análise.
- Painel administrativo para gestão do catálogo.
- Importação inicial de ferramentas para Cloud Firestore.
- Monitoramento agendado de disponibilidade dos links por Cloud Functions.
- Interface responsiva com identidade visual escura, violeta elétrico, ciano e verde menta.

A implementação de cada recurso deve ser conferida no código da versão publicada. Consulte a seção **Limitações conhecidas** antes de considerar um recurso concluído.

## 3. Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | HTML, CSS e JavaScript ES Modules |
| Build e servidor local | Vite |
| Autenticação | Firebase Authentication |
| Banco de dados | Cloud Firestore |
| Arquivos públicos (opcional) | Cloud Storage for Firebase |
| Rotinas agendadas | Cloud Functions for Firebase |
| Hospedagem | Firebase Hosting |
| Administração privilegiada | Firebase Admin SDK |
| Runtime das funções | Node.js 20 |

## 4. Arquitetura

A aplicação é uma SPA estática compilada pelo Vite e publicada no Firebase Hosting. O navegador utiliza o Firebase Web SDK para autenticação e operações permitidas no Firestore. As regras de segurança são aplicadas no servidor Firebase, não apenas na interface.

```text
Navegador
  |
  +-- Interface Free Tools 2026 (Vite / JavaScript / CSS)
  |      |
  |      +-- Firebase Authentication
  |      +-- Cloud Firestore
  |      +-- Cloud Storage (opcional)
  |
  +-- Firebase Hosting (dist/)
  
Ambiente administrativo confiável
  |
  +-- Firebase Admin SDK
         +-- grant-admin.js (custom claims)
         +-- seed-tools.js (carga inicial)
  
Cloud Functions (Node.js)
  |
  +-- checkToolLinks (verificação agendada de URLs)
```

### Fluxo de autenticação e autorização

1. O usuário cria uma conta ou entra com e-mail e senha.
2. Firebase Authentication emite um token de identidade.
3. O painel consulta as custom claims do token.
4. A interface pode ocultar ou exibir controles administrativos, mas isso é apenas apresentação.
5. As regras do Firestore e Storage verificam a claim `admin == true` no servidor.
6. A promoção a administrador ocorre exclusivamente por script executado em ambiente confiável com Firebase Admin SDK.

**Nunca** confie em um campo `role` enviado pelo navegador, em um e-mail digitado em formulário ou na ocultação de botões como mecanismo de segurança.

## 5. Estrutura de diretórios

A estrutura esperada para a aplicação:

```text
free-tools-2026/
├── index.html
├── package.json
├── vite.config.js (se adotado pela versão)
├── firebase.json
├── .firebaserc.example
├── .env.example
├── firestore.rules
├── storage.rules
├── README.md
├── QUICKSTART.md
├── src/
│   ├── main.js
│   ├── style.css
│   └── tools.seed.json
├── scripts/
│   ├── grant-admin.js
│   └── seed-tools.js
└── functions/
    ├── index.js
    └── package.json
```

Arquivos de credenciais, `.env`, chaves privadas, tokens e dados de usuários não devem ser versionados.

## 6. Requisitos para desenvolvimento local

- Node.js 20 ou superior.
- npm compatível com a versão do Node.js.
- Conta Google e projeto Firebase.
- Firebase CLI.
- Acesso ao repositório GitHub.

### Instalação

```bash
git clone https://github.com/JEMesquita/free-tools-2026.git
cd free-tools-2026
npm install
cp .env.example .env
```

Edite o arquivo `.env` com as configurações do aplicativo Web Firebase:

```dotenv
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=SEU_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=SEU_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

As configurações do Firebase Web SDK identificam o projeto e não substituem regras de segurança. Nunca inclua credenciais de conta de serviço, chaves privadas ou segredos administrativos nas variáveis `VITE_*`, pois elas podem ser incorporadas ao bundle público.

Inicie o ambiente:

```bash
npm run dev
```

Gere e valide a versão de produção:

```bash
npm run build
npm run preview
```

## 7. Configuração do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/).
2. Crie um projeto com identificador disponível, preferencialmente `free-tools-2026`.
3. Registre um aplicativo Web e copie suas configurações para o `.env`.
4. Em **Authentication > Sign-in method**, habilite **Email/Password**.
5. Crie o banco **Cloud Firestore**. Escolha a região considerando a localização dos usuários e requisitos de latência; a região do banco não é facilmente alterável após a criação.
6. Ative o Cloud Storage apenas se a aplicação for utilizar upload de imagens/arquivos.
7. Instale/autentique o Firebase CLI:

```bash
npm install
npx firebase login
cp .firebaserc.example .firebaserc
```

8. Edite `.firebaserc` e confirme o ID real do projeto.
9. Publique as regras e o Hosting:

```bash
npm run build
npx firebase deploy --only firestore:rules,storage,hosting
```

### URL de hospedagem

Não é utilizado domínio personalizado. O Firebase Hosting disponibiliza endereços nativos, normalmente:

- `https://SEU_PROJECT_ID.web.app`
- `https://SEU_PROJECT_ID.firebaseapp.com`

Se o identificador `free-tools-2026` estiver disponível e for utilizado, o endereço esperado será `https://free-tools-2026.web.app`. A URL só estará ativa após criação e publicação. Confirme o endereço efetivo na seção **Hosting** do Firebase Console.

## 8. Perfil administrativo — João Mesquita

**Nome de exibição:** João Mesquita  
**Papel:** Administrador principal / Superadmin  
**Responsabilidade:** curadoria e administração do Free Tools 2026.

### Responsabilidades e permissões

- Criar, atualizar, ativar/desativar e remover ferramentas.
- Organizar categorias e metadados do catálogo.
- Revisar sugestões enviadas pelos usuários.
- Acompanhar avaliações e indicadores.
- Consultar resultados de verificação de links.
- Administrar conteúdo e parâmetros operacionais.

A conta não possui senha padrão no código. O administrador deve criar sua própria conta, verificar o e-mail e receber a custom claim por procedimento controlado.

### Conceder privilégio administrativo

1. Crie a conta do administrador em Firebase Authentication.
2. Verifique o endereço de e-mail.
3. Configure o ambiente administrativo com credenciais seguras do Firebase Admin SDK (Application Default Credentials ou service account protegida).
4. Configure a variável de ambiente `ADMIN_EMAIL` com o endereço verificado.
5. Execute o script administrativo disponibilizado no diretório `scripts`:

```bash
ADMIN_EMAIL="seu-email-verificado" node scripts/grant-admin.js
```

6. Saia e entre novamente na aplicação para renovar o token.

O script deve conceder custom claims como `admin: true` e `role: "superadmin"`. Não armazene chave JSON de service account no repositório, no frontend ou em arquivos enviados ao GitHub.

## 9. Catálogo inicial

O arquivo `src/tools.seed.json` é a fonte de dados inicial usada para popular o catálogo. A carga no Firestore é feita por script administrativo:

```bash
node scripts/seed-tools.js
```

Execute a carga somente após configurar o Firebase Admin SDK. Revise os dados e faça backup antes de executar novamente em uma base que já recebeu alterações editoriais.

### Critérios editoriais

- Priorizar o site oficial do serviço.
- Descrever o que a ferramenta faz sem prometer recursos não confirmados.
- Informar se é gratuita, freemium ou paga apenas quando houver base confiável; caso contrário, usar “A verificar”.
- Não recomendar serviços que distribuam material ilegal, violem direitos autorais ou facilitem abuso.
- Reavaliar links quebrados, redirecionamentos e mudanças de política.
- Identificar serviços que exijam conta, pagamento ou coleta de dados pessoais.

## 10. Regras de segurança

As regras estão versionadas em `firestore.rules` e `storage.rules`. Elas devem ser revisadas antes de cada publicação.

### Cloud Firestore — política esperada

| Coleção | Leitura | Escrita |
|---|---|---|
| `tools` | Público para itens ativos; administrador para gestão | Administrador |
| `users/{uid}` | Próprio usuário ou administrador | Próprio usuário, com campos limitados |
| `suggestions` | Administrador | Usuário autenticado cria sugestão pendente; administrador modera |
| `ratings` | Pública | Usuário autenticado cria/atualiza a própria avaliação; administrador ou autor remove |

As regras efetivas do arquivo devem ser tratadas como fonte de verdade. Teste casos permitidos e negados com o Firebase Emulator Suite antes de produção. Considere também validação de esquema, limites de tamanho, prevenção de spam e unicidade de avaliação por usuário/ferramenta.

### Cloud Storage — política esperada

- Leitura pública somente no caminho destinado a arquivos públicos.
- Escrita restrita a administradores autenticados.
- Limite de tamanho e validação de MIME type.
- Não armazene documentos privados ou dados sensíveis em caminhos públicos.

A validação de MIME type por si só não garante que um arquivo seja seguro. Para produção, considere restringir formatos, verificar conteúdo e evitar SVG não sanitizado.

### Boas práticas obrigatórias

- Ativar MFA para a conta administrativa.
- Usar menor privilégio possível nas contas de serviço.
- Não publicar `.env`, service account JSON, tokens ou senhas.
- Ativar alertas de orçamento e monitoramento de custos.
- Habilitar App Check quando adequado.
- Aplicar proteção contra abuso e rate limiting onde necessário.
- Manter dependências atualizadas e revisar vulnerabilidades.
- Fazer backup/exportação periódica do Firestore.
- Não inserir dados pessoais ou confidenciais no catálogo público.

Consulte também [SECURITY.md](SECURITY.md).

## 11. Cloud Functions e monitoramento de links

A função agendada `checkToolLinks` realiza uma tentativa de verificação HTTP das URLs cadastradas e grava o resultado no Firestore. O monitoramento é indicativo, não uma garantia de disponibilidade: serviços podem bloquear requisições automatizadas, exigir autenticação ou responder de forma diferente a HEAD e GET.

O agendamento pode exigir plano Blaze, Cloud Scheduler e faturamento ativo. Configure orçamento, alertas e região compatível com os serviços utilizados.

Instale dependências das funções:

```bash
cd functions
npm install
cd ..
```

Publique as funções:

```bash
npx firebase deploy --only functions
```

## 12. Publicação e atualização

```bash
npm run build
npx firebase deploy --only hosting
```

Para publicar regras:

```bash
npx firebase deploy --only firestore:rules,storage
```

Para publicar todas as partes configuradas:

```bash
npx firebase deploy
```

Recomenda-se separar ambientes de desenvolvimento e produção, revisar as regras, testar build e executar os testes de segurança antes do deploy.

## 13. Utilização da plataforma

### Visitante

1. Abra a URL do Firebase Hosting.
2. Pesquise pelo nome ou descrição.
3. Filtre por categoria.
4. Abra o site oficial da ferramenta.
5. Consulte as condições de uso diretamente no fornecedor.

### Usuário autenticado

1. Crie uma conta ou entre.
2. Utilize favoritos no navegador.
3. Avalie ferramentas quando disponível.
4. Envie sugestões para análise.

### Administrador

1. Entre com a conta promovida pelo Admin SDK.
2. Abra o painel Administração.
3. Gerencie o catálogo conforme as permissões implementadas.
4. Revise sugestões e dados no Firestore por ferramentas administrativas autorizadas.
5. Acompanhe a saúde dos links e corrija entradas desatualizadas.

## 14. Limitações conhecidas e evolução

A versão 2.0 constitui uma base inicial. Antes de apresentar o sistema como produto final, verifique no código e teste em ambiente Firebase:

- Se o painel contempla todos os fluxos administrativos desejados; recursos como edição avançada, moderação completa e analytics podem exigir implementação adicional.
- Se a média de avaliações está agregada e protegida contra manipulação.
- Se favoritos são apenas locais ou sincronizados entre dispositivos.
- Se o monitoramento de links está ativo e com custos controlados.
- Se os serviços do catálogo continuam disponíveis e suas descrições estão atualizadas.
- Se regras e scripts foram testados com dados reais e no Emulator Suite.

### Roadmap sugerido

- [ ] Testes automatizados de interface e regras Firestore.
- [ ] Edição completa e moderação de sugestões.
- [ ] Painel de métricas e auditoria administrativa.
- [ ] Favoritos sincronizados por usuário.
- [ ] Média de avaliações calculada no servidor.
- [ ] Paginação e cache do catálogo.
- [ ] Pipeline GitHub Actions para build e deploy.
- [ ] Política de privacidade e termos de uso.
- [ ] Processo de revisão periódica do catálogo.

## 15. Contribuições

Sugestões devem incluir nome do serviço, URL oficial, categoria, descrição objetiva, modalidade de preço e observações sobre cadastro ou limitações. Não envie credenciais, dados pessoais de terceiros ou links suspeitos.

Para mudanças no código:

1. Crie uma branch.
2. Faça alterações pequenas e documentadas.
3. Execute `npm run build`.
4. Teste as regras no Emulator Suite quando aplicável.
5. Abra um Pull Request com resumo, motivação e evidências de teste.

## 16. Licença e direitos

O código e a identidade do projeto são mantidos por João Mesquita. A publicação do repositório não concede automaticamente licença para reutilização comercial, redistribuição da marca ou apropriação do conteúdo. Serviços de terceiros mantêm suas próprias marcas, licenças, termos e direitos.

© 2026 João Mesquita — Todos os direitos reservados.

---

**Responsável pelo projeto:** João Mesquita  
**GitHub:** [@JEMesquita](https://github.com/JEMesquita)  
**Repositório:** [JEMesquita/free-tools-2026](https://github.com/JEMesquita/free-tools-2026)
