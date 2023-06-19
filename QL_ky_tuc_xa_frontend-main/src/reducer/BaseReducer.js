const initialState = {
    data_feedback: [],
    data_payment: [],
    data_noti: [],
    data_detail_payment: [],
}

const BaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_DATA_FEEDBACK': {
            return {
                ...state,
                data_feedback: action.data_feedback
            }
        }

        case 'CHANGE_DATA_PAYMENT': {
            return {
                ...state,
                data_payment: action.data_payment
            }
        }

        case 'CHANGE_DATA_NOTI': {
            return {
                ...state,
                data_noti: action.data_noti
            }
        }

        case 'CHANGE_DATA_DETAIL_PAYMENT': {
            return {
                ...state,
                data_detail_payment: action.data_detail_payment
            }
        }



        default: {
            return state
        }
    }
}

export default BaseReducer