import express, { Router } from "express";
import {
	createTask,
	getTasks,
	updateTaskStatus,
	deleteTask,
} from "../controllers/taskController";

const router: Router = express.Router();

/** Route for creating a new task */
router.post("/", createTask);

/** Route for retrieving tasks */
router.get("/", getTasks);

/** Route for updating a task's status */
router.put("/:id/status", updateTaskStatus);

/** Route for deleting a task */
router.delete("/:id", deleteTask);

export default router;