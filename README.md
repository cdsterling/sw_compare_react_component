to run locally: npm run start

![image](https://user-images.githubusercontent.com/4316178/73598789-848f1c80-44f1-11ea-9a68-45862a98b3c0.png)
#Star Wars Starship Crewsize Comparison

This is HW 4 for my Kickstart Frontend Course

I have chosen to visualize data from the star wars api https://swapi.co/
For this initial data visualization i will be comparing the crew sizes of different starships.

in order to get this data the api is called like this:
	https://swapi.co/api/starships/<StarshipID#>/

where <StarShipID#> is the id number for a starship. So for example https://swapi.co/api/starships/9/ returns results (in json format) about the Death Star (technically it is a starship, although at somepoint there was confusion about it being a moon, i believe) which has a crew size of (according to the api) 342,953.

This comparison is visualized using a bar graph.

For this project I broke down the application into various Components:
* CheckBoxHolder - is the element that holds all of our checkboxes
* CheckBox - this is a single checkbox
* Dropdown - this is our dropdown, you can pass in a list of options
* BarChart - displays all of the chart data.


Files:
 * README.md - This file containing relavant info about the project
 * src/App.js - this is where all of the react/javascript/jsx magic happens
 * src/App.css -all of the css used by the elements created in App.js
 * src/components/CheckBoxHolder/
   * CheckBoxHolder.js and CheckBoxHolder.css
 * src/components/CheckBox/
   * CheckBox.js and CheckBox.css
 * src/components/DropDown/
   * DropDown.js and DropDown.css
 * src/components/BarChart/
   * BarChart.js and BarChart.css 




FutureThoughts:

Note the use of SetTimeout implimented in fetchShipInfoAPI. i had to do this because i noted that in the flow where a CheckBox is clicked, the shipClick method is called. it updates the state apiShipIndicies and then calls fetchShipInfoAPI. 
However since the state update is asychronyous, the call to fetchShipInfo, which uses the state to make multiple fetch calls to the star wars api was getting apiShipIndicies before the state was actually updated. So i implimented the SetTimeout stragety to make fetchShipInfo wait until the state was updated. 

A future thought would be to set all of my state variables at once, instead of updating state twice for a single action. 



Note: i had to include a list of objects to tie each of the ships to the index that can be used to call it. Unfortunately nothing on the return json from a ship is indicative of what the index of that ship is. Furthermore the ships indices are non-sequential. 
-----
The api also includes other data for various features/dimentions of the various Star Wars Starships. I have added the ability to compare on these different dimensions:
* Crew Size,
* Cost (Galactic Credits)
* Ship Length
* Max Speed
* Max Passengers
* Cargo Capacity
* HyperDrive Rating


for the starfield background i googled and found this awesome one put together by Keith Clark: https://codepen.io/keithclark/pen/zqcEd . It seemed very pertinent to the star wars theme.

note that i had to increase the z index of the bars in the bar chart, the dropdown and all of the checkboxes in order for them to be clicked on.


