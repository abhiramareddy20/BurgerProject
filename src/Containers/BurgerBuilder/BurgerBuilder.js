import React, { Component } from "react";

import { connect} from 'react-redux';
import Aux from '../../hoc/Auxx';
import Burger from '../../Components/Burger/Burger';
import Buildcontrols from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../Store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredient();
        
    }

    updatePurchaseState (ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

            return sum > 0;

    }

    
    purchaseHandler =  () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){

        const disabledInfo ={
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key]= disabledInfo[key] <=0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients Can't be loaded</p>: <Spinner />
        if(this.props.ings)
        { 
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings} />
                        <Buildcontrols
                            ingredientAdded = {this.props.onIngredientAdded}
                            ingredientRemoved = {this.props.onIngredientRemoved}
                            disabled = {disabledInfo}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            ordered = {this.purchaseHandler}
                            price = {this.props.price}/>
                </Aux>        
            );
            orderSummary = <OrderSummary 
            ingredients ={this.props.ings}
            price = {this.props.price}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinue  = {this.purchaseContinueHandler} 
            />
        }

        return (
            <Aux>
                <Modal show ={ this.state.purchasing} modalClosed={this.purchaseCancelHandler} > 
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalprice,
        error: state.burgerBuilder.error
    };

}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseinit())

    };
}

export default  connect (mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));