const { User, Thought } = require('../models'); 

const thoughtController = {
        // get all thoughts
        getAllThought(req, res){
            Thought.find({})
            .populate({
                path: 'username',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err =>{
                console.log(err);
                res.status(400).json(err); 
            });
        },

        // get one thought 
        getThoughtById({ params }, res) {
            Thought.findOne({_id: params.id})
            .populate({
                path: 'username',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                
                if(!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return; 
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err); 
                res.sendStatus(400).json(err); 
            }); 
        },

        addThought({ body }, res){
            console.log(body); 
            Thought.create(body)
            .then(({ _id }) => {
                console.log(_id)
                return User.findOneAndUpdate(
                    {_id: body.userId}, 
                    { $push: {thoughts: _id} },
                    { new: true}
                ); 
            })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'}); 
                    return; 
                }
                res.json(dbUserData); 
            })
            .catch(err => res.json(err)); 

        }, 

        updateThought({ params, body}, res){
            Thought.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true})
            .then(dbUserData =>{
                if(!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id'}); 
                    return; 
                }
                res.json(dbUserData); 
            })
            .catch(err => res.status(400).json(err)); 
        },

        removeThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.id})
            .then(deletedThought => {
                if (!deletedThought){
                    return res.status(404).json({ message: 'No thought with this id'}); 
                }
                return User.findOneAndUpdate(
                    {_id: deletedThought.username}, 
                    { $pull: {thoughts: deletedThought._id}}, 
                    { new: true, runValidators: true }
                ); 
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return; 
                }
                res.json(dbUserData); 
            })
            .catch(err => res.json(err)); 

        }
}; 


module.exports = thoughtController; 