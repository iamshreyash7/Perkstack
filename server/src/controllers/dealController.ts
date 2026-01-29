import { Request, Response } from 'express';
import Deal from '../models/Deal';

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
export const getDeals = async (req: Request, res: Response) => {
    try {
        const deals = await Deal.find({});
        res.json(deals);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Public
export const getDealById = async (req: Request, res: Response) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (deal) {
            res.json(deal);
        } else {
            res.status(404).json({ message: 'Deal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
