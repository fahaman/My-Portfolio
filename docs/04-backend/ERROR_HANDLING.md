# Error Handling & Resilience

- **Contact Form Failure**: If EmailJS encounters rate limits or invalid keys, status updates to `err`, displaying a clear prompt to message `mohammedfahaman5@gmail.com` directly.
- **Root Route Error Boundary**: `src/routes/__root.tsx` renders a graceful recovery view with an invalidate router trigger.
- **404 Not Found Component**: Dedicated custom 404 view directing users back to `/`.
