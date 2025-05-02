const express = require('express');
   const router = express.Router();
   const markController = require('../controllers/markController');

   router.post('/', markController.createMark);
   router.get('/student/:student_id', markController.getMarksByStudentId);
   router.put('/:mark_id', markController.updateMark);
   router.delete('/:mark_id', markController.deleteMark);

   module.exports = router;