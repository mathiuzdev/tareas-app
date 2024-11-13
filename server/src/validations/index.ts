import Joi from "joi";

import { loginSchema } from "./loginValidation";
import { registerSchema } from "./registerValidation";
import { taskSchema } from "./taskValidations";

export { loginSchema, registerSchema, taskSchema };