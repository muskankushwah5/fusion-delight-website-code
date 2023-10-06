import express from "express";
import { bookingHandler, cancelBookingHandler, getAllBookingsHandler, getSpecificReservationDetailHandler, getSpecificUserAllBookingsHandler } from "../Controller/bokingController.js";

const router = express.Router();

router.post("/add-booking",bookingHandler);

router.get("/get-booking",getAllBookingsHandler);
router.get("/specific-booking/:userId",getSpecificUserAllBookingsHandler);

router.get("/specific-reservation-detail/:reservationId",getSpecificReservationDetailHandler);

router.post("/delete-booking",cancelBookingHandler);

export default router;