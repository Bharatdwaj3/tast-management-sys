import User from "../models/user.model.js";



const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        
        const profile = await User.findById(id)
            .select('-password -refreshToken');
            
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        
        res.status(200).json(profile);
    } catch (error) {
        console.error("Cannot get profile:", error);
        res.status(500).json({ message: error.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.user.id)
            .select('-password -refreshToken');
            
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        
        res.status(200).json(profile);
    } catch (error) {
        console.error("Cannot get profile:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, userName } = req.body; 

        const updates = {};
        if (fullName) updates.fullName = fullName;
        if (userName) updates.userName = userName;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ 
                message: "No valid fields to update" 
            });
        }

        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password -refreshToken');

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedProfile
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: error.message });
    }
};

const deleteMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({
            success: true,
            message: "Profile deleted successfully"
        });
    } catch (error) {
        console.error("Profile deletion error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getMembers = async (req, res) => {
    try {
        const members = await User.find({ isActive: true })
            .select('_id userName fullName avatar accountType')
            .sort({ fullName: 1 });
            
        res.status(200).json(members);
    } catch (error) {
        console.error("Cannot get members:", error);
        res.status(500).json({ message: error.message });
    }
};

export {
    getProfile,
    getMyProfile,
    updateProfile,
    deleteMyProfile,
    getMembers
};