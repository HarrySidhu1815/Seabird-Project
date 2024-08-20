import Video from "../models/video.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllVideos = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      const videos = await Video.find();
      if (!videos || videos.length === 0)
        return next(errorHandler(401, "Failed to fetch the data"));

      res.status(201).json({ videos });
    } catch (error) {
      next(error);
    }
  }
};
