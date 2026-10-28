# CI / CD Pipeline

- **Trigger**: Git push to `main` branch.
- **Steps**:
  1. `npm ci`
  2. `npm run lint`
  3. `npm run build`
  4. Deploy preview or production deployment to Cloudflare / Lovable.
