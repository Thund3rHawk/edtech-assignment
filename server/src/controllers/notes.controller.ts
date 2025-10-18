import { Response } from 'express';
import  prisma  from '../db/index';
import { AuthRequest } from '../types/index';

export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { folderId, search, pinned } = req.query;

    const where: any = { userId: req.user!.userId };

    if (folderId) where.folderId = folderId as string;
    if (pinned === 'true') where.isPinned = true;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } }
      ];
    }

    const notes = await prisma.note.findMany({
      where,
      include: {
        folder: { select: { id: true, name: true, color: true } }
      },
      orderBy: [
        { isPinned: 'desc' },
        { updatedAt: 'desc' }
      ]
    });

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findFirst({
      where: { id, userId: req.user!.userId },
      include: {
        folder: { select: { id: true, name: true, color: true } }
      }
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, tags, folderId } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        tags: tags || [],
        folderId: folderId || null,
        userId: req.user!.userId
      },
      include: {
        folder: { select: { id: true, name: true, color: true } }
      }
    });

    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, tags, folderId, isPinned, isFavorite } = req.body;

    const note = await prisma.note.findFirst({
      where: { id, userId: req.user!.userId }
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
        tags,
        folderId,
        isPinned,
        isFavorite
      },
      include: {
        folder: { select: { id: true, name: true, color: true } }
      }
    });

    res.status(200).json({ note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findFirst({
      where: { id, userId: req.user!.userId }
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    await prisma.note.delete({ where: { id } });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const togglePin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findFirst({
      where: { id, userId: req.user!.userId }
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { isPinned: !note.isPinned }
    });

    res.status(200).json({ note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};