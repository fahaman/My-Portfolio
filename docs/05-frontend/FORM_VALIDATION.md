# Form Validation Rules

1. **Name**: Non-empty, minimum 2 characters, trimmed whitespace.
2. **Email**: Required, HTML5 email pattern verification.
3. **Subject**: Optional string, defaults to "Portfolio Inquiry" if omitted.
4. **Message**: Required, minimum 10 characters to prevent spam.
5. **Anti-Duplication**: Submit button disabled with `Sending...` label during inflight network requests.
