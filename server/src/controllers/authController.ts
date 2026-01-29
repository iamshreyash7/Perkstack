import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

// Function to generate JWT token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

// Register new user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        console.log('Registration attempt for:', email); // debug

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            console.log('User created successfully:', user.email);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: (error as Error).message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt:', email);

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log('Login successful for:', email);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id.toString()),
            });
        } else {
            console.log('Login failed for:', email);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: (error as Error).message });
    }
};

// Get current user info
export const getMe = async (req: Request, res: Response) => {
    try {
        // req.user is set by the auth middleware
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: (error as Error).message });
    }
};
