# Incident Response Protocol

1. **Detection**: Client or monitoring detects outage or broken contact channel.
2. **Triaging**: Inspect Cloudflare analytics and EmailJS error logs.
3. **Remediation**: Revert recent commit or patch environment keys.
4. **Post-Mortem**: Document resolution in `CHANGELOG.md`.
