import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CheckBoxHolder from './components/CheckBoxHolder/CheckBoxHolder.js';
import Dropdown from './components/Dropdown/Dropdown.js';
import BarChart from './components/BarChart/BarChart.js';


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
        this.fetchShipInfoAPI(this.state.apiShipIndices.length)

    }


    fetchShipInfoAPI = (num_ships) => {
        console.log("Entering fetchShipInfoAPI function for the following # and indices:", num_ships, this.state.apiShipIndices);
        if (num_ships != this.state.apiShipIndices.length){
            setTimeout( () => {
                this.fetchShipInfoAPI(num_ships);
            }, 300)
            
        }
        else{ // now we can proceed with fetching stuff

        
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
    }
    
    createClickHandler = (myShip) => {
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
        console.log("Initial apiShipIndices: ",this.state.apiShipIndices)
        let checkBoxValue = Number(ev.target.value);
        let num_ships = this.state.apiShipIndices.length;
        let newShipIndices = [...this.state.apiShipIndices];

        if (ev.target.checked){ // add the value to apiShipIndices 
            console.log("adding to indices: ", newShipIndices.concat([checkBoxValue]));
            num_ships++;
            let newVal = newShipIndices.concat([checkBoxValue]);
            this.setState({
                apiShipIndices: newVal,
            });
            
        }
        else{ //remove value from apiShipIndices
            let index = newShipIndices.indexOf(checkBoxValue);
            console.log("removing from indices1");
            if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                num_ships--;
                console.log("removing from indices2");
                newShipIndices.splice(index, 1);
              }
            this.setState({
                apiShipIndices: newShipIndices
            });

        }
        console.log("Ship Click has updated apiShipIndices to: ", this.state.apiShipIndices)
        this.fetchShipInfoAPI(num_ships);
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
                <Dropdown
                    DropDownLabel = "Choose Feature"
                    ChangeSelection = {(ev) => this.selectFeature(ev)}
                    SelectedOption = {this.state.selectedFeature}
                    OptionList = {this.SW_ShipFeatures}
                />
            </div>
            
            <CheckBoxHolder
                AllCheckBoxes = {this.SW_Ships}
                CheckedBoxes = {this.state.apiShipIndices}
                BoxChecked = {(ev) => this.shipClick(ev)}

            />  
            <BarChart
                Bars={this.state.displayShips}
                ComparisonFeature={this.state.selectedFeature}
                BiggestValue={this.state.maxFeatureSize}
                ClickBar={this.createClickHandler}
            />
      </div>

      
    </div>
  );
}
}

export default App;
