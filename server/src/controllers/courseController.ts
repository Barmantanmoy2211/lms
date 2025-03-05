import {Request, Response } from "express";
import Course from "../models/courseModel";


export const listCourses = async (
    req: Request, 
    res: Response
):Promise<void> => {
    const {catagory} = req.query;
    try {
        const courses  = catagory && catagory !== "all" ? await Course.scan("catagory").eq(catagory).exec() : await Course.scan().exec();

        res.json({ message: "Courses retrived successfully", data: courses})
    } catch (error) {
        res.status(500).json({message : "Error retriving courses", error});
    }
};

export const getCourse = async (
    req: Request, 
    res: Response
) : Promise<void> => {
    const {courseId} = req.params;
    try {
        const course = await Course.get(courseId);
        if(!course) {
            res.status(404).json({ message: "Course not found"});
            return;
        }

        res.json({ message: "Courses retrived successfully", data: course})
    } catch (error) {
        res.status(500).json({message : "Error retriving course", error});
    }
}