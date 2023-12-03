import express, { Request, Response } from 'express';
import { Student } from '../database/models';

const student_router = express.Router();

student_router.post('/', async (req: Request, res: Response) => {
  try {
    const StudentList = await Student.find();
    res.json(StudentList);
  } catch (error: any) {
    console.log('error in job.ts GET /');
    console.log(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

student_router.put('/:student_id/approval', async (req: Request, res: Response) => {
  try {
    const StudentId: string = req.params.student_id;
    const approval: boolean | undefined = req.body.verified;
    if (approval === undefined) return res.status(400).send({ message: 'Invalid verified status status' });
    const updatedProfile = await Student.findByIdAndUpdate(StudentId, { isVerified: approval }, { new: true });
    if (!updatedProfile) return res.status(404).send({ message: 'Student not found' });
    res.send(updatedProfile);
  } catch (error: any) {
    console.log('error in job.ts PUT /:student_id/approval');
    console.log(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

export { student_router };
