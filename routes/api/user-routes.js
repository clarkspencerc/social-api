const router = require('express').Router(); 

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser, 
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// set up Get all and Post at /api/users

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// get one put and delet routes at /api/users/:id

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router; 