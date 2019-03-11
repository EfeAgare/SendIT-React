import React from 'react';
import { shallow } from 'enzyme';
import { TextFieldGroup } from '../../components/common/TextFieldGroup';
import { spyhandleStatusChange } from '../ __mocks__/mockData';

let field = '';
let wrapper;
describe('Test TextFieldGroup Component', () => {
  it('should render order component', () => {
    wrapper = shallow(
      <TextFieldGroup
        field={field}
        value={field}
        onChange={spyhandleStatusChange}
        type={''}
      />
    );
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
  });
});
