import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional().messages({
    "date.base": "Due date must be valid",
  }),
  status: Joi.string().valid("pending", "in progress", "completed").required(),
  tags: Joi.array().items(Joi.number()).optional(),
});
