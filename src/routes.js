const { Router } = require('express');

const { TransactionController } = require('./controller/TransactionController')
const { PayableController } = require('./controller/PayableController')

const transactionController = new TransactionController();
const payableController = new PayableController();

const router = Router();

router.get('/transaction/:cnpj', transactionController.getByCnpj);
router.delete('/transaction/:id', transactionController.deleteById);
router.post('/transaction', transactionController.validateRequest, transactionController.store);
router.get('/transaction', transactionController.list);

router.get('/payable/:cnpj', payableController.list);

module.exports = router;