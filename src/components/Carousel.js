import React from 'react';
import avocadoFries from '../assets/avocadoFries.jpg'
import chickenAndTots from '../assets/chickenAndTots.jpg'
import chickenWaffles from '../assets/chickenWaffles.jpg'
import nutellaWaffles from '../assets/nutellaWaffles.jpg'
import tacos from '../assets/tacos.jpg'
import wingsAndPasta from '../assets/wingsAndPasta.jpg' 
const Carousel = (props) => {
    return ( 
        <div className="row carousel-row">
            <div className="col"/>
                <img className ="carousel-image" src={avocadoFries} alt="" />
            <div/>
            <div className="col"/>
                <img className ="carousel-image" src={chickenAndTots} alt="" />
            <div/>
            <div className="col"/>
                <img className ="carousel-image" src={chickenWaffles} alt="" />
            <div/>
            <div className="col"/>
                <img className ="carousel-image" src={nutellaWaffles} alt="" />
            <div/>
            <div className="col"/>
                <img className ="carousel-image" src= {tacos} alt="" />
            <div/>
            <div className="col"/>
                <img className ="carousel-image" src={wingsAndPasta} alt="" />
            <div/>

        </div>
     );
}
 
export default Carousel;

