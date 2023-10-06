import { verifyToken } from "../utils/utils.js";
import user from "../Modal/User.js";
export const verifyUser = async(req,resp,next)=>{

    try {
        const  token  = req.headers.authorization;
        const  authorization = token.split("Bearer ")[1];
        if (!authorization) {
          throw new Error("You are not authorized");
        }
        
        const payload = await verifyToken(authorization);
        
        if (!payload) {
          throw new Error("Token is not Valid");
        }
        const userValidate = await user.findOne({phone: payload.phone });
        if (!userValidate) {
          throw new Error("User not found");
        } 
        next();
        
      } catch (error) {
        console.log(error.message);
        resp.status(500).json({ success: "0", message: error.message });
      }
}


