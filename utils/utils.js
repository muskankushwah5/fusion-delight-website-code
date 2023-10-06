import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret_key = "9403rfjd673849eudihbsx63427768T3FEWSG34568iu5grbfdcn";
const expiry_date = 365 * 24 * 60 * 60;

//Get Token
export const getToken = async (user) => {
    const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
    };

    const options = {
        expiresIn: expiry_date, 
    };
    const token = jwt.sign(payload, secret_key, options);
    return token;
};

//Verify Token
export const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, secret_key);
      return decoded;
    } catch (error) {
        console.log(error);
      throw new Error ("Token is invalid");
      return null;
    }
  };

