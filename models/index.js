const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

Post.belongsTo(User, {
    foreiginKey: 'user_id',
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})

Comment.belongsTo(Comment, {
    foreign_key: 'post_id',
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
})

Comment.belongsTo(User, {
    foreign_key: 'user_id',
})


module.exports = {
    Post,
    Comment,
    User
};
