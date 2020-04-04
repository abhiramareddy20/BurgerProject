import React, { Component } from "react";
import Aux from '../../hoc/Auxx';
import Burger from '../../Components/Burger/Burger';
import Buildcontrols from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalprice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-c6368.firebaseio.com/Ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true});
            });
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

            this.setState({purchasable: sum > 0});

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceaddition = INGREDIENT_PRICES[type];
        const Oldprice = this.state.totalprice;
        const newPrice = Oldprice + priceaddition;

        this.setState({totalprice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0)
        {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const pricededuction = INGREDIENT_PRICES[type];
        const Oldprice = this.state.totalprice;
        const newPrice = Oldprice - pricededuction;

        this.setState({totalprice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);   
    }

    purchaseHandler =  () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('You Continue');
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalprice,
            Customer: {
                name: 'ABhirama Reddy',
                address: {
                    street :'5th main',
                    pinCode: '577203',
                    country: 'India'
                },
                email : ' test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order)
        .then(response =>{
            this.setState({loading: false,purchasing: false});
        } )
        .catch(error => {
            this.setState({loading: false,purchasing: false});
        });

    }

    render(){

        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key]= disabledInfo[key] <=0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients Can't be loaded</p>: <Spinner />
        if(this.state.ingredients)
        { 
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients} />
                        <Buildcontrols
                            ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientHandler}
                            disabled = {disabledInfo}
                            purchasable = {this.state.purchasable}
                            ordered = {this.purchaseHandler}
                            price = {this.state.totalprice}/>
                </Aux>        
            );
            orderSummary = <OrderSummary 
            ingredients ={this.state.ingredients}
            price = {this.state.totalprice.toFixed(2)}
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

export default withErrorHandler(BurgerBuilder, axios);