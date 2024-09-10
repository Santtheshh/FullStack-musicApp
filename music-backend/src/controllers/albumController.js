import {v2 as cloudinary} from 'cloudinary';
import albumaModel from '../models/albumModel.js';


const addAlbums = async (req, res) => {

try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColor = req.body.bgColor;
    const imageFile = req.file;
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'});

    const albumData={
        name,
        desc,
        bgColor,
        image: imageUpload.secure_url 
    }
const album=albumaModel(albumData);
await album.save();

res.json({success: true,message:"album created successfully"});
    
} catch (error) {
    res.json({success: false});
   
    
}


}

const listAlbums = async (req, res) => {

    try {
        const allAlbums=await albumaModel.find({});
        res.json({success: true, albums: allAlbums});
        
    } catch (error) {
        

        res.json({success: false});
    }

}

const removeAlbum = async (req, res) => {

    try {

    await albumaModel.findByIdAndDelete(req.body.id);
    res.json({success: true, message: "album removed successfully"});
        
    } catch (error) {
        res.json({success: false});
        
    }

}

export default {addAlbums, listAlbums, removeAlbum} 