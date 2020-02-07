import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CheckBoxHolder from './components/CheckboxHolder/CheckboxHolder.js';
import Dropdown from './components/Dropdown/Dropdown.js';
import Graph from './components/Graph/Graph.js';


class App extends Component {
    state = {
        apiShipIndices: [23, 59, 32, 52, 10],
        selectedFeature: "crew",
        displayShips: [],
        maxFeatureSize: 0
    };


    SW_Ships = {
        CR90_corvette: { name: "CR90 corvette", index: 2},
        Star_Destroyer: { name: "Star Destroyer", index: 3},
        Sentinel_class_landing_craft: { name: "Sentinel-class landing craft", index: 5},
        Death_Star: { name: "Death Star", index: 9},
        Millennium_Falcon: { name: "Millennium Falcon", index: 10},
        Y_wing: { name: "Y-wing", index: 11},
        X_wing: { name: "X-wing", index: 12},
        TIE_Advanced_x1: { name: "TIE Advanced x1", index: 13},
        Executor: { name: "Executor", index: 15},
        Rebel_transport: { name: "Rebel transport", index: 17},
        Slave_1: { name: "Slave 1", index: 21},
        Imperial_shuttle: { name: "Imperial shuttle", index: 22},
        EF76_Nebulon_B_escort_frigate: { name: "EF76 Nebulon-B escort frigate", index: 23},
        Calamari_Cruiser: { name: "Calamari Cruiser", index: 27},
        A_wing: { name: "A-wing", index: 28},
        B_wing: { name: "B-wing", index: 29},
        Republic_Cruiser: { name: "Republic Cruiser", index: 31},
        Droid_control_ship: { name: "Droid control ship", index: 32},
        Naboo_fighter: { name: "Naboo fighter", index: 39},
        Naboo_Royal_Starship: { name: "Naboo Royal Starship", index: 40},
        Scimitar: { name: "Scimitar", index: 41},
        J_type_diplomatic_barge: { name: "J-type diplomatic barge", index: 43},
        AA_9_Coruscant_freighter: { name: "AA-9 Coruscant freighter", index: 47},
        Jedi_starfighter: { name: "Jedi starfighter", index: 48},
        H_type_Nubian_yacht: { name: "H-type Nubian yacht", index: 49},
        Republic_Assault_ship: { name: "Republic Assault ship", index: 52},
        Solar_Sailer: { name: "Solar Sailer", index: 58},
        Trade_Federation_cruiser: { name: "Trade Federation cruiser", index: 59},
        Theta_class_T_2c_shuttle: { name: "Theta-class T-2c shuttle", index: 61},
        Republic_attack_cruiser: { name: "Republic attack cruiser", index: 63},
        Naboo_star_skiff: { name: "Naboo star skiff", index: 64},
        Jedi_Interceptor: { name: "Jedi Interceptor", index: 65},
        arc_170: { name: "arc-170", index: 66},
        Banking_clan_frigate: { name: "Banking clan frigate", index: 68},
        Belbullab_22_starfighter: { name: "Belbullab-22 starfighter", index: 74},
        V_wing: { name: "V-wing", index: 75},
        T_70_X_wing_fighter: { name: "T-70 X-wing fighter", index: 77},
    }
    
    SW_ShipFeatures =[
        {param: "crew", text: "Crew Size"},
        {param: "cost_in_credits", text: "Cost (Galactic Credits)"},
        {param: "length", text:  "Ship Length"},
        {param: "max_atmosphering_speed", text: "Max Speed"},
        {param: "passengers", text:  "Max Passengers"},
        {param: "cargo_capacity", text:  "Cargo Capacity"},
        {param: "hyperdrive_rating", text: "HyperDrive Rating"}
    ];

    componentDidMount() {
        console.log('entering ComponentDidMount Function');
        this.fetchShipInfoAPI()

    }


    fetchShipInfoAPI = () => {
        console.log("Entering fetchShipInfoAPI function");
        //before fetching anything, we have to make sure to update the indicies and the selected feature based on user input
        
        let numberOfRequests = this.state.apiShipIndices.length;
        let currentMaxFeatureSize= 0;
        this.setState({
            displayShips: [],
            maxFeatureSize: currentMaxFeatureSize
        })
        for (let shipID of this.state.apiShipIndices){
            console.log("loading Index:",shipID);
            console.log("Total Number of Requests: ", numberOfRequests);
            fetch(`https://swapi.co/api/starships/${shipID}/`)
                .then(response => response.json())
                .then(data => {
                    console.log("storing data for ship: ", data.name);
                    console.log(data);
                    this.setState({
                        displayShips: this.state.displayShips.concat([data])
                    });       
                    console.log('data[selectedFeature], for feature', this.state.selectedFeature, ": ", data[this.state.selectedFeature] );
                    if (Number(data[this.state.selectedFeature]) > currentMaxFeatureSize){
                        console.log("updating max feature length from: "+ currentMaxFeatureSize +" to: "+ data[this.state.selectedFeature] );
                        currentMaxFeatureSize = Number(data[this.state.selectedFeature]);
                        this.setState({
                            maxFeatureSize: currentMaxFeatureSize
                        });
                    }
                    numberOfRequests--;
                });
        }   
    }

    createClickHandler (myShip) {
        return( alert(myShip.name+'\nCrew Size: '+ myShip.crew +
                    '\nCost (Galactic Credits): '+ myShip.cost_in_credits +
                    '\nShip Length: '+ myShip.length +
                    '\nMax Speed: '+ myShip.max_atmosphering_speed +
                    '\nMax Passengers: ' +myShip.passengers +
                    '\nCargo Capacity: ' +myShip.cargo_capacity +
                    '\nHyperDrive Rating: '+myShip.hyperdrive_rating))
    
        
    }
    

    selectFeature = (ev) =>{
        console.log("Entering selectFeature method with params: ", ev.target.value);
        let newMaxFeatureSize = 0;
        let newSelectedFeature = ev.target.value;
        for (let myShip of this.state.displayShips){
            if (Number(myShip[newSelectedFeature]) > newMaxFeatureSize){
                console.log("updating max feature length from: "+ newMaxFeatureSize +" to: "+ myShip[newSelectedFeature] );
                newMaxFeatureSize = Number(myShip[newSelectedFeature]);
            }
        }
        this.setState({
            selectedFeature: newSelectedFeature,
            maxFeatureSize: newMaxFeatureSize
        })

    }
    shipClick = (ev) =>{
        console.log("Entering shipClick method with param:", ev.target.value, ev.target.checked)
        let checkBoxValue = Number(ev.target.value);
        let newShipIndices = [...this.state.apiShipIndices];

        if (ev.target.checked){ // add the value to apiShipIndices 
            this.setState({
                apiShipIndices: newShipIndices.concat([checkBoxValue])
            });
            
        }
        else{ //remove value from apiShipIndices
            let index = newShipIndices.indexOf(checkBoxValue);
            if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                newShipIndices.splice(index, 1);
              }
            this.setState({
                apiShipIndices: newShipIndices
            });

        }
        this.fetchShipInfoAPI();
    }
  
    render(){
    return (
    <div className="App">
        <div id="space">
            <div className="stars"></div>
            <div className="stars"></div>
            <div className="stars"></div>
            <div className="stars"></div>
            <div className="stars"></div>
        </div>
        <div className="BarChart-entirety">
            <div className="BarChart-header">
                <h1>Star Wars Ship Compare</h1>
            </div>
            <div className="BarChart-featureComparison">
                <label>Choose Feature
                    <Dropdown
                        ChangeSelection = {(ev) => this.selectFeature(ev)}
                        SelectedOption = {this.state.selectedFeature}
                        OptionList = {this.SW_ShipFeatures}
                    />
                    {/* <select className="BarChart-select" onChange={(ev) => this.selectFeature(ev)} value={this.state.selectedFeature}>
                    {
                        this.SW_ShipFeatures.map( ShipFeature => (
                            <option value={ShipFeature.param} key={ShipFeature.param}> { ShipFeature.text} </option>
                        ))
                    }
                    </select> */}
                </label>
            </div>
            <div className="BarChart-shipSelection">
            {
                Object.keys(this.SW_Ships).map(ShipKey => (
                    <label htmlFor={ShipKey} key={ShipKey}> {this.SW_Ships[ShipKey].name}
                    {
                        this.state.apiShipIndices.includes(this.SW_Ships[ShipKey].index) ? 
                            <input type="checkbox" key={this.SW_Ships[ShipKey].index} checked name={ShipKey} onChange={(ev) => this.shipClick(ev)} value={this.SW_Ships[ShipKey].index} id={ShipKey} className="BarChart-shipCheckbox"></input> :
                            <input type="checkbox" key={this.SW_Ships[ShipKey].index} name={ShipKey} onChange={(ev) => this.shipClick(ev)} value={this.SW_Ships[ShipKey].index} id={ShipKey} className="BarChart-shipCheckbox"></input>
                    }
                        </label>
                ))
            }
            </div>
            <div className="BarChart-container">
                {
                    this.state.displayShips.map( currentShip => (
                        <div 
                            className="BarChart-bar" 
                            name={currentShip.name}
                            onClick={() => this.createClickHandler(currentShip)}
                            style={{height: 100*(Number(currentShip[this.state.selectedFeature]) / this.state.maxFeatureSize) + '%'}} 
                        >{currentShip.name}</div>
                    ))
                }


            </div>
      </div>

      
    </div>
  );
}
}

export default App;
