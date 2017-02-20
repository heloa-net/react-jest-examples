import React, { Component } from 'react';

export class BeerListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: []
    }
    this.addItem = this.addItem.bind(this);
  }

  addItem(name) {
    this.setState({
      beers: [...this.state.beers, name] // es6
    })
  }

  render() {
    return (
      <div>
        <InputArea onSubmit={this.addItem} />
        <BeerList items={this.state.beers} />
      </div>
    )
  }
}

export class BeerList extends Component {
  render() {
    return this.props.items ? (
      <ul>
        {this.props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
    : null;
  }
}

BeerList.propTypes = {
  items: React.PropTypes.array.isRequired
};

export class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.setText = this.setText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSubmit(this.state.text);
  }
  
  setText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <input value={this.state.text} onChange={this.setText}/>
        <button onClick={this.handleClick}>
          Add
        </button>
      </div>
    ) 
  }
}

InputArea.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired
};