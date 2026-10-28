# UI State Transitions

| Component    | State     | Visual Representation                                             |
| ------------ | --------- | ----------------------------------------------------------------- |
| Contact Form | `idle`    | Input fields ready; "Avg. response time: 24h"                     |
| Contact Form | `sending` | Submit button disabled; spinner / "Sending..." indicator          |
| Contact Form | `ok`      | Green confirmation text: "✓ Message sent! I'll reply within 24h." |
| Contact Form | `err`     | Red warning text with mailto link                                 |
| Lightbox     | `closed`  | Hidden from DOM                                                   |
| Lightbox     | `open`    | Modal overlay with 90% blur backdrop; keyboard listeners active   |
