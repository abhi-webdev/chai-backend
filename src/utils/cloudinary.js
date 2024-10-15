import { v2 as cloudinary } from "cloudinary";
import fs  from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SECRET, 
    });
    

    const uploadOnCloudinary = async  (localFilePath) =>{
        try {
            if (!localFilePath) return null
            // upload the file on cloudinary
            cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded succesfully
            console.log("file uploaded successfully",resource.url);
            return response

        } catch (error) {
            fs.unlinkSync(localFilePath) //remove the locally savrd temporary file as the upload operation got failed
            return null;
        }
    }


    export { uploadOnCloudinary }



    // cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    //     {public_id: "olympic_flag"},
    //     function (error, result) {
    //         console.log(result);
            
    //     }
    // )









