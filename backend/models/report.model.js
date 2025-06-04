import mongoose from "mongoose";
const ReportSchema = new mongoose.Schema(
  {
    image: {
      type: String, // Store image as a URL or file path (if uploaded to cloud storage like Cloudinary or S3)
      default: null,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    datetime: {
      type: Date,
      default: Date.now, // Defaults to the current date and time if not provided
    },
    name: {
      type: String,
      trim: true,
      default: "Anonymous", // Default to 'Anonymous' if not provided
    },
    contact: {
      type: String,
      trim: true,
      default: null,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Overflowing Bins",
        "Illegal Dumping",
        "Hazardous Waste",
        "Animal Waste",
        "Other",
      ],
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
