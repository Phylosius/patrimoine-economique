import express from 'express';
import {getValeurPatrimoine} from "../controllers/patrimoine.js";
const router = express.Router();

router.get('/:date',(req,res)=>{
    getValeurPatrimoine(req, res);
})

export default router;