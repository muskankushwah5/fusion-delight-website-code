import express from "express";
import  { changePasswordHandler, changePasswordWithTokenHandler, getAllUserHandler, loginHandler, sendForgetPasswordTokenHandler, signupHandler, updateUserHandler } from "../Controller/userController.js";

const router = express.Router();

router.post("/login",loginHandler);
router.post("/signup",signupHandler);

router.post("/change-password",changePasswordHandler)
router.post("/change-password-token",changePasswordWithTokenHandler)

router.post("/forgot-password",sendForgetPasswordTokenHandler);

router.put("/update-user/:userId",updateUserHandler)

router.get("/all-users",getAllUserHandler);

export default router;