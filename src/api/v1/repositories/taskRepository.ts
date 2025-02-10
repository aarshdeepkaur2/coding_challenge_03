import { db } from "../../../../config/firebaseconfig";
import { Task } from "../models/taskModel";

const tasksCollection = db.collection("tasks");

/**
 * Repository function to create a task in Firestore.
 * @param taskData - Data of the task to create.
 * @returns Created task with ID.
 */
export const createTask = async (taskData: Task): Promise<Task> => {
    const newTaskRef = await tasksCollection.add(taskData);
    return { id: newTaskRef.id, ...taskData };
};

/**
 * Repository function to retrieve tasks by userId.
 * @param userId - The userId to filter tasks by.
 * @returns Array of tasks for the given userId.
 */
export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
    const snapshot = await tasksCollection.where("userId", "==", userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
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
    await tasksCollection.doc(taskId).update({ status });
    return { id: taskId, status };
};

/**
 * Repository function to delete a task.
 * @param taskId - The ID of the task to delete.
 * @returns Confirmation of deletion with ID.
 */
export const deleteTask = async (
    taskId: string
): Promise<{ id: string; deleted: boolean }> => {
    await tasksCollection.doc(taskId).delete();
    return { id: taskId, deleted: true };
};