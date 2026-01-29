import { Request, Response } from 'express';
import Claim from '../models/Claim';
import Deal from '../models/Deal';

// Create a new claim
export const createClaim = async (req: Request, res: Response) => {
    try {
        const { dealId } = req.body;
        const userId = req.user._id;

        console.log('User', userId, 'attempting to claim deal:', dealId);

        // Check if the deal exists
        const deal = await Deal.findById(dealId);
        if (!deal) {
            console.log('Deal not found:', dealId);
            return res.status(404).json({ message: 'Deal not found' });
        }

        // Check if user already claimed this deal
        const existingClaim = await Claim.findOne({ userId, dealId });
        if (existingClaim) {
            console.log('User already claimed this deal');
            return res.status(400).json({ message: 'Deal already claimed' });
        }

        // TODO: Add actual verification logic here
        // For now, just auto-approve all claims
        const status = 'approved';

        // Generate a random redemption code
        const redemptionCode = `PROMO-${Math.random().toString(36).substring(7).toUpperCase()}`;

        console.log('Generated code:', redemptionCode);

        // Create the claim
        const claim = await Claim.create({
            userId,
            dealId,
            status,
            redemptionCode,
        });

        console.log('Claim created successfully:', claim._id);
        res.status(201).json(claim);
    } catch (error) {
        console.error('Error creating claim:', error);
        res.status(500).json({ message: (error as Error).message });
    }
};

// Get all claims for the logged in user
export const getMyClaims = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        console.log('Fetching claims for user:', userId);

        // Find all claims and populate deal info
        const claims = await Claim.find({ userId: userId }).populate('dealId');

        console.log('Found', claims.length, 'claims');
        res.json(claims);
    } catch (error) {
        console.error('Error fetching claims:', error);
        res.status(500).json({ message: (error as Error).message });
    }
};
