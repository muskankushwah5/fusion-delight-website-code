import express from "express";
import { addOrderHandler, deleteOrderHandler, getAllOrderHandler, getSpecificUserAllOrderHandler, getSpecificUserOrderDetailHandler, getUpdateFailureStatusHandler, getUpdateSuccessStatusHandler, updateOrderStatusHandler } from "../Controller/orderController.js";
import { updateOrderPaymentFailureStatusHandler, updateOrderPaymentSuccessStatusHandler } from "../../client/src/services/orderApi.js";

const router = express.Router();

router.post("/add-order",addOrderHandler);

router.delete("/delete-order/:orderId",deleteOrderHandler);

router.get("/specific-user-order/:userId",getSpecificUserAllOrderHandler);
router.get("/all-orders",getAllOrderHandler);
router.get("/specific-order-details/:userId",getSpecificUserOrderDetailHandler);


router.put("/update-status/:orderId",updateOrderStatusHandler);

router.put("/update-success-status/:orderId",getUpdateSuccessStatusHandler);
router.put("/update-failure-status/:orderId",getUpdateFailureStatusHandler);

export default router;