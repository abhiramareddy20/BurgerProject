import React from 'react';
import classes from './Navigationitems.css';
import NavigationItem from './NavigationItem/Navigationitem';

const navigationItems = () => (
    <ul className = {classes.NavigationItems}>
        
        <NavigationItem link = "/" exact> Burger Builder</NavigationItem>
        <NavigationItem link ="/orders"> Orders</NavigationItem>


    </ul>
);

export default navigationItems;