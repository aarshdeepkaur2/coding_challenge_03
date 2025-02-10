import Joi, { ObjectSchema} from "joi";

export const taskSchema: ObjectSchema = Joi.object({
    userId: Joi.string().required().messages({
        "string.empty": "User ID is required",
    }),

    title: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must not exceed 100 characters",
    }),

    priority: Joi.string().valid("low", "medium", "high").required().messages({
        "any.only": "Priority must be 'low', 'medium', or 'high'",
        "string.empty": "Priority is required",
    }),

    status: Joi.string().valid("pending", "in-progress", "completed").required().messages({
        "any.only": "Status must be 'pending', 'in-progress', or 'completed'",
        "string.empty": "Status is required",
    }),

    dueDate: Joi.date().greater("now").required().messages({
        "date.base": "Due date must be a valid date",
        "date.greater": "Due date must be in the future",
        "any.required": "Due date is required",
    }),
});
