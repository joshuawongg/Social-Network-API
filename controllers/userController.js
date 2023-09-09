const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res){
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            if (!user) {
                return res.json({ message: 'User not found'})
            } res.json(user)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async createUser(req,res) {
        try {
            const user = await User.create(req.body)
            if (!user) {
                return res.json({ message: 'User not created'})
            } res.json(user)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true, runValidators: true }
            )
            if( !user) {
                return res.status(404).json({ message: 'User not updated' })
            }
            res.json(user)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId })
            if (!user) {
                return res.json.status(404).json({ message: 'User not deleted'})
            } res.json({ message: 'User deleted' })
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true, runValidators: true }
            ) 
            if (!friend) {
                return res.status(404).json({ message: 'Error adding friend' })
            } return res.json(friend);
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    },

    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            )
             if (!friend) {
                return res.status(404).json({ message: 'Friend not deleted' })
            } res.json(friend)
        } catch (error) {
            console.log('error')
            res.status(500).json(error)
        }
    }
}