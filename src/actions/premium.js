export const PREMIUM_SUCCESS = 'PREMIUM_SUCCESS'
export const PREMIUM_FAILURE = 'PREMIUM_FAILURE'
export const FREE_SUCCESS = 'FREE_SUCCESS'
export const FREE_FAILURE = 'FREE_FAILURE'

export const bePremium = () => async dispatch => {
    dispatch({ type: PREMIUM_SUCCESS, payload: { success: true } })
}

export const beFree = () => async dispatch => {
    dispatch({ type: FREE_SUCCESS, payload: { success: false } })
}
