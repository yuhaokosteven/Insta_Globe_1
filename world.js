var width = 960,
  height = 960;

var currentSearch;

var projection = d3.geo.orthographic()
  .translate([width / 2, height / 2])
  .scale(width / 2 - 20)
  .clipAngle(90)
  .precision(0.6);

var canvas = d3.select(".Aligner").append("canvas")
  .attr("width", width)
  .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
  .projection(projection)
  .context(c);

var title = d3.select("h1");

queue()
  .defer(d3.json, "world-110m.v1.json")
  .defer(d3.tsv, "world-country-names.tsv")
  .await(ready);

// ready();

function ready(error, world, names) {
  if (error) throw error;

  var country = 0,

    globe = {
      type: "Sphere"
    },
    land = topojson.feature(world, world.objects.land),
    countries = topojson.feature(world, world.objects.countries).features,
    borders = topojson.mesh(world, world.objects.countries, function(a, b) {
      return a !== b;
    }),
    i = -1,
    n = countries.length;


  // console.log(n);

  countries = countries.filter(function(d) {
    return names.some(function(n) {
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function(a, b) {
    return a.id.localeCompare(b.id);
  });


  var input = d3.select("input")
    .on("cut", function() {
      setTimeout(change, 10);
    })
    .on("paste", function() {
      setTimeout(change, 10);
    })
    .on("change", change)
    .on("keyup", change);

  change();

  function change() {
    var country1 = input.property('value')
    var id;
    if (country === country1) return;
    country = country1;
    names.forEach(function(d) {
      for (var i = 0; i < country1.length; i++) {
        if (d.name !== country1) {
          return;
        }
      }

      id = d.id; //country id equals to input country's id
      (function transition() {
        // countryChanged();
        d3.transition()
          .duration(1250)
          .each("start", function() {
            // style('fill', 'darkOrange')
            title.text(d.name);

            // console.log(d.name);
          })
          .tween("rotate", function() {
            var country = countries.filter(function(country) {
              return country.id === id;
            })
            // debugger;
            var p = d3.geo.centroid(country[0]),
              r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
            return function(t) {
              projection.rotate(r(t));
              c.clearRect(0, 0, width, height);
              c.fillStyle = "#ccc", c.beginPath(), path(land), c.fill();
              c.fillStyle = "#5a5a5a", c.beginPath(), path(country[0]), c.fill();
              c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
              c.strokeStyle = "#fff", c.lineWidth = 1, c.beginPath(), path(globe), c.stroke();
            };
          })
          .transition()
        // .each("end", transition);
      })();
    });
  }
}

d3.select(self.frameElement).style("height", height + "px");
