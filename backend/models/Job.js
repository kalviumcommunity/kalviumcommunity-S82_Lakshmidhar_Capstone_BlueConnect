<<<<<<< HEAD
=======

>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
<<<<<<< HEAD
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
    },
    company: {
      type: String,
=======
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
    },
<<<<<<< HEAD
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Internship', 'Freelance'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    category: {
      type: String,
    },
    budget: {
      type: Number,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
    applicants: [
      {
        workerId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        bidAmount: Number,
        coverLetter: String,
=======
    company: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

<<<<<<< HEAD
export default mongoose.model('Job', jobSchema);
=======
const Job = mongoose.model('Job', jobSchema);
export default Job;
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
