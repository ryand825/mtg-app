import React, { Component } from 'react';
// import Carousel from 'nuka-carousel';
import axios from 'axios';


class Booster extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.setCode !== this.props.setCode) {
            axios.get(`https://api.magicthegathering.io/v1/sets/${nextProps.setCode}/booster`)
                .then(res => {
                    if(res !== undefined){
                    let cards = [];
                    for(var i = 0; i < res.data.cards.length; i++){
                        cards.push(<img alt="" src={res.data.cards[i].imageUrl} key={this.state.counter * i}/>);
                    }
                    this.setState({cards: cards, counter: this.props.counter});
                    console.log(cards);
                    }
                });
            console.log("booster: " + nextProps.setCode)
        }
    }


    render() {

        return (
            <div>
                {/* <Carousel className="slide" cellAlign="center" slidesToShow={3}> */}
                    {this.state.cards}
                {/* </Carousel> */}
                {this.state.counter}
            </div>
        );
    }
}

export default Booster;
