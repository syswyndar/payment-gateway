const midtrans = require("../helpers/midtrans");
const { convertToken } = require("../helpers/jwt");
const { TopupBalance, UserBalance } = require("../models/index");

class TopupController {
    static async topUp (req, res) {
        try {
            const { id } = req.user;
            const { amount } = req.body;
            const topupHistory = await TopupBalance.create({
              UserId: id,
              amount,
              isPayed: false,
            });

            const token = await midtrans(+amount, req.user.email, req.user.userName);
            res.status(201).json(token);
          } catch (err) {
            res.status(500).json(err)
          }
    }

    static async topupSuccess (req, res) {
        try {
            const { id } = req.user;
            const transaction = await TopupBalance.findOne({
              where: { UserId: id, isPayed: false },
            });
            const userBalance = await UserBalance.findOne({
                where: { UserId: id}
            })
            await UserBalance.update({ amount: userBalance.amount + transaction.topupAmount }, { where: { UserId: id } });
            await TopupBalance.update({isPayed: true}, {where: {UserId: id, isPayed: false}})
            res.status(200).json({
              message: `Success add Balance with Amount ${transaction.amount}`,
            });
          } catch (err) {
            res.status(500).json(err)
          }
    }
}

module.exports = TopupController