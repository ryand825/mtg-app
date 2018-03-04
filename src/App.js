import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Picker from './components/Picker/Picker';
// import Sets from './components/Sets/Sets';
import Booster from './components/Booster/Booster';
import RaisedButton from 'material-ui/RaisedButton';


var selectedSetCode = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.generateBooster.bind(this);

    axios.get(`https://api.magicthegathering.io/v1/sets`)
      .then(res => {
        const allSets = res.data.sets.filter(set => set.hasOwnProperty("booster"));
        this.setState({ allSets: allSets })
        console.log(this.state.allSets);
        this.setState({ year: new Date().getFullYear() })
      });
  }

  handleSelectedYear = (year) => {
    let yearFilter = year.toString();
    let yearFilterSets = this.state.allSets.filter(set => set.releaseDate.match(yearFilter));
    this.setState({ yearFilterSets: yearFilterSets, year: year });
    console.log(year);
  };

  handleSelectedSet = (code) => {
    selectedSetCode = code;
    console.log("1 " + selectedSetCode);
  }

  generateBooster = (e) => {
    this.setState((prevState, props) => ({
      setCode: selectedSetCode,
      counter: prevState.counter + 1
    }));
    console.log(this.state.counter);
  }

  render() {
    return (
      
      <div className="App">
        <RaisedButton className="menu button" label="Open Booster" fullWidth={true} primary={true} onClick={this.generateBooster} />
        {this.state.year ? <Picker className="menu" selectedYear={this.handleSelectedYear} year={this.state.year} filteredSets={this.state.yearFilterSets}
          selectedSet={this.handleSelectedSet} /> : <p> loading </p>}

        <Booster reset={this.state.counter} setCode={this.state.setCode} />
      </div>
    );
  }
}

export default App;
