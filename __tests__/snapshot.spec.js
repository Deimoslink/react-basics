import React from 'react';
import renderer from 'react-test-renderer';
import SubHeader from "../src/js/components/search/SubHeader.jsx";
import store from '../src/js/store';

const component = renderer.create(
    <SubHeader store={store}/>
).toJSON();

describe('subheader renders correctly', () => {
    it('', () => {
        expect(component).toMatchSnapshot();
    });


});


