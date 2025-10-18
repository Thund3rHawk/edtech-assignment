import { Response } from 'express';
import prisma  from '../db/index';
import { AuthRequest } from '../types/index';

export const getFolders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user!.userId },
      include: {
        _count: {
          select: { notes: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ folders });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, color, icon } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Folder name is required' });
      return;
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        color: color || '#3b82f6',
        icon,
        userId: req.user!.userId
      }
    });

    res.status(201).json({ folder });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, color, icon } = req.body;

    const folder = await prisma.folder.findFirst({
      where: { id, userId: req.user!.userId }
    });

    if (!folder) {
      res.status(404).json({ message: 'Folder not found' });
      return;
    }

    const updatedFolder = await prisma.folder.update({
      where: { id },
      data: { name, color, icon }
    });

    res.status(200).json({ folder: updatedFolder });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const folder = await prisma.folder.findFirst({
      where: { id, userId: req.user!.userId }
    });

    if (!folder) {
      res.status(404).json({ message: 'Folder not found' });
      return;
    }

    await prisma.folder.delete({ where: { id } });

    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};