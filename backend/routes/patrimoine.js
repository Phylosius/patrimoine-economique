import express from 'express';
import {getPatrimoineRangeByMonth, getValeurPatrimoine} from "../controllers/patrimoine.js";
const router = express.Router();

router.get('/range', (req,res)=>{
    getPatrimoineRangeByMonth(req, res);
})

router.get('/:date',(req,res)=>{
    getValeurPatrimoine(req, res);
})


export default router;