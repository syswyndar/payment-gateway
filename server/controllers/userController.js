const { User, UserBalance } = require('../models/index')
const { decryptPassword, hashPassword } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");
const { Op } = require("sequelize");

class UserController {
    static async register (req, res) {
        try {
            const { userName, email, password } = req.body;
        
            const newUser = await User.create({
                userName,
                email,
                password,
            });

            const userBalance = await UserBalance.create({
                UserId: newUser.id,
                amount: 0
            })

            res.status(201).json({ id: newUser.id, userName: newUser.userName, email: newUser.email });

        } catch (err) {
            console.log(err)
        }
    }

    static async login(req, res) {
        try {
            const { emailOrUserName, password } = req.body;
        
            if (!emailOrUserName || !password) {
              throw { name: "badRequest" };
            }
        
            const user = await User.findOne({
              where: {
                [Op.or]: [{ email: emailOrUserName }, { userName: emailOrUserName }],
              },
            });
            if (!user) {
              throw { name: "wrongLogin" };
            }
        
            const isValid = decryptPassword(password, user.password);
            if (!isValid) {
              throw { name: "wrongLogin" };
            }
        
            const payload = {
              id: user.id,
              userName: user.userName,
              email: user.email,
            };
            const accessToken = getToken(payload);
            res.status(200).json({ accessToken });

          } catch (err) {
            console.log(err)
            if(err.name === 'badRequest') {
                res.status(400).json({ message: "Bad Request" });
            }else if (err.name === 'wrongLogin') {
                res.status(400).json({ message: "Invalid email/password" });
            }else {
                res.status(500).json(err);
            }
          }
    }

    static async userDetail(req, res) {
        try {
            let { id } = req.user
            let user = await User.findByPk(id, {
                attributes: { exclude: ["password"] },
                include: UserBalance
            })

            res.status(200).json(user)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = UserController