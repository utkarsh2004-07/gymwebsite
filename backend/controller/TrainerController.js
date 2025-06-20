import express from "express"
import CustomError from "../utils/CustomeError.js"
import Trainer from "../Schema/TrainerSchema.js"

export const CreateTrainer = async (req, res) => {
    try {
        const { name, availability, contactNumber, experience } = req.body
        if (!name || !availability || !contactNumber || !experience) {
            throw new CustomError("Please fill all the fields", 400)
        }
        const aleradyAvailableTrainer = await Trainer.find({ contactNumber })

        if (aleradyAvailableTrainer.length > 0) {
            throw new CustomError("Trainer with this contact number already exists", 400)
        }
        const newTrainer = await Trainer.create({
            name,
            availability,
            contactNumber,
            experience
        })
        console.log(req.user)

        return res.status(200).json({
            message: "Trainer created successfully",
            newTrainer: newTrainer
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}

export const UpdateTrainer = async (req, res) => {
    const { id } = req.params; // Ensure this matches your route parameter
    const { name, availability, contactNumber, experience } = req.body;

    console.log("Updating trainer with ID:", id);
    console.log("Update data:", { name, availability, contactNumber, experience });

    try {
        const updateUser = await Trainer.findByIdAndUpdate(
            id,
            { name, availability, contactNumber, experience },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        res.status(200).json({ message: 'Trainer updated successfully', trainer: updateUser });
    } catch (error) {
        console.error('Error updating trainer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};










export const DeleteTrainer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrainer = await Trainer.findByIdAndDelete(id);
        if (!deletedTrainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        console.error('Error deleting trainer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllTrainer = async (req, res) => {
    try {
        const alltrainer = await Trainer.find({})
        res.status(200).json({
            message: 'Trainer Are',
            trainers: alltrainer
        });



    } catch (error) {

    }

}