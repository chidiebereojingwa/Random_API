const express = require('express')



// 3) handling the routes

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
 
module.exports = router;