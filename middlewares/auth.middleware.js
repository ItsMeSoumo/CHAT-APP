import { errorHandler } from  "../utilities/errorHandler.js";
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utilities/asyncHandler.js";

export const isAuthenticated  = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'].replace("Bearer", "");
    console.log(token);
    if(!token){
        return next(new errorHandler("Please login to access this route",401))
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenData
    next ()
})