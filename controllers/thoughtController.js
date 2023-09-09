const { Thought, User } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find()
            res.json(thought)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' })
            } 
            res.json(thought)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            })
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id}},
                { new: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Thought not created' })
            }
            res.json(thought)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { thoughtText: req.body.thoughtText },
                { new: true }
            )
            if (!thought){
                return res.json({ message: 'Thought not updated'})
            }
            res.json(thought)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async deleteThought(req, res){
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            )
            if (!thought) { 
                return res.status(404).json({ message: 'Thought not deleted'})
            } 
            res.json({ message: 'Deleted thought'})
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async addReaction(req, res){
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true, runValidators: true }
            )
            if (!newReaction) {
                return res.status(404).json({ message: 'Reaction not created' })
            }
            res.json(newReaction)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async deleteReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: params.reactionId }}},
                { new: true }
            )
         if (!reaction){
            return res.status(404).json({ message: 'Message not deleted' })
        }
        res.json({ message: 'Deleted reaction' })
    } catch (error) {
        console.log('error')
        res.status(500).json(error)
    }
    }
}