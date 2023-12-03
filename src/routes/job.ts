import express, { Request, Response } from 'express';
import { Job } from '../database/models';

const jobRouter = express.Router();

jobRouter.get('/', async (req: Request, res: Response) => {
  try {
    const jobList = await Job.find().lean();
    res.json(jobList);
  } catch (error: any) {
    console.error('error in job.ts GET /');
    console.error(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

jobRouter.patch('/:jobId/approval', async (req: Request, res: Response) => {
  try {
    const jobId: string = req.params['jobId'];
    const approval: string | undefined = req.body.approval;

    if (!approval || !['pending', 'approved', 'disapproved'].includes(approval))
      return res.status(400).send({ message: 'Invalid approval status' });

    const updatedJob = await Job.findByIdAndUpdate(jobId, { approval }, { new: true }).lean();
    if (!updatedJob) return res.status(404).send({ message: 'Job not found' });

    res.send(updatedJob);
  } catch (error: any) {
    console.error('error in job.ts PATCH /:jobId/approval');
    console.error(error);
    res.status(500).send({ message: 'Server error', error: error.message || 'Internal Server Error' });
  }
});

export { jobRouter };
