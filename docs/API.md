# FunBytes REST API Reference

All requests and responses use `application/json`. Base URL: `http://localhost:4000/api`

---

## 1. Feed Endpoints

### `GET /api/feed`
Fetch personalized or topic-filtered feed items.

**Query Parameters:**
- `topic` (string, optional): Filter by topic (`all`, `developers`, `technology`, `politics`, `sports`, `bollywood`, `international`, `memes`, `cartoons`).
- `style` (string, optional): Feed style (`trending`, `latest`, `personalized`, `fun`).
- `interests` (string, optional): Comma-separated list of user interests.
- `page` (number, default: 1): Page number.
- `limit` (number, default: 20): Items per page.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "reddit_dev_101",
        "sourceId": "reddit_developers_india",
        "sourceName": "r/developersIndia",
        "sourceUrl": "https://reddit.com/r/developersIndia",
        "title": "What's the best roadmap for becoming a backend developer in 2026?",
        "summary": "Developers discuss essential distributed systems concepts...",
        "author": "u/code_architect",
        "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        "articleUrl": "https://reddit.com/r/developersIndia/comments/...",
        "publishedAt": "2026-08-25T13:00:00Z",
        "category": "developers",
        "tags": ["Developers", "Backend", "Roadmap"],
        "contentType": "reddit",
        "engagement": { "likes": 523, "comments": 87, "shares": 42 }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 85,
      "hasMore": true
    }
  }
}
```

---

## 2. Topic & Discovery Endpoints

### `GET /api/topics`
Retrieve available topic categories and sub-interest tags.

### `GET /api/trending`
Retrieve top 10 trending items and hashtags across FunBytes.

### `GET /api/search`
Search across posts, titles, sources, authors, and topics.
**Query Parameters**: `q` (required string), `category` (optional string).

---

## 3. Interactions Endpoints

### `POST /api/content/:id/like`
Toggle like status for a post.

### `GET /api/content/:id/comments`
Fetch comments for a specific post.

### `POST /api/content/:id/comments`
Add a new comment or reply to an existing comment.
**Body:**
```json
{
  "authorName": "Rahul Sharma",
  "content": "This architecture looks really clean!",
  "parentId": "optional_parent_comment_id"
}
```

---

## 4. Admin & Sources

### `GET /api/admin/sources`
List all sources and their current health/polling status.

### `PATCH /api/admin/sources/:id`
Enable or disable a specific source.
