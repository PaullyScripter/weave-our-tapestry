# Weave Our Tapestry - API Contract(Generated)

## Health Check

GET /health

Response:
{
  "status": "ok"
}

---

## Stories

### GET /api/stories

Returns:
[
  {
    "id": number,
    "title": string,
    "culture": string | null,
    "text": string
  }
]

---

### POST /api/stories

Request:
{
  "title": string,
  "culture": string | null,
  "text": string
}

Response:
{
  "id": number,
  "title": string,
  "culture": string | null,
  "text": string
}

---

### GET /api/stories/{id}

Response:
{
  "id": number,
  "title": string,
  "culture": string | null,
  "text": string
}

If not found:
404 Error

---

## Search (Sprint 2)

GET /api/search?q=keyword

Response:
{
  "query": string,
  "total": number,
  "results": [
    {
      "id": number,
      "title": string,
      "culture": string,
      "score": number,
      "snippet": string
    }
  ]
}