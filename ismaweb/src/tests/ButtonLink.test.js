import React from 'react';
import {shallow} from 'enzyme';
import ButtonLink from '../ButtonLink';

describe('ButtonLink', () => {
  it('should render correctly', () => {
    const component = shallow(<ButtonLink />);

    expect(component).toMatchSnapshot();
  });
});