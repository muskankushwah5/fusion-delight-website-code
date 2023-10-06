import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import Stripe from "stripe";
const stripe = Stripe("sk_test_51NxYGfSFxfpHSZoyMuToQalTItt2fqG3nAhsJfolXNUAXU7Uh0WBnN3NH0smIQxAvGRetA0Q6ALI0UBPS7wlRtOA00OdOmMixX");

import userRoutes from "./routes/userRoute.js";
import bookingRoute from "./routes/BookingRoute.js";
import dishRoutes from "./routes/DishRoute.js";
import orderRoutes from "./routes/OrderRoute.js";
import Connection from "./database/db.js";
import multer from "multer";
import fs from "fs";

import path from "path";

import { fileURLToPath } from "url";
import user from "./Modal/User.js";
import order from "./Modal/Order.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



dotenv.config();

const PORT = process.env.PORT || 8800;

const url = process.env.URL;

Connection(url);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${uniqueSuffix}.${fileExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.put('/update-profile/:userId', upload.single('profileImage'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const profileImage = req.file; // The uploaded image file

    // Check if there's an existing profile image
    const existingUser = await user.findOne({ email: userId });
    if (existingUser.profileImage) {
      // Delete the existing profile image from the "uploads" folder
      const imagePath = path.join(__dirname, 'uploads', existingUser.profileImage);
      fs.unlinkSync(imagePath);
    }

    if (profileImage) {
      updatedUserData.profileImage = profileImage.filename;
    }

    const updatedUser = await user.findOneAndUpdate(
      { email: userId },
      updatedUserData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res
      .status(200)
      .json({ message: 'User updated successfully.', data: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/api/create-checkout-session",async(req,res)=>{
  const {products} = req.body;
  

  const lineItems = products?.foodDescription?.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.foodTitle,
      },
      unit_amount: item.prize * 100, // Amount in cents
    },
    quantity: item.Quantity,
  }));

  const orderData = new order(products);

  const orderResponse = await orderData.save();

  console.log(orderResponse);

  const orderId = orderResponse._id;

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:`http://localhost:5173/paymentSuccess/?orderId=${orderId}&state=success`,
      cancel_url:`http://localhost:5173/payementFailed/?orderId=${orderId}&state=failure`,
  });

  res.json({id:session.id})

})


app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

app.get("/get-session", (req, res) => {
  const user = req.session.user;
  res.json(user);
});
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoute);
app.use("/api/order", orderRoutes);
app.use("/api/dish", dishRoutes);
