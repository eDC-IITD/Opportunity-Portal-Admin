import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Your secret key for signing and verifying JWTs
const secretKey = 'your-secret-key';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if the Authorization header is present in the request
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // If the token is valid, you can access the payload (decoded) in subsequent middleware or route handlers
    (req as any).user = decoded;
    if (req.body.userID) {
      if (req.body.userID !== (decoded as any).userId.toString()) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }
    }

    next();
  });
};

export { authenticationMiddleware };
