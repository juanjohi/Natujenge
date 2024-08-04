

const API_BASE_URL = 'http/localhost:3000/api/v1'

const get = async (url) => {

    const token = localStorage.getItem('token')
    const response = (`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'mode': 'cors'
        }

    })
    return response.json

}

const post = async (url, body) => {
    const token = localStorage.getItem('token')
    const response = (`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'mode': 'cors'
        },
        body: JSON.stringify(body)
    })
   return response.json()
}

export {
    get,
    post
}