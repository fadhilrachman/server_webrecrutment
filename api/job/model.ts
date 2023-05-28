import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    job_name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
