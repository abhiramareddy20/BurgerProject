import React, {Component} from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate'); 
    }
    
    render(){
        const ingredientsummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key ={ igKey}><span style ={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });
    
        return(
                <Aux>
                    <h3>Your order</h3>
                    <p>Delicious burger with the folllowing ingredients:</p>
                    <ul>
                    {ingredientsummary}
                    </ul>
                    <p><strong>Total price : {this.props.price}</strong></p>
                    <p> continue to checkout</p>
        
                    <Button btnType = "Danger" clicked = {this.props.purchaseCancelled} >CANCEL</Button>
                    <Button btnType = "Success" clicked= {this.props.purchaseContinue}>CONTINUE</Button>
                </Aux>

        );
    }
} 

export default OrderSummary;