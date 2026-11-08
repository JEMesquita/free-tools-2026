# Security Policy

## Reporting a vulnerability

Do not report security vulnerabilities in public issues. Contact the repository owner privately through GitHub's security reporting feature, if enabled, or use GitHub's private vulnerability reporting workflow.

Please include:
- A clear description and affected component.
- Steps to reproduce in an authorized test environment.
- Potential impact and suggested mitigation.

Do not include real user data, credentials, tokens, private keys, or exploit payloads that target third-party systems.

## Project security baseline

- Never commit `.env`, service-account JSON files, passwords, or access tokens.
- Keep Firebase Admin SDK usage in trusted server/administrative environments only.
- Enforce authorization with Firestore and Storage Security Rules; frontend checks are not security controls.
- Restrict administrator access and enable MFA.
- Test rules with Firebase Emulator Suite before production deployment.
- Review dependencies and monitor Firebase billing and usage.
