import React, { useState } from 'react'
import { CreditCardInput } from 'react-native-credit-card-input'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { bePremium } from '@actions/user'

const Payment = () => {
    const dispatch = useDispatch()

    const [CardInput, setCardInput] = useState({})

    const onSubmit = async () => {
        dispatch(bePremium(CardInput))
    }

    return (
        <>
            <CreditCardInput onChange={e => setCardInput(e)} />
            <Button onPress={onSubmit}>
                <Text>Pay Now</Text>
            </Button>
        </>
    )
}

const Button = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #2471a3;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`

export default Payment
