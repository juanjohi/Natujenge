

const { StatusCodes } = require('http-status-codes')
const Transactions = require('../models/twallet')
const User = require('../models/wallet')

const deposit = async (req, res) => {
    const { amount } = req.body


    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findById({ _id: req.user.userId })

    if (!user) {
        return res.status(404).json({ msg: "user not found" })
    }

    const depositAmount = parseFloat(amount);
    user.balance = parseFloat(user.balance) + depositAmount;
    await user.save();

    const transaction = new Transactions({
        userId: req.user.userId,
        type: 'deposit',
        amount: depositAmount
    })

    await transaction.save()

    res.status(StatusCodes.OK).json({
        balance: user.balance
    })
}

const getBal = async (req, res)=>{
    const user = await User.findOne({ _id: req.user.userId})

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({
            msg: "User not Found"
        })
    }
    res.status(StatusCodes.OK).json({
        balance: user.balance
    })
}

const transfer = async (req, res) =>{
    const {number, amount } = req.body

    if (isNaN(amount) || amount <= 0){
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            msg: "Learn Math"
        })
    }
    const user = await User.findById({ _id: req.user.userId })
    const recipient = await User.findOne({ phonenumber: number })
    if(!recipient){
        res.status(StatusCodes.NOT_FOUND).json({
            msg: "Find someone e casa"
        })
    }
 
    if (user.balance < amount ){
        res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Your Fault you are broke"
        })
    }
    const debitAmount = parseFloat(amount)
    user.balance = parseFloat(user.balance) - debitAmount
    await user.save()

    recipient.balance += debitAmount
    await recipient.save()
   

    const transaction = new Transactions({
        userId: req.user.userId,
        type: 'transfer',
        amount: debitAmount
    })

    await transaction.save()

    res.status(StatusCodes.OK).json({
        balance: user.balance
    })
}

module.exports = {
    deposit,
    getBal,
    transfer
}