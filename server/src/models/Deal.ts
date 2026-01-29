import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true, // e.g., 'Cloud', 'Marketing', 'Productivity'
    },
    discountDetails: {
        type: String, // e.g., "50% off for 12 months"
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    isLocked: {
        type: Boolean,
        default: true, // Most deals are locked for unverified users
    },
    eligibilityCriteria: {
        type: String,
        default: "Verified startups only",
    },
    expirationDate: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
