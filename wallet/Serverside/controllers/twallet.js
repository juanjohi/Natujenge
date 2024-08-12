
const { StatusCodes } = require('http-status-codes')
const Transactions = require('../models/twallet')
const User = require('../models/wallet')
const smsNotify = require('../services/sms')
require('dotenv').config()


const deposit = async (req, res) => {
    const { amount } = req.body

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Learn Math' });
    }

    const user = await User.findById({ _id: req.user.userId })

    if (!user) {
        return res.status(404).json({ msg: "No such user" })
    }

    const depositAmount = parseFloat(amount);
    user.balance += depositAmount;
    await user.save();

    const transaction = new Transactions({
        userId: req.user.userId,
        type: 'deposit',
        amount: depositAmount
    })

    await transaction.save()

    await smsNotify(user.phonenumber, `You have deposited Kshs ${depositAmount} into your Rugzak Account, your balance is ${user.balance}`)
    res.status(StatusCodes.OK).json({
        balance: user.balance
    })
}

const getBal = async (req, res) => {
    const user = await User.findById({ _id: req.user.userId })

    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({
            msg: "User not Found"
        })
    }

    await smsNotify(user.phonenumber, `Your Rugzak account balance is ${user.balance}`)
    res.status(StatusCodes.OK).json({
        balance: user.balance
    })
}


const transfer = async (req, res) => {
    const { number, amount } = req.body

    if (isNaN(amount) || amount <= 0) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            msg: "Learn Math"
        })
    }
    const user = await User.findById({ _id: req.user.userId })
    const recipient = await User.findOne({ phonenumber: number })
    if (!recipient) {
        res.status(StatusCodes.NOT_FOUND).json({
            msg: "Find someone e casa"
        })
    }

    if (user.balance < amount) {
        res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Your Fault you are broke"
        })
    }

    const debitAmount = parseFloat(amount)
    user.balance -= debitAmount
    await user.save()

    recipient.balance += debitAmount
    await recipient.save()


    const transaction = new Transactions({
        userId: req.user.userId,
        type: 'transfer',
        amount: debitAmount
    })

    await transaction.save()

    await smsNotify(user.phonenumber, `You have transfered Kshs${debitAmount} from your Rugzak account to ${recipient.phonenumber}, your account balance is${user.balance}`)
    const recipientMessage = `Your have received Kshs ${debitAmount} from ${user.name} ${user.phonenumber}, your account balance is ${recipient.balance}`
    await smsNotify(recipient.phonenumber, recipientMessage)

    res.status(StatusCodes.OK).json({
        balance: user.balance
    })
}

const statement = async (req, res) => {
    const user = await User.findById({ _id: req.user.userId })
    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: "user not found" })
    }

    const transaction = await Transactions.find({ userId: req.user.userId })

    const recentTransactions = transaction.slice(0, 5)
    const formattedData = recentTransactions.map(i => ({
        amount: i.amount,
        type: i.type,
        date: i.date
    }))

    const cleanedData = formattedData.map(transactions =>
        `Amount: ${transactions.amount}, Type: ${transactions.type}, Date: ${transactions.date}`
    )
    await smsNotify(user.phonenumber, `Here is your requested ministatement ${cleanedData}`)
    res.status(StatusCodes.OK).json({
        transaction: {
            formattedData
        }
    })
}
module.exports = {
    deposit,
    getBal,
    transfer,
    statement
}