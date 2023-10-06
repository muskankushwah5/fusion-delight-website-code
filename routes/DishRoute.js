import express from "express";
import { addDishHandler, deleteDishHandler, getAllDishHandler, updateDishHandler } from "../Controller/dish_controller.js";

const router = express.Router();

router.post("/add-dish",addDishHandler);

router.put("/update-dish/:dishId",updateDishHandler);

router.delete("/delete-dish/:dishId",deleteDishHandler);

router.get("/all-dishes",getAllDishHandler);

export default router;