# Security Architecture

## Threat Modeling & Protections
1. **API Key Exposure**: Only public frontend tokens (EmailJS Public Key) are exposed; no administrative database or server keys exist in the client repository.
2. **Cross-Site Scripting (XSS)**: React automatic escaping prevents injected HTML payload execution in input fields.
3. **Denial of Service (DoS)**: EmailJS rate limiting prevents abusive form flooding.
4. **Content Security Policy**: Compatible with strict CSP; no `eval()` dependencies.
