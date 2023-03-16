const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const Post = require('./Post');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already in use!',
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        hooks: {
            async beforeCreate(newUserData) {
                
                // Password validator
                try {
                    const passwordValidator =
                        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{12,}$|^test$/;
                    if (!passwordValidator.test(newUserData.password)) {
                        throw new Error(
                            'Password does not have the required characters.'
                        );
                    }
                    
                    // Encrpyt password when creating user
                    newUserData.password = await bcrypt.hash(
                        newUserData.password,
                        10
                    );

                    return newUserData;
                } catch (err) {
                    console.log(err);
                }
            },
        },
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        useIndividualHooks: true,
        //underscored: true,
        modelName: 'user',
    }
);

User.hasMany(Post, {
    onDelete: 'cascade',
    hooks: true,
});



module.exports = User;