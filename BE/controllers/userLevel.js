import Users from "../models/userLevelModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUser = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(user[0]);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { name, email, password, confPassword, u_level } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            u_level: u_level
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const u_level = user[0].u_level;
        const accessToken = jwt.sign({userId, name, email, u_level}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '40s'
        });
        const refreshToken = jwt.sign({userId, name, email, u_level}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log(refreshToken)
        console.log(accessToken)
        res.json({ accessToken, refreshToken, userId, name, u_level });
}
 
export const Logout = async(req, res) => {
    await Users.update({refresh_token: null},{
        where:{
            id: req.params.id
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const Update = async(req, res) => {
    const { name, email, password, confPassword, u_level } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            u_level: u_level
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({msg: "Update Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Delete = async(req, res) => {
    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}