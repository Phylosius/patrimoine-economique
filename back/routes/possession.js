import express from 'express';
import {getPossessionList} from "../services/possession.js";
const router = express.Router();

router.get('/', (req, res) => {
    getPossessionList().then((possessionList) => {
        res.send(possessionList);
    })
})

export default router;