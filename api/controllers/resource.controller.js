import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";

const s3 = new S3Client(process.env.AWS_REGION);

export const getAllResources = async (req, res, next) => {
  if (req.method === "POST") {
    const isAuthorized = req.body.user ? true : false;
    const isAdmin = req.body.user?.admin;

    try {
      let resource;

      if (isAdmin) {
        resource = await Resource.find();
      } else {
        const visibilityOptions = isAuthorized
          ? ["Members Only", "Public"]
          : ["Public"];
        resource = await Resource.find({
          visibility: { $in: visibilityOptions },
        });
      }

      if (!resource || resource.length === 0)
        return next(errorHandler(401, "Failed to fetch the data"));

      res.status(201).json({ resource });
    } catch (error) {
      next(error);
    }
  }
};

export const updateCurriculum = async (req, res, next) => {
  const updatedKey = Object.keys(req.body.updatedField)[0];
  console.log(typeof(updatedKey), typeof(req.body.updatedField[updatedKey]))
  try {
    const updatedRecord = await Resource.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          [updatedKey]: req.body.updatedField[updatedKey],
        },
      },
      { new: true }
    );

    if (!updatedRecord) {
      return next(errorHandler(404, "Currciculum ID not Found"));
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};


export const generatePresignedUrl = async (req, res) => {
  const { filename, fileType } = req.body;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,        
    Key: `resources/${encodeURIComponent(filename)}`,                      
    ContentType: fileType          
  };

  try {
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });
    res.json({ url });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Error generating presigned URL' });
  }
};

export const saveLessonMetaData = async (req, res, next) => {

  try {
    const { title, subject, grade, description, fileUrl } = req.body;

    const newLesson = new Resource({
      title,
      subject,
      level: grade,
      description,
      resource_link: fileUrl,
      visibility: 'Members Only'
    });

    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save lesson metadata', error });
  }
}

export const deleteLesson = async (req, res, next) => {

  if(req.method === 'DELETE'){

    const id = req.params.id

    try {
      const deletedLesson = await Resource.findByIdAndDelete(id)

      if(!deletedLesson){
        return next(errorHandler(404, 'Lesson not found'))
      }

      return res.status(200).json({message: 'Lesson deleted successfully'})
    } catch (error) {
      return next(errorHandler(500, 'Server error'))
    }
  }
}