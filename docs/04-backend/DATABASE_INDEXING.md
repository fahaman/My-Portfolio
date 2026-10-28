# Database Indexing Strategy

In full-stack apps built by Mohammed Fahaman:
- Compound indexes applied on high-cardinality query fields (`userId + createdAt DESC`).
- Unique indexes on user email and auth identifier fields.
- Geospatial or text search indexes where full-text query capabilities are required.
