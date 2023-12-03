import mongoose, { Document, Schema, Types } from 'mongoose';

// Startup Interface
export interface IStartup extends Document {
  companyName: string;
  email: string;
  otp?: string; // TODO: Delete when not active
  founder: Array<{
    id: number; // TODO: ??
    name: string;
    bio: string;
    // TOOD: LinkedIn?
  }>;
  jobs: Types.ObjectId[];
  companyVision: string;
  location: string;
  noOfEmployees: number;
  sector: string;
}

// Startup Schema
const StartupSchema: Schema = new Schema({
  companyName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  otp: { type: String, required: true },
  founder: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      bio: { type: String, required: true },
    },
  ],
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  companyVision: { type: String, required: true },
  location: { type: String, required: true },
  noOfEmployees: { type: Number, required: true },
  sector: { type: String, required: true },
});

export const Startup = mongoose.model<IStartup>('Startup', StartupSchema);

// Student Interface
export interface IStudent extends Document {
  name: string;
  email: string;
  otp: string;
  // TODO: Create new object for application
  // Application {jobId, studentId, status, date, CV, coverLetter}
  jobsApplied: Array<{
    jobId: Types.ObjectId;
    status: string;
  }>;
  cgpa: number; // TODO: Constraints?
  course: string; // Validated from frontend options
  department: string;
  resumeLink: string;
  year: string; // TODO: number
  isVerified: boolean; // TODO: Create a verification object, with adminId, timestamp, comments
}

// Student Schema
const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  otp: { type: String, required: true },
  jobsApplied: [
    {
      // TODO: Remove circular reference, use ref: Job.name
      jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
      status: { type: String, required: true },
    },
  ],
  cgpa: { type: Number, required: true },
  course: { type: String, required: true },
  department: { type: String, required: true },
  resumeLink: { type: String, required: true },
  year: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
});

export const Student = mongoose.model<IStudent>('Student', StudentSchema);

// Job Interface
export interface IJob extends Document {
  companyName?: string;
  designation: string;
  type: string;
  duration: string;
  stipend: string;
  noOfOffers: number;
  skillsRequired: string;
  responsibilities: string;
  assignment: string;
  approval: 'pending' | 'approved' | 'disapproved';
  deadline: Date;
  selectionProcess: string;
  startUpId: Types.ObjectId;
  studentsApplied: Array<{
    studentId: Types.ObjectId;
    name: string;
    email: string;
    course: string;
    department: string;
    year: string;
    cgpa: number;
    resumeLink: string;
    whyShouldWeHireYou: string;
    status: string;
  }>;
}

// Job Schema
const JobSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  designation: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: String, required: true },
  stipend: { type: String, required: true },
  noOfOffers: { type: Number, required: true },
  skillsRequired: { type: String, required: true },
  responsibilities: { type: String, required: true },
  assignment: { type: String },
  approval: {
    type: String,
    enum: ['pending', 'approved', 'disapproved'],
    required: true,
    default: 'pending',
  },
  deadline: { type: Date, required: true },
  selectionProcess: { type: String, required: true },
  startUpId: { type: Schema.Types.ObjectId, ref: Startup.name, required: true },
  // TODO: Do not store arrays in DB
  studentsApplied: [
    {
      studentId: { type: Schema.Types.ObjectId, ref: Student.name, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      course: { type: String, required: true },
      department: { type: String, required: true },
      year: { type: String, required: true },
      cgpa: { type: Number, required: true },
      resumeLink: { type: String, required: true },
      whyShouldWeHireYou: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
});

export const Job = mongoose.model<IJob>('Job', JobSchema);

export interface IAdmin extends Document {
  username: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
