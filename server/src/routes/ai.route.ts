import { Router } from 'express';
import { summarizeNote, generateTags, generateTitle, chatWithNotes, semanticSearch } from '../controllers/ai.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/summarize', summarizeNote);
router.post('/generate-tags', generateTags);
router.post('/generate-title', generateTitle);
router.post('/chat', chatWithNotes);
router.get('/semantic-search', semanticSearch);

export default router;
