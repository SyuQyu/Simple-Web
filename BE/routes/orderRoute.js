import express from "express";

import { 
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/Order.js";

const router = express.Router();
//NOTE PRODUCT TEMPLATE ROUTER
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;