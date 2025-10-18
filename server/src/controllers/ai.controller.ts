import { Response } from 'express';
import { AuthRequest } from '../types/index';
import { AIService } from '../services/ai.service';
import prisma from '../db/index';

export const summarizeNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }

    const summary = await AIService.summarizeNote(content);

    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate summary' });
  }
};

export const generateTags = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }

    const tags = await AIService.generateTags(content);

    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate tags' });
  }
};

export const generateTitle = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: 'Content is required' });
      return;
    }

    const title = await AIService.generateTitle(content);

    res.status(200).json({ title });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate title' });
  }
};

export const chatWithNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { question } = req.body;

    if (!question) {
      res.status(400).json({ message: 'Question is required' });
      return;
    }

    const notes = await prisma.note.findMany({
      where: { userId: req.user!.userId },
      select: { title: true, content: true }
    });

    if (notes.length === 0) {
      res.status(400).json({ message: 'No notes available to chat with' });
      return;
    }

    const answer = await AIService.chatWithNotes(question, notes);

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process chat request' });
  }
};

export const semanticSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    if (!query) {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }

    const allNotes = await prisma.note.findMany({
      where: { userId: req.user!.userId },
      select: { id: true, title: true, content: true }
    });

    const relevantNoteIds = await AIService.semanticSearch(query as string, allNotes);

    const notes = await prisma.note.findMany({
      where: { id: { in: relevantNoteIds } },
      include: {
        folder: { select: { id: true, name: true, color: true } }
      }
    });

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
};