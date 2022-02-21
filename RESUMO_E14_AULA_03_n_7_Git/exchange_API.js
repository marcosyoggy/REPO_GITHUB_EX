/*
Your API Key: 626ffb813ad3999c1a3bd920
Example Request: https://v6.exchangerate-api.com/v6/626ffb813ad3999c1a3bd920/latest/USD

**Request: GET https://v6.exchangerate-api.com/v6/${YOUR-API-KEY}/latest/${USD}
*/

const key_To_API = '626ffb813ad3999c1a3bd920'

const url_Request_Exchange = coin_Country => `https://v6.exchangerate-api.com/v6/${key_To_API}/latest/${coin_Country}`

const fetch_Url_Exchange = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('IHHH...Deu Pau...REFAÇA!!!')
        }

        const objPromise = await response.json()
        return objPromise

    } catch (error) { alert(error.message) }
}

const get_Coin_Value = async coin_Country => {
    const response = await fetch_Url_Exchange(url_Request_Exchange(coin_Country))

    return response
}
