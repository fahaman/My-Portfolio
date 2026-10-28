# API Integration Guide

## EmailJS Client Implementation

Integrated in `src/routes/index.tsx`:

```typescript
import emailjs from "@emailjs/browser";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "@/lib/send-mail";

await emailjs.send(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  {
    from_name: fd.get("name"),
    from_email: fd.get("email"),
    subject: fd.get("subject"),
    message: fd.get("message"),
  },
  { publicKey: EMAILJS_PUBLIC_KEY },
);
```
