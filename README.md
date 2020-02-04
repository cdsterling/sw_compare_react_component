to run locally: npm run start

![image](https://user-images.githubusercontent.com/4316178/73598789-848f1c80-44f1-11ea-9a68-45862a98b3c0.png)
#Star Wars Starship Crewsize Comparison
to run locally: npx node-static

This is HW 3 for my Kickstart Frontend Course

I have chosen to visualize data from the star wars api https://swapi.co/
For this initial data visualization i will be comparing the crew sizes of different starships.

in order to get this data the api is called like this:
	https://swapi.co/api/starships/<StarshipID#>/

where <StarShipID#> is the id number for a starship. So for example https://swapi.co/api/starships/9/ returns results (in json format) about the Death Star (technically it is a starship, although at somepoint there was confusion about it being a moon, i believe) which has a crew size of (according to the api) 342,953.

This comparison is visualized using a bar graph.

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


Files:
 * README.md - This file containing relavant info about the project
 * src/App.js - this is where all of the react/javascript/jsx magic happens
 * src/App.css -all of the css used by the elements created in App.js
