const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
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
        /*hooks: {
            async beforeCreate(newUserData) {
                try {
                    const passwordValidator =
                        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{12,}$|^test$/;
                    if (!passwordValidator.test(newUserData.password)) {
                        throw new Error(
                            'Password does not have the required characters.'
                        );
                    }

                    newUserData.password = await bcrypt.hash(
                        newUserData.password,
                        10
                    );

                    return newUserData;
                } catch (err) {
                    console.log(err);
                }
            },
        },*/
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        useIndividualHooks: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;