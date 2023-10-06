import user from "../Modal/User.js";

import crypto from 'crypto'
import { mailerFunction } from "../utils/nodeMailerConfig.js";

function generateCustomToken(email, phoneNumber) {
    const secret = '94309GAJHydu4389ehiwfdFBDKJC392810HJNM2rekdfnmc857394'; // Replace with your own secret key
    const data = String(email) + String(phoneNumber) + Date.now(); // Combine email, phone number, and a timestamp
    const token = crypto.createHmac('sha256', secret)
                        .update(data)
                        .digest('hex')
                        .substring(0, 6);
    return token;
}

export const loginHandler = async (req, res) => {
    
    try {
    
    const { email, password } = req.body;
  
    const userData  =await user.findOne({email : email});
  
    if (!userData) {
      return res.status(401).json({ message: 'User not found' });
    }

      if (String(password)===String(userData.password)) {
        return res.status(200).json({ message: 'Login successful' , data : userData});
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const changePasswordHandler = async (req, res) => {
    
    try {
    
    const { email, password , newPassword} = req.body;
  
    const userData  =await user.findOne({email : email,password: password});
  
    if (!userData) {
      return res.status(401).json({ message: 'User not found' });
    }
     const updatedUser = await user.findOneAndUpdate({email:email},{$set : {password : newPassword}});
     res.status(200).json({message:"Successfully updated user .",data:updatedUser})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const changePasswordWithTokenHandler = async (req, res) => {
    
    try {
    
    const { email, token , newPassword} = req.body;
  
    const userData  =await user.findOne({email : email,forgotPasswordtoken : token});
  
    if (!userData) {
      return res.status(401).json({ message: 'User not found' });
    }
    const newToken = generateCustomToken(email,userData.phone);
     const updatedUser = await user.findOneAndUpdate({email:email},{$set : {password : newPassword , forgotPasswordtoken : newToken}});
     

     res.status(200).json({message:"Successfully updated user .",data:updatedUser})

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  

  export const signupHandler = async (req, res) => {
    
    try {
        const { name , email ,phone  , password } = req.body;
        console.log(req.body);
  
        const userData  = await user.find({email : email});
        if (userData === true) {
             return res.status(401).json({ message: 'User already exists' });
        }

        const token = generateCustomToken(email,phone);
        
        const newUser = new user({
            name : name ,
            email : email,
            password : password,
            phone : phone ,
            forgotPasswordtoken :  token
        });

        console.log(newUser);

        await newUser.save();

        return res.status(201).json({ message: ' successful created user'  });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const sendForgetPasswordTokenHandler = async (req, res) => {
    
    try {const { email } = req.body;
  
    const userData  =await  user.findOne({email : email});
  
    if (!userData) {
      return res.status(401).json({ message: 'User not found' });
    }

     
    const sentMail = await mailerFunction(userData.forgotPasswordtoken,email);
    console.log(userData.forgotPasswordtoken);
    console.log(sentMail);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const updateUserHandler = async (req, res) => {
    try {
      upload.single('profileImage')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Image upload failed' });
        }
  
        const userId = req.params.userId;
        const updatedUserData = req.body;
        const profileImage = req.file; // The uploaded image file
  
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
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

  export const getAllUserHandler = async (req, res) => {
    try { 
        const users = await user.find({  })
        .sort({ timestamp: -1 }) .exec();
    
        return res.status(200).json({ message : "All Users", data : users });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
  };
  