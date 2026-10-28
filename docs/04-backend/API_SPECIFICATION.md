# API Specification

## 1. Sitemap Endpoint
- **URL**: `/sitemap.xml`
- **Method**: `GET`
- **Response Format**: `application/xml`
- **Status**: `200 OK`

## 2. Contact Dispatch (EmailJS Integration)
- **Service Endpoint**: `https://api.emailjs.com/api/v1.0/email/send-form`
- **Method**: `POST`
- **Payload**:
  - `service_id`: `string`
  - `template_id`: `string`
  - `user_id`: `string` (Public Key)
  - `template_params`: `{ from_name, from_email, subject, message }`
