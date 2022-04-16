import { PK_STRIPE, SK_STRIPE } from '@env'

const CURRENCY = 'EUR'

export const getCreditCardToken = async creditCardData => {
    const card = {
        'card[number]': creditCardData.values.number.replace(/ /g, ''),
        'card[exp_month]': creditCardData.values.expiry.split('/')[0],
        'card[exp_year]': creditCardData.values.expiry.split('/')[1],
        'card[cvc]': creditCardData.values.cvc,
    }

    try {
        const query = await fetch('https://api.stripe.com/v1/tokens', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${PK_STRIPE}`,
            },
            method: 'post',
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&'),
        })

        return query.json()
    } catch (error) {
        return error
    }
}

export const charges = async token => {
    const card = {
        amount: 50,
        currency: CURRENCY,
        source: token,
        description: 'Banana++',
    }

    try {
        const query = await fetch('https://api.stripe.com/v1/charges', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${SK_STRIPE}`,
            },
            method: 'post',
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&'),
        })

        return query.json()
    } catch (error) {
        return error
    }
}
