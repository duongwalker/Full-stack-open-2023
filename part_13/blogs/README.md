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

## API Endpoints (Exercise 13.4)

Start the server:
```sh
node app.js
```

### GET /api/blogs
- Returns all blogs as JSON.

### POST /api/blogs
- Adds a new blog.
- Request body (JSON):
  ```json
  {
    "author": "Author Name",
    "url": "https://example.com",
    "title": "Blog Title",
    "likes": 0
  }
  ```
- Returns the created blog as JSON.

### DELETE /api/blogs/:id
- Deletes the blog with the given id.
- Returns 204 No Content on success, 404 if not found. 