const express = require('express')
 const userController = require('./../controllers/userController');
 const { getAllUsers, createUser, updateUser, getUser, deleteUser } =
   userController;



// 3) handling the routes

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
 
module.exports = router;