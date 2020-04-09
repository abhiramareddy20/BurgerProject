import React, { Component } from "react";

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../Components/Order/Order';
import * as actions from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {
   

    componentDidMount() {
       this.props.onFetchOrders();
    }
    render() {
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.orders.map(orders => (
                    <Order 
                        key={orders.id}
                        ingredients ={orders.ingredients}
                        price = {orders.price}/>
                ))
            
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));