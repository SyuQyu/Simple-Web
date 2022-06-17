import Paket from "../models/paketModels.js";

export const getAllPakets = async (req, res) => {
    try {
        const pakets = await Paket.findAll();
        res.json(pakets);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getPaketById = async (req, res) => {
    try {
        const paket = await Paket.findAll({
            where: {
                id_paket: req.params.id
            }
        });
        res.json(paket[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createPaket = async (req, res) => {
    try {
        await Paket.create(req.body);
        res.json({
            "message": "Paket Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updatePaket = async (req, res) => {
    try {
        await Paket.update(req.body, {
            where: {
                id_paket: req.params.id
            }
        });
        res.json({
            "message": "Paket Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deletePaket = async (req, res) => {
    try {
        await Paket.destroy({
            where: {
                id_paket: req.params.id
            }
        });
        res.json({
            "message": "Paket Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}