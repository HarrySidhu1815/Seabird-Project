import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Video from "../models/video.model.js";
import { errorHandler } from "../utils/error.js";

const s3 = new S3Client(process.env.AWS_REGION);

export const getAllVideos = async (req, res, next) => {
  if (req.method === "POST") {
    const isAuthorized = req.body.user ? true : false;
    const isAdmin = req.body.user?.admin;

    try {
      let videos;

      if (isAdmin) {
        videos = await Video.find();
      } else {
        const visibilityOptions = isAuthorized
          ? ["Members Only", "Public"]
          : ["Public"];
          videos = await Video.find({
          visibility: { $in: visibilityOptions },
        });
      }

      if (!videos || videos.length === 0)
        return next(errorHandler(401, "Failed to fetch the data"));

      res.status(201).json({ videos });
    } catch (error) {
      next(error);
    }
  }
};

export const updateVideo = async (req, res, next) => {
  const updatedKey = Object.keys(req.body.updatedField)[0];
  try {
    const updatedRecord = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          [updatedKey]: req.body.updatedField[updatedKey],
        },
      },
      { new: true }
    );

    if (!updatedRecord) {
      return next(errorHandler(404, "Interview ID not Found"));
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
    Key: `videos/${encodeURIComponent(filename)}`,                      
    ContentType: fileType || 'video/mp4'           
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

export const saveVideoMetaData = async (req, res, next) => {

  try {
    const { title, theme, speakers, videoUrl } = req.body;

    const newVideo = new Video({
      title,
      topic: theme,
      speakers: speakers.split(';').map(speaker => speaker.trim()),
      videoUrl,
      visibility: 'Members Only'
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save video metadata', error });
  }
}

export const deleteVideo = async (req, res, next) => {

  if(req.method === 'DELETE'){

    const id = req.params.id

    try {
      const deletedVideo = await Video.findByIdAndDelete(id)

      if(!deletedVideo){
        return next(errorHandler(404, 'Video not found'))
      }

      return res.status(200).json({message: 'Video deleted successfully'})
    } catch (error) {
      return next(errorHandler(500, 'Server error'))
    }
  }
}