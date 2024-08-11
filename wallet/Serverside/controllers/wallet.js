
const { StatusCodes } = require('http-status-codes')
const Wallet = require('../models/wallet')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return ("Enter valid credentials")
    }
    const user = await Wallet.findOne({ email })
    if (!user) {
        return res.json({
            msg: "NO SUCH USER"
        })
    }
    const isPasswordCorrect = user.comparePassword(password)
    if (!isPasswordCorrect) {
        return ("Invalid credentials")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            name: user.name,
            phonenumber: user.phonenumber,
            token
        }
    })
}

const register = async (req, res) => {
    const user = await Wallet.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            token
        }
    })

}

const updateUser = async (req, res) => {
    const { email, name, password } = req.body

    if (!email || !name || !password ) {
        return ("Please enter all values")
    }

    const user = await Wallet.findOneAndUpdate(req.userId)
    user.name = name,
        user.email = email,
        user.password = password,

    await user.save()

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            token
        }
    })
}

module.exports = {
    login,
    register,
    updateUser
}