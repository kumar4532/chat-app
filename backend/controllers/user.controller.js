import User from "../models/user.model.js"

export const getUsersForSideBar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;

        const users = await User.find({
            //not included ouselves
            _id: {$ne: loggedInUser}
        }).select("-password")

        return res
        .status(200)
        .json({
            users
        })

    } catch (error) {
        console.log("Error in side bar controller");
        throw error
    }
}
 