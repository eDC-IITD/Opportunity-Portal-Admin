import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if the Authorization header is present in the request
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token', error: err.message });
    }

    const decodedUserId: string = (decoded as jwt.JwtPayload).userId;
    if (!decodedUserId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid payload' });
    }
    // If the token is valid, you can access the payload (decoded) in subsequent middleware or route handlers
    if (req.body.userId) {
      if (req.body.userId !== decodedUserId) {
        return res.status(401).json({ message: 'Unauthorized - Invalid userId' });
      }
    }

    req.user = { userId: decodedUserId };
    next();
  });
};

export { authenticationMiddleware };
