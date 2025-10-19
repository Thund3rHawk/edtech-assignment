export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  summary?: string;
  aiTitle?: string;
  isPinned: boolean;
  isFavorite: boolean;
  folderId?: string;
  folder?: {
    id: string;
    name: string;
    color: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  icon?: string;
  userId: string;
  _count?: {
    notes: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Request/Response types for API calls
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tags?: string[];
  folderId?: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  tags?: string[];
  folderId?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
  summary?: string;
}

export interface CreateFolderRequest {
  name: string;
  color?: string;
  icon?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  color?: string;
  icon?: string;
}

export interface AISummarizeRequest {
  content: string;
}

export interface AIGenerateTagsRequest {
  content: string;
}

export interface AIGenerateTitleRequest {
  content: string;
}

export interface AIChatRequest {
  question: string;
}

export interface AISummarizeResponse {
  summary: string;
}

export interface AIGenerateTagsResponse {
  tags: string[];
}

export interface AIGenerateTitleResponse {
  title: string;
}

export interface AIChatResponse {
  answer: string;
}

export interface NotesResponse {
  notes: Note[];
}

export interface NoteResponse {
  note: Note;
}

export interface FoldersResponse {
  folders: Folder[];
}

export interface FolderResponse {
  folder: Folder;
}

export interface UserResponse {
  user: User;
}

// Utility types
export type NoteStatus = 'pinned' | 'favorite' | 'archived' | 'normal';

export type SortBy = 'createdAt' | 'updatedAt' | 'title' | 'pinned';

export type SortOrder = 'asc' | 'desc';

export interface NotesFilter {
  folderId?: string;
  search?: string;
  pinned?: boolean;
  favorite?: boolean;
  tags?: string[];
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}