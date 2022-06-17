import JenisLaundry from "../models/jenisLaundryModels.js";

export const getAlljenisLaundry = async (req, res) => {
    try {
        const jenisLaundrys = await JenisLaundry.findAll();
        res.json(jenisLaundrys);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getjenisLaundryById = async (req, res) => {
    try {
        const jenislaundry = await JenisLaundry.findAll({
            where: {
                id_jenislaundry: req.params.id
            }
        });
        res.json(jenislaundry[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createjenisLaundry = async (req, res) => {
    try {
        await JenisLaundry.create(req.body);
        res.json({
            "message": "jenis laundry Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updatejenisLaundry = async (req, res) => {
    try {
        await JenisLaundry.update(req.body, {
            where: {
                id_jenislaundry: req.params.id
            }
        });
        res.json({
            "message": "jenis laundry Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deletejenisLaundry = async (req, res) => {
    try {
        await JenisLaundry.destroy({
            where: {
                id_jenislaundry: req.params.id
            }
        });
        res.json({
            "message": "jenis laundry Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}