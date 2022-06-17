import express from "express";

import { 
    getjenisLaundryById,
    createjenisLaundry,
    updatejenisLaundry,
    deletejenisLaundry,
    getAlljenisLaundry
} from "../controllers/JenisLaundry.js";

const router = express.Router();
//NOTE PRODUCT TEMPLATE ROUTER
router.get('/', getAlljenisLaundry);
router.get('/:id', getjenisLaundryById);
router.post('/', createjenisLaundry);
router.patch('/:id', updatejenisLaundry);
router.delete('/:id', deletejenisLaundry);

export default router;