import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from'./Navigationitems';
import NavigationItem from './NavigationItem/Navigationitem';

configure({adapter: new Adapter()});

describe('<NavigationItems/>',() =>{
    it('should render to <NavigationItem /> elements if not authenticated',() => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
        
});