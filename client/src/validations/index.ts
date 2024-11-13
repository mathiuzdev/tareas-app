import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const taskValidationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  dueDate: Yup.date()
    .min(new Date(), "Due date cannot be in the past")
    .required("Due date is required"),
  status: Yup.string().required("Required"),
  tags: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Required"),
      color: Yup.string().required("Required"),
    })
  ),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string().min(3).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(50)
    .matches(
      new RegExp(
        "^(?=.*[A-Z])(?=.*\\d).*$" 
      ),
      "Password must contain at least one uppercase letter and one number"
    )
    .required(),
});
