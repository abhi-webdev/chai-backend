import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req, res) => {
    // get user detail from frontent
    // validition - not empty
    // cheak if user already exists: Username
    //  cheak for images , cheak for avatar
    // upload to cloudinary, avatar
    //  crate user object - create entry in db
    // remove password and refresh token field from responce
    // cheak for user creation 
    // return res
    



    // 1.  get user detail from frontent
    const {fullName , email, username , password}= req.body
    

    // 2. validition - not empty
    if (
        // cheak all the method before passing 
        [fullName, email, username, password].some((field) => field?.train() == "")
    ) {
        throw new ApiError(400, "All field are required");
        }

        User.findOne({
            $or:
            [
                { username }, 
                { email }
            ]
        })

        if (exitedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }


        // 4. cheak for images , cheak for avatar
        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath =req.files?.coverImage[0]?.path;

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required");
        }
        
        // Images upload on Cloudinary.....

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "Avatar file is required");
        }
       

         //  crate user object - create entry in db........

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage.url || "",
            email,
            password,
            username: username.toLowerCase()
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if (!createdUser) {
            throw new ApiError(500, "Somthing went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "USer registered Succesfully")
        )

} )


export { 
    registerUser,
}