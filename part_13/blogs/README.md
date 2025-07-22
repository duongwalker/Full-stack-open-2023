# Part 13: Blogs (Exercises 13.1–13.3)

## Setup

1. **Start PostgreSQL**
   - You can use Docker:
     ```sh
     docker run -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
     ```
   - Or use your local PostgreSQL installation.

2. **Create the table and seed data**
   - Run the SQL commands in `commands.sql` using your preferred SQL client or:
     ```sh
     psql -U postgres -h localhost -f commands.sql
     ```
   - (Replace username, host, and password as needed.)

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Run the CLI script**
   ```sh
   node cli.js
   ```
   - Output should be:
     ```
     Dan Abramov: 'On let vs const', 0 likes
     Laurenz Albe: 'Gaps in sequences in PostgreSQL', 0 likes
     ```

## Configuration
- If your database credentials differ, update them in `cli.js`. 

## Modular Structure (Exercises 13.5–13.7)

- `app.js` — main entry, sets up Express, error handling, and routes
- `util/config.js` — configuration (uses .env if present)
- `util/db.js` — Sequelize instance
- `models/blog.js` — Blog model
- `models/index.js` — Model exports
- `controllers/blogs.js` — Blog API routes

### Environment Variables
You can create a `.env` file in this directory to override DB connection settings:
```
DB_NAME=postgres
DB_USER=postgres
DB_PASS=admin123
DB_HOST=localhost
PORT=3001
```

## User Endpoints

### POST /api/users
- Create a new user.
- Request body (JSON):
  ```json
  {
    "username": "user1",
    "name": "User One"
  }
  ```
- Returns the created user as JSON.

### GET /api/users
- Returns all users and their blogs as JSON.

## Blog Endpoints (updated)

### POST /api/blogs
- Adds a new blog. Requires a valid `userId` in the request body.
- Request body (JSON):
  ```json
  {
    "author": "Author Name",
    "url": "https://example.com",
    "title": "Blog Title",
    "likes": 0,
    "userId": 1
  }
  ```
- Returns the created blog as JSON.

### GET /api/blogs
- Returns all blogs, each with its associated user (id, username, name).

## Associations
- Each blog belongs to a user. Each user can have many blogs.

## Error Handling
- Validation and server errors are returned as JSON with an `error` field. 

## Blog Search and Ordering

### GET /api/blogs?search=keyword
- Returns blogs where the `title` or `author` contains the keyword (case-insensitive).
- Blogs are ordered by `likes` in descending order.
- Example:
  - `/api/blogs?search=react` returns blogs with 'react' in the title or author, most liked first.

## Author Summary

### GET /api/authors
- Returns a summary of all authors:
  - `author`: author name
  - `articles`: number of blogs
  - `likes`: total likes for all blogs by the author
- Results are ordered by total likes (descending).
- Example response:
  ```json
  [
    { "author": "Jami Kousa", "articles": "3", "likes": "10" },
    { "author": "Kalle Ilves", "articles": "1", "likes": "2" },
    { "author": "Dan Abramov", "articles": "1", "likes": "4" }
  ]
  ``` 