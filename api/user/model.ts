import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "panjang minimal 6 karakter"],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    about: String,
    work_experience: [
      {
        company_name: String,
        position: String,
        start_date: Date,
        end_date: Date,
        additional_information: String,
      },
    ],
    education: [
      {
        school_name: String,
        major: String,
        start_date: Date,
        end_date: Date,
        additional_information: String,
      },
    ],
    token: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
