import React, { Component } from 'react';
import axios from 'axios';

class Sets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: []
        };
    }

    // componentWillReceiveProps(nextProps){
    //         if(nextProps.setYear !== this.state) 
    // }

    componentWillMount() {
        // if (this.props.setYear !== false) {

        // }
    }

    render() {
        if (this.props.selectedSets) {
            return (
                <div>
                    <h1>Sets</h1>
                    <ul>
                        {this.props.selectedSets.map(sets =>
                            <li key={sets.code}>{sets.name}</li>
                        )}
                    </ul>
                </div>
            );
        } else {
            return <h1>Select Year</h1>
        }
    }
}

export default Sets;
