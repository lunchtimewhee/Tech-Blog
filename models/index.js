const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');



User.hasMany(Post, {
    onDelete: 'cascade',
    hooks: true,
})


Post.hasMany(Comment, {
    onDelete: 'cascade',
    hooks: true,
})


Post.belongsTo(User, {
    foreignKey: 'user_id',
})

Comment.belongsTo(Post, {
    foreign_key: 'post_id',
    onDelete: 'CASCADE',
})



module.exports = {
    Post,
    Comment,
    User
};
