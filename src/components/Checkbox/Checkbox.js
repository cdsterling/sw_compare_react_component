import React, { Component } from 'react';
import './CheckBox.css';


class CheckBox extends Component {
    
    render() {
        return (
            this.props.CheckValue === "checked" ?
            <input type="checkbox" checked key={this.props.BoxVal}  name={this.props.BoxID} onChange={this.props.OnChange} value={this.props.BoxVal} id={this.props.BoxID} className="BarChart-shipCheckbox"></input> :
            <input type="checkbox" key={this.props.BoxVal}  name={this.props.BoxID} onChange={this.props.OnChange} value={this.props.BoxVal} id={this.props.BoxID} className="BarChart-shipCheckbox"></input> 
        )
    }

}
                    
export default CheckBox;
                    