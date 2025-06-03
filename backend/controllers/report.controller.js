import Report from "../models/report.model.js";
import axios from "axios";
import { uploadMedia } from "../utils/cloudinary.js";

// ---------------------------------------------------Report-----------------------------------------
export const submitReport = async (req, res) => {
  try {
    const {
      description,
      address,
      datetime,
      name,
      contact,
      category,
      mapPosition,
      captchaToken,
    } = req.body;

    const image = req.file;

    // ✅ Verify captcha token with Google's API
    if (!captchaToken) {
      return res
        .status(400)
        .json({ success: false, error: "Captcha is required." });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Your secret key
    const captchaVerificationURL = `https://www.google.com/recaptcha/api/siteverify`;

    const captchaResponse = await axios.post(captchaVerificationURL, null, {
      params: {
        secret: secretKey,
        response: captchaToken,
      },
    });

    const { success: captchaSuccess } = captchaResponse.data;
    if (!captchaSuccess) {
      return res.status(403).json({
        success: false,
        error: "Captcha verification failed. Please try again.",
      });
    }

    //  Validate required fields
    if (!description || !address || !category || !image) {
      return res.status(400).json({
        success: false,
        error: "Please provide description, address, category, and an image.",
      });
    }

    //  Parse mapPosition
    let coordinates;
    try {
      const parsed = Array.isArray(mapPosition)
        ? mapPosition
        : JSON.parse(mapPosition);
      if (!Array.isArray(parsed) || parsed.length !== 2) {
        throw new Error();
      }
      coordinates = [parseFloat(parsed[1]), parseFloat(parsed[0])]; // [lng, lat]
    } catch {
      return res.status(400).json({
        success: false,
        error: "Invalid map position format. Must be [lat, lng].",
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
      mapPosition: {
        type: "Point",
        coordinates: coordinates,
      },
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

// -----------------------------------------------------------Get all report ---------------------------------------------

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Get all reports error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
