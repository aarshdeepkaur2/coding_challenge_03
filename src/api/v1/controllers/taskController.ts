import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import { Task } from "../models/taskModel";

/**
 * Controller for creating a task.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 */
export const createTask = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const task: Task = await taskService.createTask(req.body);
		res.status(201).json({
			status: "success",
			data: task,
			message: "Task created",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Controller for retrieving tasks based on userId.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 */
export const getTasks = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const userId: string = req.query.userId as string;
		const tasks: Task[] = await taskService.getTasksByUserId(userId);
		res.status(200).json({
			status: "success",
			data: tasks,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Controller for updating a task's status.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 */
export const updateTaskStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const updatedTask = await taskService.updateTaskStatus(
			req.params.id,
			req.body.status
		);
		res.status(200).json({
			status: "success",
			data: updatedTask,
			message: "Task status updated",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Controller for deleting a task.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 */
export const deleteTask = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		await taskService.deleteTask(req.params.id);
		res.status(200).json({
			status: "success",
			data: null,
			message: "Task deleted",
		});
	} catch (error) {
		next(error);
	}
};