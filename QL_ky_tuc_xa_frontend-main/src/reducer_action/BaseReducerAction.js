export const changeDataFeedback = e => {
    return {
        type: 'CHANGE_DATA_FEEDBACK',
        data_feedback: e
    }
}

export const changeDataPayment = e => {
    return {
        type: 'CHANGE_DATA_PAYMENT',
        data_payment: e
    }
}


export const changeDataNoti = e => {
    return {
        type: 'CHANGE_DATA_NOTI',
        data_noti: e
    }
}

export const changeDataDetailPayment = e => {
    return {
        type: 'CHANGE_DATA_DETAIL_PAYMENT',
        data_detail_payment: e
    }
}
