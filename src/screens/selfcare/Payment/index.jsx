import React, { useState } from 'react'
import { CreditCardInput } from 'react-native-credit-card-input'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { bePremium } from '@actions/user'
import { Container } from '@components/styled-components'


const Payment = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const id = useSelector(state => state.user.user._id)

    const [CardInput, setCardInput] = useState({})

    const onSubmit = async () => {
        dispatch(bePremium(CardInput, id))
    }
    

    return (
        <Container>
            <CreditCardInput onChange={e => setCardInput(e)} />
            <Button onPress={onSubmit}>
                <Text>{t('payment.paymentButton')}</Text>
            </Button>
        </Container>
    )
}

const Button = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #6003a2;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`

const Text = styled.Text`
    color: white;
`

export default Payment
