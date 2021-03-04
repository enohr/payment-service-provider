const { Router } = require('express');

const { TransactionController } = require('./controller/TransactionController')

const transactionController = new TransactionController();

const router = Router();

router.get('/', (req, res) => {
    res.json({message: 'Hey There!'})
});

router.post('/transaction', transactionController.store);
router.get('/transaction', transactionController.list);

module.exports = router;