import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const INITIAL_STATE = {
    isAuth: false,
    currentUser: {},
    currentUserData: [],
    dynamicData: []
}

export const getCurrentUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const setCurrentUserData = (data) => {
    return {
        type: 'SET_USER_DATA',
        payload: data
    }
}

export const setDynamicData = (data) => {
    return {
        type: 'SET_DYNAMIC_DATA',
        payload: data
    }
}

export const getDataByYear = (year) => {
    return {
        type: 'GET_DATA_BY_YEAR',
        payload: year
    }
}


const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                isAuth: true,
                currentUser: action.payload
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                isAuth: true,
                currentUserData: action.payload
            }
        case 'SET_DYNAMIC_DATA':
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            const DYNAMIC_DATA = month.map((e, index) => {
                return {
                    "month": month[index],
                    "income": state.currentUserData && state.currentUserData.filter(m => Number(m.transaction_month) === index + 1).map((m) => m.transaction_income_amount).reduce((a, b) => a + b, 0),
                    "expense": state.currentUserData && state.currentUserData.filter(m => Number(m.transaction_month) === index + 1).map((m) => m.transaction_expense_amount).reduce((a, b) => a + b, 0)
                }
            })

            return {
                ...state,
                isAuth: true,
                dynamicData: DYNAMIC_DATA
            }

        case 'GET_DATA_BY_YEAR':
            const month2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            const DYNAMIC_DATA_YEARLY = month2.map((e, index) => {
                const newData = state.currentUserData && state.currentUserData.filter((m) => m.transaction_year === action.payload)
                return {
                    "month": month2[index],
                    "income": newData && newData.filter(m => Number(m.transaction_month) === index + 1).map((m) => m.transaction_income_amount).reduce((a, b) => a + b, 0),
                    "expense": newData && newData.filter(m => Number(m.transaction_month) === index + 1).map((m) => m.transaction_expense_amount).reduce((a, b) => a + b, 0)
                }
            })
            return {
                ...state,
                isAuth: true,
                dynamicData: DYNAMIC_DATA_YEARLY
            }
        default:
            return state
    }
}

const store = createStore(reducer, composeWithDevTools())

export default store