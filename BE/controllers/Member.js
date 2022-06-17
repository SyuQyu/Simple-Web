import Member from "../models/memberModels.js";

export const getAllMembers = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getMemberById = async (req, res) => {
    try {
        const member = await Member.findAll({
            where: {
                id_member: req.params.id
            }
        });
        res.json(member[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createMember = async (req, res) => {
    try {
        await Member.create(req.body);
        res.json({
            "message": "Member Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateMember = async (req, res) => {
    try {
        await Member.update(req.body, {
            where: {
                id_member: req.params.id
            }
        });
        res.json({
            "message": "Member Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteMember = async (req, res) => {
    try {
        await Member.destroy({
            where: {
                id_member: req.params.id
            }
        });
        res.json({
            "message": "Member Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}