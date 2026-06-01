import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "main",
      unique: true,
    },
    profile: {
      name: String,
      profile: String,
      designation: String,
      description: String,
      email: String,
      phone: String,
      address: String,
      github: String,
      facebook: String,
      linkedIn: String,
      twitter: String,
      stackOverflow: String,
      leetcode: String,
      devUsername: String,
      resume: String,
    },
    projects: [
      {
        id: Number,
        name: String,
        description: String,
        image: String,
        githubLink: String,
        demoLink: String,
      },
    ],
    skills: [String],
    experiences: [
      {
        id: Number,
        title: String,
        company: String,
        duration: String,
      },
    ],
    educations: [
      {
        id: Number,
        title: String,
        duration: String,
        institution: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
