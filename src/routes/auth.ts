import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../database/models';
import { IAdmin } from '../database/models';
import jwt from 'jsonwebtoken';

const auth_router = express.Router();

auth_router.post('/', async (req: Request, res: Response) => {
  try {
    // the code has already been aproved till this point
    return res.send({ message: 'approved' });
  } catch (error: any) {
    console.log("error in auth.ts POST '/'");
    console.log(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

auth_router.post('/register', async (req, res) => {
  const { username, password, superUserCode } = req.body;

  if (superUserCode !== process.env.SUPER_USER_CODE) {
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

auth_router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin: IAdmin | null = await Admin.findOne({ username });

  if (!admin) {
    return res.status(404).send('Admin not found');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).send('Invalid password');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: admin._id }, 'your-secret-key');
  const userID = admin._id;

  res.json({ token, userID });
});

export { auth_router };
