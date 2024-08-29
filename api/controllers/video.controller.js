import Video from "../models/video.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllVideos = async (req, res, next) => {
  if (req.method === "POST") {
    const isAuthorized = req.body.user ? true : false

    try {
      const videos = isAuthorized ? await Video.find() : await Video.find({private: false});
      if (!videos || videos.length === 0)
        return next(errorHandler(401, "Failed to fetch the data"));

      res.status(201).json({ videos });
    } catch (error) {
      next(error);
    }
  }
};
