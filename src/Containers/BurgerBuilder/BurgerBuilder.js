import React, { Component } from "react";

import { connect} from 'react-redux';
import Aux from '../../hoc/Auxx';
import Burger from '../../Components/Burger/Burger';
import Buildcontrols from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actionTypes from '../../Store/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        // axios.get('https://react-my-burger-c6368.firebaseio.com/Ingredients.json')
        //     .then( response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
        let burger = this.state.error ? <p>Ingredients Can't be loaded</p>: <Spinner />
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

                
        if(this.state.loading) {
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        price: state.totalprice
    };

}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

    };
}

export default  connect (mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));