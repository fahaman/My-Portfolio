# Database Schema (Reference Application Architecture)

For showcase applications referenced in the portfolio (HelpHive, LearnChart):

- **Users**: `_id`, `name`, `email`, `passwordHash`, `role`, `createdAt`
- **Projects / Courses**: `_id`, `title`, `description`, `techStack`, `authorId`, `published`
- **Inquiries**: Handled via direct email forwarding.
