const express = require('express');
const router = express.Router();
const qrController = require('../controllers/QrController'); // Make sure path is correct
const auth = require('../middlewares/authMiddleware');

// Verify all controller functions exist
console.log('QR Controller functions:', Object.keys(qrController));

// QR Code Routes
router.post('/generate', auth, qrController.generateQR);
router.post('/scan', auth, qrController.scanQR);
router.get('/my-scans', auth, qrController.getUserScans);
router.get('/admin/pending', auth, qrController.getPendingRequests);
router.post('/admin/process', auth, qrController.processRequest);

module.exports = router;
