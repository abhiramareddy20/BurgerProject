import React, { Component } from "react";

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';


import Button from '../../../Components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({loading: false});
            this.props.history.push('/');
        } )
        .catch(error => {
            this.setState({loading: false});
        });
    }

    
    render(){
        
        let form = (       
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Your Street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
 );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;