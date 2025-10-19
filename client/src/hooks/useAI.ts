import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useSummarize() {
  return useMutation({
    mutationFn: async (content: string) => {
      const response = await api.post<{ summary: string }>('/ai/summarize', { content });
      return response.data.summary;
    },
  });
}

export function useGenerateTags() {
  return useMutation({
    mutationFn: async (content: string) => {
      const response = await api.post<{ tags: string[] }>('/ai/generate-tags', { content });
      return response.data.tags;
    },
  });
}

export function useGenerateTitle() {
  return useMutation({
    mutationFn: async (content: string) => {
      const response = await api.post<{ title: string }>('/ai/generate-title', { content });
      return response.data.title;
    },
  });
}

export function useChatWithNotes() {
  return useMutation({
    mutationFn: async (question: string) => {
      const response = await api.post<{ answer: string }>('/ai/chat', { question });
      return response.data.answer;
    },
  });
}

export function useSemanticSearch() {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await api.get<{ notes: any[] }>(`/ai/semantic-search?query=${encodeURIComponent(query)}`);
      return response.data.notes;
    },
  });
}