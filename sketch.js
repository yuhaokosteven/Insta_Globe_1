var clr, p5Ready = false;

var picture = [];
var picture1 = [];

var img;

var maxRadius = 200;

var countryName;

var countryURL;
let finishLoad = false;

function setup() {
  createCanvas(960, 960);
  loadJSON('URL3.json', gotData);

  $(".search").keypress(function(e) {
    // console.log(e);
    //If enter key is pressed
    if (e.which == 13 && finishLoad == true) {
      //Use jQuery's trigger() function to execute the click event
      let currentSearch = $(".search").val();
      getName = currentSearch.replace(' ', ''); //replace space into no space
      // console.log(getName)
      changeCountry(getName);
    }
  });


}

//get json data
function gotData(data) {
  // print(data);
  countryName = data;
  finishLoad = true;
  console.log(finishLoad)
}

//get changedCountry name
function changeCountry(getName) {
  picture = []; //clear the array
  var country = countryName.find(country => country.name == getName); //use array.find(item => item) to get data from json
  if (!country) {
    console.log("No data for: " + getName)
  } else {
    countryURL = country.url;
    for (var i = 0; i < countryURL.length; i++) {
      var radius = Math.random() * 10 + 1;
      // var x = Math.random() * (windowWidth - radius * 2) + radius;
      // var y = Math.random() * (windowHeight - radius * 2) + radius;
      var x = 960 / 2;
      var y = 960 / 2;
      var dx = (Math.random() - 0.5) * 4;
      var dy = (Math.random() - 0.5) * 4;
      img = loadImage(countryURL[i]);
      var p = new Picture(img, x, y, dx, dy, radius);
      var p1 = new Picture(img, random(x), random(y), dx, dy, radius);
      picture.push(p);
      picture1.push(p1);
    }
  }
  // console.log(countryURL);
}

function draw() {
  background(220, 0);

  //requestAnimationFrame(animate);
  clear(0, 0, windowWidth, windowHeight);
  // console.log("drawing")
  for (var i = 0; i < picture.length; i++) {
    // picture[i].display();
    picture[i].update();
  }
}


function countryChanged(getName) {
  // if (!p5Ready) {  this is a way that can communicate with d3
  //   return;
  // }

  //change input image url
  // for (var i = 0; i < picture.length; i++) {
  // for (var i = 0; i < picture.length; i++) {
  //   // picture.update();
  //   // picture[i].display();
  // }
  picture = changeCountry(getName);
  // console.log("HERE: ")
  // console.log(picture)
  //change color
  // console.log(country);
  // clr = color(random(255), random(255), random(255));

}

function animate() {
  requestAnimationFrame(animate);
  clear(0, 0, 960, 960);

  for (var i = 0; i < picture.length; i++) {
    // picture[i].display();
    picture[i].update();
  }

}
