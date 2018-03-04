import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const items = [];
for (let i = 1993; i <= new Date().getFullYear(); i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

export default class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSetChange = this.handleSetChange.bind(this);
  }

  static defaultProps = {
    year: 2018,
    filteredSets: []
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filteredSets !== this.props.filteredSets) {
      let sets = [];
      for (let i = 0; i < this.props.filteredSets.length; i++) {
        sets.push(<MenuItem value={this.props.filteredSets[i].code} key={i} primaryText={`${this.props.filteredSets[i].name}`} />);
      }
      this.setState({ sets: sets, selectedSet: this.props.filteredSets[0].code })
    }
    if (prevState.selectedSet === undefined) {
      this.props.selectedSet(this.state.selectedSet);
      console.log(prevState);
    }
  }

  componentDidMount() {
    this.setState({
      year: this.props.year
    });
    this.props.selectedYear(this.props.year);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange = (event, index, value) => {
    this.setState({
      year: value
    }, function () {
      this.props.selectedYear(this.state.year);
    });
  };

  handleSetChange = (event, index, value) => {
    this.setState({
      selectedSet: value
    }, function () {
      this.props.selectedSet(this.state.selectedSet);
    });

  }

  render() {
    return (
      <div>
        <DropDownMenu maxHeight={300} value={this.props.year} onChange={this.handleChange}>
          {items}
        </DropDownMenu>
        <DropDownMenu maxHeight={300} value={this.state.selectedSet} onChange={this.handleSetChange}>
          {this.state.sets}
        </DropDownMenu>
      </div>
    );
  }
}