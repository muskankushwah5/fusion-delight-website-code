import moment from "moment";
import bookTable from "../Modal/BookTable.js";
import mongoose from "mongoose";
export const bookingHandler = async (req, res) => {
  try {
    const { email, date, time, preferance } = req.body;

    const existingReservation = await bookTable.findOne({ date, time });

    if (existingReservation) {
      return res.status(400).json({ message: 'Reservation already exists for this date and time.' });
    }

    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');

    // Check if the dateTime is in the future compared to the current date and time
    if (dateTime.isBefore(moment())) {
      return res.status(400).json({ message: 'Booking for this date and time has already passed.' });
    }

    const dayOfWeek = dateTime.day();
    const parsedTime = dateTime.hour();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({ message: 'Reservations are only allowed on working days.' });
    }
    
    if (parsedTime < 8 || parsedTime >= 20) {
      return res.status(400).json({ message: 'Reservations are only allowed between 8 AM and 8 PM.' });
    }

    const newReservation = new bookTable({
      email: email,
      date: date,
      time: time,
      preferences: preferance
    });

    console.log(newReservation);

    await newReservation.save();

    return res.status(201).json({ message: 'Reservation saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSpecificUserAllBookingsHandler = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const bookings = await bookTable.find({ email : userId })
        .sort({ timestamp: -1 }) .exec();
    
        return res.status(200).json({ message : "All booking of the specific User", data : bookings });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  };

  export const getSpecificReservationDetailHandler = async (req, res) => {
    try {
        const reservationId = req.params.reservationId; 
        const bookings = await bookTable.findById({ _id : new mongoose.Types.ObjectId(reservationId) })
        .sort({ timestamp: -1 }) .exec();
        return res.status(200).json({ message : "All booking of the specific User", data : bookings });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  };
  
  

  export const getAllBookingsHandler = async (req, res) => {
    try { 
        const bookings = await bookTable.find({  })
        .sort({ timestamp: -1 }) .exec();
    
        return res.status(200).json({ message : "All booking", data : bookings });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  };
  
  

export const cancelBookingHandler = async (req, res) => {
    try {
      
      const { reservationId, reservationDate, reservationTime } = req.body;
  
      const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
  
      const currentTime = new Date();
  
      const timeDifference = reservationDateTime - currentTime;
  
      if (timeDifference >= 60 * 60 * 1000) {
        const canceledReservation = await bookTable.findByIdAndDelete(reservationId);
  
        if (!canceledReservation) {
          return res.status(404).json({ message: 'Reservation not found.' });
        }
  
        return res.status(200).json({ message: 'Reservation canceled successfully.' });
      } else {
        return res.status(403).json({ message: 'Reservation cannot be canceled due to time constraints.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


