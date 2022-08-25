const { User } = require('../models');

const userController = {

    // get all users 
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err); 
            res.status(400).json(err);
        }); 
    }, 
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
        .then(dbUserData => {

            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err); 
            res.sendStatus(400).json(err); 
        });
    }, 
    
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.status(400).json(err)); 
    }, 

    // delete user 
    deleteUser({ params, body}, res){
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.status(400).json(err)); 
    }, 

    addFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId }, 
            { $push: { friends: params.friendId }},
            { new: true})
        .then(dbFriendData => {
            if(!dbFriendData){
                res.status(404).json({ message: 'No user found with this id'});
                return; 
            }
            res.json(dbFriendData); 
        })
        .catch(err => res.status(400).json(err));
    }, 

    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbFriendData => {
            res.json(dbFriendData); 
        })
        .catch(err => res.json(err))
    }

};


module.exports = userController; 