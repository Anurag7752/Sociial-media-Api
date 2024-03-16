import Blog from "../model/Blog.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (blogs.length === 0) {
        return res.status(404).json({ message: "No Blogs found" });
    }
    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
   
        await session.commitTransaction();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const { title, description } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        }, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ blog });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ blog });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByIdAndRemove(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userBlogs = await UserActivation.findById(userId).populate("blogs");
        if (!userBlogs) {
            return res.status(404).json({ message: "User not found or no blogs found" });
        }
        return res.status(200).json({ blogs: userBlogs.blogs });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

