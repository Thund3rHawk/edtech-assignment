import Groq from 'groq-sdk';
import { config } from '../config/env';

const groq = new Groq({
  apiKey: config.groqApiKey
});

export class AIService {
  // Summarize note content
  static async summarizeNote(content: string): Promise<string> {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes notes concisely.'
          },
          {
            role: 'user',
            content: `Summarize the following note in 2-3 concise sentences. Keep it clear and informative:\n\n${content}`
          }
        ],
        model: 'llama-3.1-8b-instant', // Fast and free
        temperature: 0.7,
        max_tokens: 150,
      });

      return completion.choices[0]?.message?.content?.trim() || 'Summary not available';
    } catch (error) {
      console.error('AI Summarization error:', error);
      throw new Error('Failed to generate summary');
    }
  }

  // Generate tags from content
  static async generateTags(content: string): Promise<string[]> {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates relevant tags. Return ONLY comma-separated tags, no additional text.'
          },
          {
            role: 'user',
            content: `Generate 3-5 relevant tags for the following note content. Return ONLY comma-separated tags:\n\n${content}`
          }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.5,
        max_tokens: 50,
      });

      const tagsText = completion.choices[0]?.message?.content?.trim() || '';
      
      return tagsText
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0 && tag.length < 30) // Filter out long strings
        .slice(0, 5);
    } catch (error) {
      console.error('AI Tag generation error:', error);
      throw new Error('Failed to generate tags');
    }
  }

  // Generate title from content
  static async generateTitle(content: string): Promise<string> {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates concise titles. Return ONLY the title, no quotes or additional text.'
          },
          {
            role: 'user',
            content: `Generate a concise, descriptive title (max 10 words) for this note. Return ONLY the title:\n\n${content.substring(0, 500)}`
          }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 30,
      });

      const title = completion.choices[0]?.message?.content?.trim() || 'Untitled Note';
      return title.replace(/^["']|["']$/g, ''); // Remove quotes if present
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
      
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that answers questions based on provided notes. Be concise and accurate.'
          },
          {
            role: 'user',
            content: `Based on the following notes, answer this question: "${question}"\n\nNotes:\n${context}\n\nProvide a clear, helpful answer based on the notes.`
          }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content?.trim() || 'I could not generate an answer.';
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
      
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a search assistant. Return ONLY comma-separated numbers (indices) of the most relevant notes.'
          },
          {
            role: 'user',
            content: `Given this search query: "${query}"\n\nFind the most relevant note indices from these notes (return only comma-separated numbers):\n\n${notesText}`
          }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.3,
        max_tokens: 50,
      });

      const responseText = completion.choices[0]?.message?.content?.trim() || '';
      const indices = responseText
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
