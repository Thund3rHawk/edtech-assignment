# EdTech Fullstack Developer Assignment


A sophisticated full-stack application demonstrating modern web development with AI integration


## 📋 Assignment Requirements - Completed ✅

### Mandatory Requirements

| Requirement | Status | Implementation |
|------------|--------|----------------|
| **Next.js 15** | ✅ | App Router, Server/Client Components |
| **TypeScript** | ✅ | Full type safety across frontend & backend |
| **React.js** | ✅ | Hooks, Context API, Component Architecture |
| **Tailwind CSS** | ✅ | Custom design system with dark mode |
| **PostgreSQL/MongoDB** | ✅ | PostgreSQL with Prisma ORM |
| **Git Version Control** | ✅ | GitHub repository with commits |
| **CRUD Operations** | ✅ | Complete Create, Read, Update, Delete |
| **Authentication** | ✅ | JWT-based secure authentication |
| **User Interface** | ✅ | Responsive, accessible, modern UI |
| **Deployment** | ✅ | Vercel (Frontend) + Railway (Backend) |
| **Code Optimization** | ✅ | Code splitting, SSR, caching |

### Optional Requirements (Bonus)

| Requirement | Status | Implementation |
|------------|--------|----------------|
| **AI Integration** | ✅ | Groq (Llama 3.1) for 5+ AI features |
| **Advanced Security** | ✅ | JWT refresh tokens, bcrypt hashing |
| **Real-time Features** | ✅ | Optimistic updates, React Query |

---

## 🎯 Project Overview

**NoteGenius** is an intelligent note-taking application that goes far beyond basic CRUD operations. It demonstrates:

- **Advanced Problem Solving**: AI-powered features that add real value
- **Production-Ready Architecture**: Scalable, secure, and maintainable
- **Modern Tech Stack**: Latest technologies and best practices
- **Real-World Application**: Addresses actual user needs

### Why This Project Stands Out

❌ **NOT a basic CRUD app** - It's a complete AI-powered solution  
✅ **Innovative AI Features** - 5 different AI capabilities  
✅ **Professional Quality** - Production-ready code  
✅ **Real Value** - Solves actual productivity problems  
✅ **Scalable Architecture** - Clean separation of concerns

---

## 🌟 Key Features

### 🤖 AI-Powered Intelligence (Using Groq)

1. **Smart Summarization**
   - Condenses long notes into 2-3 key sentences
   - Powered by Llama 3.1-8B-Instant model
   - Saves time reviewing lengthy content

2. **Automatic Tag Generation**
   - AI analyzes content and suggests relevant tags
   - Helps organize and categorize notes automatically
   - Generates 3-5 contextually relevant tags

3. **Intelligent Title Generation**
   - Creates descriptive titles from note content
   - Eliminates "Untitled Note" syndrome
   - Smart and context-aware

4. **AI Chat Assistant**
   - Ask questions about your notes
   - Get answers based on your note collection
   - Natural language understanding

5. **Semantic Search**
   - Search by meaning, not just keywords
   - AI understands context and intent
   - Find relevant notes faster

### 📝 Core Functionality

- **Full CRUD Operations** - Create, Read, Update, Delete notes
- **Rich Text Support** - Format notes with proper content structure
- **Folder Organization** - Organize notes into custom folders
- **Pin Important Notes** - Keep critical notes at the top
- **Advanced Search** - Real-time search across all notes
- **Tag System** - Multiple tags per note for categorization
- **Responsive Design** - Works seamlessly on all devices

### 🔐 Security & Authentication

- **JWT Authentication** - Secure token-based auth system
- **Refresh Tokens** - Automatic token refresh for better UX
- **Password Encryption** - Bcrypt hashing (10 rounds)
- **Protected Routes** - Middleware-based route protection
- **HTTP-Only Storage** - Secure token storage
- **Input Validation** - Zod schemas for all inputs

### 🎨 User Experience

- **Dark Mode** - Complete dark theme support
- **Loading States** - Clear feedback on all operations
- **Error Handling** - User-friendly error messages
- **Smooth Animations** - Polished transitions
- **Accessibility** - ARIA labels and keyboard navigation
- **Mobile Responsive** - Optimized for all screen sizes




## 🚀 Local Development Setup

### Prerequisites

```bash
- Node.js 18+ 
- npm or yarn
- Git
- Groq API Key (free from console.groq.com)
```

### Backend Setup

```bash
# Clone repository
git clone https://github.com/Thund3rHawk/edtech-assignment.git
cd edtech-assignment/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
# Backend runs on http://localhost:8000
```

### Frontend Setup

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
# Frontend runs on http://localhost:3000
```

## 🚀 Deployment

### Live URLs

- **Frontend**: [https://edtech-assignment-rho.vercel.app/](https://edtech-assignment-rho.vercel.app/)
- **Backend API**: [https://edtech-assignment-8jyg.onrender.com](https://edtech-assignment-8jyg.onrender.com)
- **GitHub**: [https://github.com/Thund3rHawk/edtech-assignment.git](https://github.com/Thund3rHawk/edtech-assignment.git)


