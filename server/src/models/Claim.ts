import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    redemptionCode: {
        type: String,
    },
    claimDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Compound index to prevent double claiming
claimSchema.index({ userId: 1, dealId: 1 }, { unique: true });

const Claim = mongoose.model('Claim', claimSchema);

export default Claim;
