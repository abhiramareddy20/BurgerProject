import * as actionTYPES from './actionTypes';

import axios from '../../axios-orders';

export const pucrchaseBurgerSuccess = (id, orderData) => {

    return{
        type: actionTYPES.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {

    return{
        type:actionTYPES.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () =>
{
    return{
      type:actionTYPES.PURCHASE_BURGER_START  
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {

        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth' + token, orderData )
        .then( response => {
            console.log(response);
            dispatch(pucrchaseBurgerSuccess(response.data.name,orderData))
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );    };
};

export const purchaseinit = () => {
    return {
        type:actionTYPES.PURCHASE_INIT
    };
}; 

export const fetchOrderSuccess = (orders) => {
    return {
        type:actionTYPES.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type:actionTYPES.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return{

        type: actionTYPES.PURCHASE_BURGER_START
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth=' + token)
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            });
    }
}