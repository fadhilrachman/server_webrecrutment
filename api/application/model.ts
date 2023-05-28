import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  status: {
    type: String,
    enum: [
      "in review",
      "enter the shortlist",
      "interview",
      "test",
      "recruited",
      "inappropriate",
    ],
  },
  notes: String,
  cover_latter: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Application", applicationSchema);
