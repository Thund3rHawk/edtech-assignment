import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export class AIService {
  // Summarize note content
  static async summarizeNote(content: string): Promise<string> {
    try {
      const prompt = `Summarize the following note in 2-3 concise sentences. Keep it clear and informative:\n\n${content}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('AI Summarization error:', error);
      throw new Error('Failed to generate summary');
    }
  }

  // Generate tags from content
  static async generateTags(content: string): Promise<string[]> {
    try {
      const prompt = `Generate 3-5 relevant tags for the following note content. Return ONLY comma-separated tags without any additional text:\n\n${content}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tagsText = response.text().trim();
      
      return tagsText
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0)
        .slice(0, 5);
    } catch (error) {
      console.error('AI Tag generation error:', error);
      throw new Error('Failed to generate tags');
    }
  }

  // Generate title from content
  static async generateTitle(content: string): Promise<string> {
    try {
      const prompt = `Generate a concise, descriptive title (max 10 words) for this note. Return ONLY the title without quotes or additional text:\n\n${content.substring(0, 500)}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().replace(/^["']|["']$/g, '');
    } catch (error) {
      console.error('AI Title generation error:', error);
      throw new Error('Failed to generate title');
    }
  }

  // Chat with notes
  static async chatWithNotes(question: string, notes: Array<{ title: string; content: string }>): Promise<string> {
    try {
      const context = notes
        .map(note => `Title: ${note.title}\n${note.content}`)
        .join('\n\n---\n\n');
      
      const prompt = `Based on the following notes, answer this question: "${question}"\n\nNotes:\n${context}\n\nProvide a clear, helpful answer based on the notes.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('AI Chat error:', error);
      throw new Error('Failed to process chat request');
    }
  }

  // Semantic search
  static async semanticSearch(query: string, notes: Array<{ id: string; title: string; content: string }>): Promise<string[]> {
    try {
      const notesText = notes
        .map((note, idx) => `[${idx}] ${note.title}: ${note.content.substring(0, 200)}`)
        .join('\n\n');
      
      const prompt = `Given this search query: "${query}"\n\nFind the most relevant note indices from these notes (return only comma-separated numbers):\n\n${notesText}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const indices = response.text().trim()
        .split(',')
        .map(idx => parseInt(idx.trim()))
        .filter(idx => !isNaN(idx) && idx >= 0 && idx < notes.length);
      
      return indices.map(idx => notes[idx].id);
    } catch (error) {
      console.error('AI Semantic search error:', error);
      return [];
    }
  }
}