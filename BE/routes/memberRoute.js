import express from "express";

import { 
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/Member.js";

const router = express.Router();
//NOTE PRODUCT TEMPLATE ROUTER
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.patch('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;