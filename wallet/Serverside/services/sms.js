require('dotenv').config
const smsNotify = async (to, message) => {
    const apiKey = process.env.TIARA_KEY
    const apiUrl = process.env.TIARA_URI
    const connection = 'TIARACONECT'
    const timestamps = new Date().toLocaleString()

    const formData = {
        from: connection,
        message: `${message} on ${timestamps}`,
        to: to,
    }
    fetch(apiUrl, {
        mode: 'cors',
        method: 'POST',
        body:JSON.stringify(formData),
        headers: {
            "Content-type": "application/json",
            "Authorization":`Bearer ${apiKey}`
        }
    })
}

module.exports = smsNotify