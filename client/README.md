## 🛠️ Technical Architecture

### Frontend (Next.js 15)

```
notegenius-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── layout.tsx     # Dashboard layout
│   │   │   └── page.tsx       # Notes dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── providers.tsx      # React Query & Auth providers
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Reusable UI components (Radix)
│   │   ├── dashboard/         # Dashboard components
│   │   ├── notes/             # Note-related components
│   │   ├── folders/           # Folder components
│   │   └── ai/                # AI feature components
│   ├── lib/
│   │   ├── api.ts             # Axios instance with interceptors
│   │   ├── auth.ts            # Authentication service
│   │   └── utils.ts           # Utility functions
│   ├── hooks/
│   │   ├── useNotes.ts        # Notes CRUD hooks
│   │   ├── useFolders.ts      # Folders CRUD hooks
│   │   └── useAI.ts           # AI feature hooks
│   ├── context/
│   │   └── AuthContext.tsx    # Auth state management
│   └── types/
│       └── index.ts           # TypeScript type definitions
```