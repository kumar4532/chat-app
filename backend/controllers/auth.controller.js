import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookies from "../utils/generateTokens.js";

const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body

        if(password !== confirmPassword){
            return res
            .status(400)
            .json({error:"Passwords don't match"});
        }

        const alreadyUser = await User.find({
            username: req.body.username
        })

        if(alreadyUser.length !== 0){
            return res.status(400).json({error:"Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        generateTokenAndSetCookies(newUser._id, res);
        await newUser.save();

        return res
        .status(200)
        .json({
            newUser
        })

    } catch (error) {
        console.log("Error in signup controller", error);
        throw error;
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookies(user._id, res);

        return res
        .status(200)
        .json({
            message:'login successful',
            user
        });

    } catch (error) {
        console.log("Error in login controller", error);
        throw error;
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({
            message:"Logout successfully",
        })
    } catch (error) {
        console.log("Error in logout controller", error);
        throw error;
    }
}

export {
    signup,
    login,
    logout
}