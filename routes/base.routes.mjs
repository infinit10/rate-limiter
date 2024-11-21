import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    return res.render('index');
});

router.get('/data', (req, res) => {
    return res.render('data');
});

export default router;