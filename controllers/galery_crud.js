import Galery from "../model/galery.js";


export const createImage = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const newImage = new Galery({ name, description, image });
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllImages = async (req, res) => {
    try {
        const images = await Galery.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getImageById = async (req, res) => {
    try {
        const image = await Galery.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateImageById = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const updatedImage = await Galery.findByIdAndUpdate(
            req.params.id,
            { name, description, image },
            { new: true }
        );
        if (!updatedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json(updatedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteImageById = async (req, res) => {
    try {
        const deletedImage = await Galery.findByIdAndDelete(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

