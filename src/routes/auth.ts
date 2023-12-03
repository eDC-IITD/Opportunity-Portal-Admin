import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../database/models';
import { IAdmin } from '../database/models';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

const authRouter = express.Router();

authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, password, superUserCode } = req.body;

  if (superUserCode !== CONFIG.SUPER_USER_CODE) {
    return res.status(401).send('Unauthorized');
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    password: hashedPassword,
  });

  try {
    await admin.save();
    res.status(201).send('Admin registered successfully');
  } catch (err) {
    res.status(500).send('Registration failed');
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const admin: IAdmin | null = await Admin.findOne({ username }).lean();

  if (!admin) {
    return res.status(404).send('Admin not found');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).send('Invalid password');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: admin._id }, CONFIG.JWT_SECRET_KEY);
  const userId = admin._id; // TODO: Decrypt on Frontend

  res.json({ token, userId });
});

export { authRouter };
