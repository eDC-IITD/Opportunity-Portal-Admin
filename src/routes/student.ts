import express, { Request, Response } from 'express';
import { Student } from '../database/models';

const studentRouter = express.Router();

studentRouter.get('/', async (req: Request, res: Response) => {
  try {
    const studentList = await Student.find().lean();
    res.json(studentList);
  } catch (error: any) {
    console.error('error in job.ts GET /');
    console.error(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

studentRouter.patch('/:studentId', async (req: Request, res: Response) => {
  try {
    const StudentId: string = req.params['studentId'];
    const approval: boolean | undefined = req.body.verified;
    if (approval === undefined) return res.status(400).send({ message: 'Invalid verified status status' });
    const updatedProfile = await Student.findByIdAndUpdate(StudentId, { isVerified: approval }, { new: true }).lean();
    if (!updatedProfile) return res.status(404).send({ message: 'Student not found' });
    res.send(updatedProfile);
  } catch (error: any) {
    console.error('error in job.ts PATCH /:studentId');
    console.error(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

export { studentRouter };
