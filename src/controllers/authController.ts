import { Request, Response } from 'express';
import { loginUser, logoutUser } from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const userId = await loginUser(email, password);
    res.json({ userId });
  } catch (error) {
    res.status(401).send((error as Error).message);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await logoutUser();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
