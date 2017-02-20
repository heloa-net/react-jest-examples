import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import {BeerListContainer, BeerList, InputArea} from './components';

describe('BeerListContainer', () => {

  test('renders its subcomponents', () => {
    const wrapper = shallow(<BeerListContainer/>);

    expect(wrapper.containsAllMatchingElements([
      <InputArea />,
      <BeerList />
    ])).toEqual(true);
  });

  test('starts with an empty list', () => {
    const wrapper = shallow(<BeerListContainer/>);

    expect(wrapper.state('beers')).toEqual([]);
  });

  test('adds items to the list', () => {
    const wrapper = shallow(<BeerListContainer/>);

    wrapper.instance().addItem('Sam Adams');
    wrapper.instance().addItem('Delirium');
    expect(wrapper.state('beers')).toEqual(['Sam Adams', 'Delirium']);
  });

  test('passes addItem to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;

    expect(inputArea.prop('onSubmit')).toEqual(addItem);
  });

  test('passes a bound addItem function to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);

    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('WoW Cheap Beer');

    expect(wrapper.state('beers')).toEqual(['WoW Cheap Beer']);
  });

  test('renders the items', () => {
    const wrapper = mount(<BeerListContainer />);
    wrapper.instance().addItem('Sam Adams');
    wrapper.instance().addItem('Resin');

    expect(wrapper.find('li').length).toEqual(2);
  });

});

describe('InputArea', () => {
  
  test('should contain an input and a button', () => {
    const wrapper = shallow(<InputArea />);

    expect(wrapper.containsAllMatchingElements([
      <input />,
      <button>Add</button>
    ])).toEqual(true);
  });

  test('should accept input', () => {
    const wrapper = mount(<InputArea />);

    const input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'Resin'
      }
    });

    expect(wrapper.state('text')).toEqual('Resin');
    expect(input.prop('value')).toEqual('Resin');
  });

  test('should call onSubmit when Add is clicked', () => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy} />);
    const addButton = wrapper.find('button');

    wrapper.setState({ text: 'Oktoberfest' });
    addButton.simulate('click');

    expect(addItemSpy.calledOnce).toEqual(true);
    expect(addItemSpy.calledWith('Oktoberfest')).toEqual(true);
  });
});

describe('BeerList', () => {
  test('should render zero items', () => {
    const wrapper = shallow(<BeerList items={[]} />);

    expect(wrapper.find('li')).toHaveLength(0);
  });

  test('should render undefined items', () => {
    const wrapper = shallow(<BeerList items={undefined} />);
    expect(wrapper.find('li')).toHaveLength(0);
  });

  test('should render some items', () => {
    const items = ['Sam Adams', 'Resin', 'Oktoberfest'];
    const wrapper = shallow(<BeerList items={items} />);

    expect(wrapper.find('li')).toHaveLength(3);
  });
});

