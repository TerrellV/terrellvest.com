import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('root router hit');
})

export default router;
