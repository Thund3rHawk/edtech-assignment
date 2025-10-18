import { Router } from 'express';
import { getNotes, getNote, createNote, updateNote, deleteNote, togglePin } from '../controllers/notes.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/pin', togglePin);

export default router;