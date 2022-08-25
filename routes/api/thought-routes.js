const router = require('express').Router(); 
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller'); 


// set up get all and post at /api/thoughts
router
    .route('/')
    .get(getAllThought) 
    .post(addThought);

router  
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router.route('/:userId')


module.exports = router; 