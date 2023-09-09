const { Schema, model } = require('mongoose');

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formattedDate
    }

}, {
    toJSON: {
        getters: true
    },
    id: false
})

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maaxlength: 280 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formattedDate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false 
})

function formattedDate(date){
    return date.toDateString()
}

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought