import React, { Component } from 'react';
import './BarChart.css';


class BarChart extends Component {
    
    render() {
        return (
            <div className="BarChart-container">
            {
                this.props.Bars.map( currentBar => (
                    <div 
                        className="BarChart-bar" 
                        name={currentBar.name}
                        onClick={() => this.props.ClickBar(currentBar)}
                        style={{height: 100*(Number(currentBar[this.props.ComparisonFeature]) / this.props.BiggestValue) + '%'}} 
                    >{currentBar.name}</div>
                ))
            }
            </div>
        );
    }

}

export default BarChart;
