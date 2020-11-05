import React, {Component} from 'react';
import './App.css';
import ItemList from './components/ItemList';

class App extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    fetch('http://localhost:9090/inventory/items')
    .then(res => res.json())
    .then((data) => {
      this.setState({ items: data })
    })
    .catch(console.log)
  }

  render () {
    return (
      <div className="App">
        <ItemList items={this.state.items}/>
      </div>
    );
  }
}

export default App;
