import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllResources = async (req, res, next) => {
  if (req.method === "GET") {
    try {
      const resource = await Resource.find();
      if (!resource || resource.length === 0)
        return next(errorHandler(401, "Failed to fetch the data"));

      res.status(201).json({ resource });
    } catch (error) {
      next(error);
    }
  }
};