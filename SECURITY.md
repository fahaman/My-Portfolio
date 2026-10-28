# Security Policy

## Supported Versions

Security updates and patches are actively applied to the main branch of this repository.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability or potential privacy exposure within this application:

1. **Do not create a public GitHub issue.**
2. Send an email directly to **mohammedfahaman5@gmail.com** with the subject line `[SECURITY REPORT] Mohammed Fahaman Portfolio`.
3. Include detailed steps to reproduce the issue, potential impact, and suggested mitigations if available.
4. You will receive an initial response within 48 hours acknowledging receipt of your report.

## Security Practices Followed

- **Client-Side Secrets Protection:** No backend secret keys, database credentials, or private API tokens are embedded in client bundles.
- **Input Validation & Sanitization:** All forms sanitize and validate user input prior to submission.
- **Dependency Auditing:** Dependencies are routinely checked for vulnerabilities using `npm audit`.
- **Content Security:** Strict HTTPS enforcement in production, secure headers, and minimal reliance on external third-party runtimes.
- **Privacy by Design:** Zero third-party ad trackers or invasive cookies.
