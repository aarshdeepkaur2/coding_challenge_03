import * as taskRepository from "../repositories/taskRepository";
import { Task } from "../models/taskModel";

/**
 * Service to create a new task.
 * @param taskData - Task data to create.
 * @returns The created task.
 */
export const createTask = async (taskData: Task): Promise<Task> => {
	return await taskRepository.createTask(taskData);
};

/**
 * Service to retrieve tasks by userId.
 * @param userId - The userId of the tasks.
 * @returns Array of tasks for the given userId.
 */
export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
	return await taskRepository.getTasksByUserId(userId);
};

/**
 * Service to update the status of a task.
 * @param taskId - The ID of the task to update.
 * @param status - The new status of the task.
 * @returns The updated task.
 */
export const updateTaskStatus = async (
	taskId: string,
	status: string
): Promise<{ id: string; status: string }> => {
	return await taskRepository.updateTaskStatus(taskId, status);
};

/**
 * Service to delete a task.
 * @param taskId - The ID of the task to delete.
 * @returns Confirmation of deletion.
 */
export const deleteTask = async (
	taskId: string
): Promise<{ id: string; deleted: boolean }> => {
	return await taskRepository.deleteTask(taskId);
};