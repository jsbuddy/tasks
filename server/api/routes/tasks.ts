import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.json({ success: true });
});

export default router;
