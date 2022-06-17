import express from "express";

import { 
    getAllPakets,
    getPaketById,
    createPaket,
    updatePaket,
    deletePaket
} from "../controllers/Paket.js";

const router = express.Router();
//NOTE PRODUCT TEMPLATE ROUTER
router.get('/', getAllPakets);
router.get('/:id', getPaketById);
router.post('/', createPaket);
router.patch('/:id', updatePaket);
router.delete('/:id', deletePaket);

export default router;