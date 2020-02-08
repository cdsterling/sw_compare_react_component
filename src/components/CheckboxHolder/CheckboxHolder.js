import React, { Component } from 'react';
import './CheckBoxHolder.css';
import CheckBox from '../CheckBox/CheckBox.js';


class CheckBoxHolder extends Component {

    render() {
        return(
            <div className="BarChart-shipSelection">
            {
                Object.keys(this.props.AllCheckBoxes).map(Box => (
                    <label htmlFor={Box} key={Box}> {this.props.AllCheckBoxes[Box].name}
                    
                    {
                        this.props.CheckedBoxes.includes(this.props.AllCheckBoxes[Box].index) ?
                        (
                            <CheckBox 
                                CheckValue="checked"
                                OnChange={this.props.BoxChecked}
                                BoxID={Box}
                                BoxName={this.props.AllCheckBoxes[Box].name}
                                BoxVal={this.props.AllCheckBoxes[Box].index}

                            /> 
                        ):
                        (
                            <CheckBox 
                            OnChange={this.props.BoxChecked}
                            BoxID={Box}
                            BoxName={this.props.AllCheckBoxes[Box].name}
                            BoxVal={this.props.AllCheckBoxes[Box].index}
                            />
                        )

                    }
                        </label>
                ))
            }
            </div>
            );
        
    }

}

export default CheckBoxHolder;