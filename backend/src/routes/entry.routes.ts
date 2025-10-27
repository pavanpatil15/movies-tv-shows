// src/routes/entry.routes.ts
import { Router } from 'express';
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/entry.controller';

const router = Router();

router.get('/', getAllEntries);
router.get('/:id', getEntryById);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

export default router;