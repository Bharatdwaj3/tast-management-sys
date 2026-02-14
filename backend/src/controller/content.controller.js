import mongoose from "mongoose";
import User from "../models/user.model.js";
import Content from "../models/content.model.js";
import cloudinary from "../services/cloudinary.service.js";



const getContents =async(req, res)=>{
    try{
      const Contents = await Content.find({})
      .populate('author', 'fullName userName avatar accountType');
      res.status(200).json(Contents);
    }catch(error){
        console.error("Cannot get Contents!!",error);
        res.status(500).json({message: error.message});
    }
};

const getContent = async (req, res) => {
  try {
    const { id } = req.params;
    const Contents = await Content.findById(id)
    .populate('author', 'fullName userName avatar accountType');
    res.status(200).json(Contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createContent = async (req, res) => {
  try {
    if (!req.body) req.body = {};

    const {
        title, description, category, mediaType, author
    } = req.body;

    if (!title || !category ) {
      return res.status(400).json({
        message: "Title, Category and Author are required",
        deletedWriterId: ""
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        message: "Please login to create content",
        deletedWriterId: ""
      });
    }

    const contentData = {
      title,
      category: category,
      author: req.user.id ,
      mediaType: mediaType || 'text',
      description: description || undefined,
      userId: req.user.id
    };

    

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "content",
        use_filename: true,
        resource_type: "image",
      });
      contentData.mediaUrl = result.secure_url;
      contentData.cloudinaryId = result.public_id;
    }

    const content = new Content(contentData);
    await content.save();

    res.status(201).json(content);
  } catch (error) {
    console.error("create Content error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    if (!req.body) req.body = {};

    const {
        title, description, category, mediaType, author
    } = req.body;

    const updates = {
      title, category, author,
      description: description,
      mediaType: mediaType
    };

    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "contents",
        use_filename: true,
      });
      updates.mediaUrl = result.secure_url;
      updates.cloudinaryId = result.public_id;
    }

    const content = await Content.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!content) return res.status(404).json({ message: "Product not found" });

    res.json(content);
  } catch (error) {
    console.error("update Content error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({
        message: "Content not found",
        deletedWriterId: ""
      });
    }
    res.status(200).json({
      message: "Content deleted successfully",
      deletedWriterId: ""
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      deletedWriterId: ""
    });
  }
};

export {
  getContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
};