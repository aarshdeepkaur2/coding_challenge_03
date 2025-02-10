import { db } from "../../../../config/firebaseconfig";
import { Task } from "../models/taskModel";

const tasksCollection = db.collection("tasks");
/**
 * Repository function to create a task in the database.
 * @param taskData - Data of the task to create.
 * @returns Created task with ID.
 */
export const createTask = async (taskData: any): Promise<any> => {
	return { id: "placeholder_id", ...taskData };

export const createTask = async (taskData: Task): Promise<Task> => {
    try {
        const newTaskRef = await tasksCollection.add({
            ...taskData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        return { id: newTaskRef.id, ...taskData };
    } catch (error) {
        throw new Error(`Error creating task: ${(error as Error).message}`);
    }
};

/**
 * Repository function to retrieve tasks the userId.
 * @param userId - The userId to filter tasks by.
 * @returns Array of tasks for the given userId.
 */

export const getTasksByUserId = async (userId: string): Promise<any[]> => {
	return [
		{
			id: "placeholder_id_1",
			userId,
			title: "Sample Task 1",
			priority: "low",
			status: "open",
			dueDate: new Date().toISOString(),
		},
		{
			id: "placeholder_id_2",
			userId,
			title: "Sample Task 2",
			priority: "medium",
			status: "in-progress",
			dueDate: new Date().toISOString(),
		},
	];
export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
    try {
        const snapshot = await tasksCollection.where("userId", "==", userId).get();
        return snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Task)
        );
    } catch (error) {
        throw new Error(`Error fetching tasks: ${(error as Error).message}`);

};

/**
 * Repository function to update the status of a task.
 * @param taskId - The ID of the task to update.
 * @param status - The new status of the task.
 * @returns Updated task with ID and status.
 */
export const updateTaskStatus = async (
	taskId: string,
	status: string
): Promise<{ id: string; status: string }> => {
	return { id: taskId, status };

    try {
        const taskRef = tasksCollection.doc(taskId);
        await db.runTransaction(async (transaction) => {
            const taskDoc = await transaction.get(taskRef);
            if (!taskDoc.exists) {
                throw new Error("Task not found");
            }
            transaction.update(taskRef, { status, updatedAt: new Date().toISOString() });
        });
        return { id: taskId, status };
    } catch (error) {
        throw new Error(`Error updating task status: ${(error as Error).message}`);
    }

};

/**
 * Repository function to delete a task.
 * @param taskId - The ID of the task to delete.
 * @returns Confirmation of deletion with ID.
 */
export const deleteTask = async (
	taskId: string
): Promise<{ id: string; deleted: boolean }> => {

	return { id: taskId, deleted: true };
};

    try {
        const taskRef = tasksCollection.doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            throw new Error("Task not found");
        }
        await taskRef.delete();
        return { id: taskId, deleted: true };
    } catch (error) {
        throw new Error(`Error deleting task: ${(error as Error).message}`);
    }
};

