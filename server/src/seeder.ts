import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deal from './models/Deal';
import User from './models/User';
import { connectDB } from './config/db';

dotenv.config();

const deals = [
    {
        title: 'AWS Activate',
        description: 'Get $5,000 in AWS credits for 2 years. Access to AWS support and training.',
        category: 'Cloud',
        discountDetails: '$5,000 Credits',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        isLocked: true,
        eligibilityCriteria: 'Must be a bootstrapped or funded startup.',
        expirationDate: new Date('2025-12-31'),
    },
    {
        title: 'Notion Plus',
        description: '6 months free of Notion Plus with AI. Organize your work and knowledge.',
        category: 'Productivity',
        discountDetails: '6 Months Free',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
        isLocked: true,
    },
    {
        title: 'HubSpot for Startups',
        description: 'Up to 90% off HubSpot software for eligible startups.',
        category: 'Marketing',
        discountDetails: '90% Off',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/HubSpot_Logo.svg/2560px-HubSpot_Logo.svg.png',
        isLocked: true,
    },
    {
        title: 'Stripe Atlas',
        description: 'Save 50% on Stripe Atlas setup fee. Incorporate your company easily.',
        category: 'Finance',
        discountDetails: '50% Off Setup',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
        isLocked: false,
    },
    {
        title: 'Linear',
        description: 'Free standard plan for 6 months. Build products better.',
        category: 'Productivity',
        discountDetails: '6 Months Free',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Linear_logo_icon.png',
        isLocked: true,
    },
    {
        title: 'Vercel Pro',
        description: 'Credits for Vercel Pro to deploy your Next.js apps.',
        category: 'Cloud',
        discountDetails: '$1000 Credits',
        logoUrl: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
        isLocked: true,
    }
];

const seedData = async () => {
    try {
        await connectDB();
        await Deal.deleteMany();
        await User.deleteMany();

        await Deal.insertMany(deals);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

seedData();
