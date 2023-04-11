import react from 'react';
import {shallow} from 'enzyme';
import ButtonsContainer from '../ButtonsContainer';

describe('ButtonsContainer', () => {
  it('should render correctly', () => {
    const component = shallow(<ButtonsContainer />);

    expect(component).toMatchSnapshot();
  });
});