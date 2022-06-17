import express from "express";

import { 
    getAllPembayarans,
    getPembayaranById,
    createPembayaran,
    updatePembayaran,
    deletePembayaran
} from "../controllers/Pembayaran.js";

const router = express.Router();
//NOTE PRODUCT TEMPLATE ROUTER
router.get('/', getAllPembayarans);
router.get('/:id', getPembayaranById);
router.post('/', createPembayaran);
router.patch('/:id', updatePembayaran);
router.delete('/:id', deletePembayaran);

export default router;