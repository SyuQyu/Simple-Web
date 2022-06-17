import Pembayaran from "../models/pembayaranModels.js";

export const getAllPembayarans = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll();
        res.json(pembayaran);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getPembayaranById = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll({
            where: {
                id_pembayaran: req.params.id
            }
        });
        res.json(pembayaran[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createPembayaran = async (req, res) => {
    try {
        await Pembayaran.create(req.body);
        res.json({
            "message": "Pembayaran Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updatePembayaran = async (req, res) => {
    try {
        await Pembayaran.update(req.body, {
            where: {
                id_pembayaran: req.params.id
            }
        });
        res.json({
            "message": "Pembayaran Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deletePembayaran = async (req, res) => {
    try {
        await Pembayaran.destroy({
            where: {
                id_pembayaran: req.params.id
            }
        });
        res.json({
            "message": "Pembayaran Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}