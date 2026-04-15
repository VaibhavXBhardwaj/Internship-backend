# PrimeTrade Backend API

Scalable REST API with JWT authentication, role based access control, and task management.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth, bcryptjs for hashing
- Swagger for API docs

## Setup

```bash
git clone <your-repo-url>
cd primetrade-backend
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```

## API Docs
Visit `http://localhost:5000/api-docs` after starting the server.

## Endpoints

| Method | Route | Access |
|--------|-------|--------|
| POST | /api/v1/auth/register | Public |
| POST | /api/v1/auth/login | Public |
| GET | /api/v1/auth/me | Auth |
| GET | /api/v1/tasks | Auth |
| POST | /api/v1/tasks | Auth |
| PATCH | /api/v1/tasks/:id | Auth (owner/admin) |
| DELETE | /api/v1/tasks/:id | Auth (owner/admin) |

## Frontend
Open `frontend/index.html` in a browser (or use Live Server in VS Code).

## Scalability Notes
- **Modular architecture**: each feature is a self contained module (auth, tasks), making it easy to add new ones without touching existing code.
- **API versioning** (`/api/v1/`) allows non breaking upgrades.
- **Rate limiting** protects against brute force and DDoS.
- **Next steps for scale**: add Redis caching for frequent reads, extract modules into microservices behind an API gateway, use PM2 for process management, containerize with Docker, and deploy behind a load balancer (e.g. NGINX + multiple Node instances).