import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "API Routes are working",
  });
};

export const fetchUser = async (req, res, next) => {
  if (req.method === "POST") {
    const isAdmin = req.body.user?.admin;

    try {
      let users;

      if (isAdmin) {
        users = await User.find().select(
          "-password -dateAdded -username -admin -__v"
        );
      } else {
        res.status(403).json({ message: "User not authorized" });
      }

      if (!users || users.length === 0)
        return next(errorHandler(401, "Failed to fetch the data"));

      res.status(201).json({ users });
    } catch (error) {
      next(error);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.method === "DELETE") {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id)
  
        if(!deletedUser){
          return next(errorHandler(404, 'User not found'))
        }
  
        return res.status(200).json({message: 'User deleted successfully'})
      } catch (error) {
        return next(errorHandler(500, 'Server error'))
      }

  }
};
