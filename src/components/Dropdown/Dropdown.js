import React, { Component } from 'react';
import './Dropdown.css';


class Dropdown extends Component {
    
    render() {
        return (
            <label>Choose Feature
                <select className="BarChart-select" onChange={this.props.ChangeSelection}>
                {
                    this.props.OptionList.map( Option => (
                        <option value={Option.param} key={Option.param}> { Option.text} </option>
                    ))
                }
                </select>
            </label>
        );
    }

}

export default Dropdown;
