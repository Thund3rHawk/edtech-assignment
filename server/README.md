
### Backend (Express + TypeScript)

```
notegenius-backend/
├── src/
│   ├── config/
│   │   ├── database.ts        # Prisma client configuration
│   │   └── env.ts             # Environment variables
│   ├── controllers/
│   │   ├── auth.controller.ts # Authentication logic
│   │   ├── notes.controller.ts# Notes CRUD logic
│   │   ├── folders.controller.ts # Folders CRUD logic
│   │   └── ai.controller.ts   # AI features logic
│   ├── middleware/
│   │   ├── auth.ts            # JWT verification
│   │   └── errorHandler.ts   # Global error handling
│   ├── routes/
│   │   ├── auth.routes.ts     # Auth endpoints
│   │   ├── notes.routes.ts    # Notes endpoints
│   │   ├── folders.routes.ts  # Folders endpoints
│   │   └── ai.routes.ts       # AI endpoints
│   ├── services/
│   │   └── ai.service.ts      # Groq AI integration
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── utils/
│   │   └── jwt.ts             # JWT utilities
│   └── server.ts              # Express app entry point
├── prisma/
│   └── schema.prisma          # Database schema
└── .env                       # Environment variables
```

### Database Schema

```prisma
- User (id, email, password, name, avatar)
- RefreshToken (id, token, userId, expiresAt)
- Folder (id, name, color, icon, userId)
- Note (id, title, content, tags, summary, isPinned, folderId, userId)
```
---