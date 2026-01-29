import express from 'express';
import { getDeals, getDealById } from '../controllers/dealController';

const router = express.Router();

router.get('/', getDeals);
router.get('/:id', getDealById);

export default router;
