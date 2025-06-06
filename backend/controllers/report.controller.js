import axios from "axios";
import Report from "../models/report.model.js";
import { uploadMedia } from "../utils/cloudinary.js";

// -------------------------Submit Report with reCAPTCHA verification-------------------------
export const submitReport = async (req, res) => {
  try {
    const {
      description,
      address,
      datetime,
      name,
      contact,
      category,
      captcha, // received from frontend
    } = req.body;

    const image = req.file;

    // ✅ Check reCAPTCHA
    if (!captcha) {
      return res.status(400).json({
        success: false,
        error: "Captcha token is missing.",
      });
    }

    const verifyCaptcha = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        },
      }
    );

    if (!verifyCaptcha.data.success) {
      return res.status(400).json({
        success: false,
        error: "Captcha verification failed.",
      });
    }

    // ✅ Validate required fields
    if (!description || !address || !category || !image) {
      return res.status(400).json({
        success: false,
        error: "Please provide description, address, category, and an image.",
      });
    }

    // ✅ Upload image
    let imageUrl = null;
    if (image) {
      const upload = await uploadMedia(image.path);
      imageUrl = upload.secure_url;
    }

    // ✅ Create report
    const report = await Report.create({
      image: imageUrl,
      description,
      address,
      datetime: datetime || new Date(),
      name: name || "Anonymous",
      contact: contact || null,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully!",
      data: report,
    });
  } catch (error) {
    console.error("Report submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit report.",
    });
  }
};

// ---------------------------------------------------Get All Reports-----------------------------------------
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Get all reports error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
