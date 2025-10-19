import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Note } from '@/types';

export function useNotes(folderId?: string, search?: string) {
  return useQuery({
    queryKey: ['notes', folderId, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (folderId) params.append('folderId', folderId);
      if (search) params.append('search', search);
      
      const response = await api.get<{ notes: Note[] }>(`/notes?${params}`);
      return response.data.notes;
    },
  });
}

export function useNote(id: string) {
  return useQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      const response = await api.get<{ note: Note }>(`/notes/${id}`);
      return response.data.note;
    },
    enabled: !!id,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Note>) => {
      const response = await api.post<{ note: Note }>('/notes', data);
      return response.data.note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Note> }) => {
      const response = await api.put<{ note: Note }>(`/notes/${id}`, data);
      return response.data.note;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', variables.id] });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useTogglePin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<{ note: Note }>(`/notes/${id}/pin`);
      return response.data.note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}