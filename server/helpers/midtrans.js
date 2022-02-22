const axios = require('axios')

async function midtrans (price, email, userName) {
        const AUTH_STRING = new Buffer.from('SB-Mid-server-zzj0LD5Kr-jFQtj7cl84dXrh:').toString('base64')

        let midtrans = await axios.post("https://app.sandbox.midtrans.com/snap/v1/transactions", {
            "transaction_details": {
                "order_id": Date.now() + 'test',
                "gross_amount": price
            },
            "customer_details": {
                "userName": userName,
                "email": email,
            }
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${AUTH_STRING}`
                }
        })

        return midtrans.data
}

module.exports = midtrans