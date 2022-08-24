const { Schema, model } = require('mongoose'); 

const UserSchema = new Schema({

    userName: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
            }, 
            message: "Please enter a valid email"
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [FriendSchema]

}, 
{
    toJSON:{
        virtuals: true
    }
}
); 

CommentSchema.virutal('friendCount').get(function() {
    return this.friends.length;
}); 

const User = model('User', UserSchema);

module.exports = User; 

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address(look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model(self - reference)