import * as Yup from "yup";
export const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too Short")
    .required("Password is required"),
});
