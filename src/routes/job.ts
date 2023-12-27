import express, { Request, Response } from 'express';
// import { Job } from '../database/models';
import prisma from '../../prisma/prisma'
const job_router = express.Router();


job_router.post("/", async (req : Request, res : Response) => {
    try{
        // const JobList = await Job.find();
        const JobList = await prisma.job.findMany();
        res.json(JobList)
    }
    catch (error : any) {
        console.log("error in job.ts GET /")
        console.log(error)
        res.status(500).send({message : "Server error", error : error.message || "Internal Server Error"})
    }
})
job_router.put('/:job_id/approval', async (req: Request, res: Response) => {
    try {
        const jobId: string = req.params.job_id;
        const approval : string | undefined  = req.body.approval;
        const notifiedStatus : "notified"|"rejected"|"tobedecided"|"tobenotified" = req.body.notifiedStatus;

        if (!approval || !['pending', 'approved', 'disapproved'].includes(approval))
            return res.status(400).send({ message: 'Invalid approval status' });
        // const updatedJob = await Job.findByIdAndUpdate(jobId, { approval }, { new: true });
        if(!notifiedStatus){
            const updatedJob = await prisma.job.update({
                where : {
                    id : jobId
                },
                data : {
                    approval : approval
                }
            })
            if (!updatedJob) return res.status(404).send({ message: 'Job not found' });
            
            res.send(updatedJob);
        }
        else{
            const updatedJob = await prisma.job.update({
                where : {
                    id : jobId
                },
                data : {
                    approval : approval,
                    notifiedStatus : notifiedStatus
                }
            })
            if (!updatedJob) return res.status(404).send({ message: 'Job not found' });
            
            res.send(updatedJob);
        }
    
    } catch (error : any) {
        console.log("error in job.ts PUT /:job_id/approval")
        console.log(error)
        res.status(500).send({ message: 'Server error', error: error.message || "Internal Server Error" });
    }
});

export {job_router}