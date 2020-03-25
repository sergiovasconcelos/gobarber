import Sequelize, { Model } from 'sequelize';

class User extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_Hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
        );
        return this;
    }
}

export default User;