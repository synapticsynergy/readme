(function() {
  'use strict';

angular.module('app.home.insights').
  //camel cased directive name
  //in your HTML, this will be named as bubble-chart
  directive('bubbleChart', bubbleChart);

    function bubbleChart($parse, store) {

    var directiveDefinitionObject = {
      //We restrict its use to an element
      //as usually  <bubble-chart> is semantically
      //more understandable
      restrict: 'E',
      //this is important,
      //we don't want to overwrite our directive declaration
      //in the HTML mark-up
      replace: false,
      link: function (scope, element, attrs) {

        //converting all data passed thru into an array of objects.
        var data = store.get('currentCorrelationData');
        data = data.map(function(obj) {
          var result = {};
          result.label = Object.keys(obj)[0];
          result.r = obj[result.label] * 100 + 1;
          return result;
        });
        console.log(data[0],'d3');
        //in D3, any selection[0] contains the group

        var svgContainer = d3.select(element[0]);



        var width = 640;
        var height = 480;

        //create svg container.
        var svg = svgContainer.append("svg").attr('width', width).attr('height', height);

        svg.attr("class", "svgContainer");


        //text data

        var nodes = d3.values(data);

        // layout for gravitational effect.
        var force = d3.layout.force() //build the layout
          .size([width, height]) //specified earlier
          .nodes(nodes) //add nodes
          .on("tick", tick) //what to do
          .start();


        // add the nodes
        var node = svg.selectAll('.node')
          .data(force.nodes()) //add

        var elemEnter = node.enter().append('g')
            .attr("transform", function(d){return "translate("+d.x+",80)"});


        /*Create the circle for each block */
        var circle = elemEnter.append("circle")
          .attr('class', 'node')
          .attr("r", function(d){return d.r} )
          .attr("stroke","black")
          .attr("fill", "white");

        /* Create the text for each block */
        elemEnter.append("text")
          .attr("dr", function(d){return -20})
          .text(function(d){return d.label});




        force.on("tick", function(e) {
          var q = d3.geom.quadtree(nodes),
              i = 0,
              n = nodes.length;

          while (++i < n) q.visit(collide(nodes[i]));

          svg.selectAll("g")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
              .call(force.drag)
        });


        function collide(node) {
          var r = node.r + 16,
              nx1 = node.x - r,
              nx2 = node.x + r,
              ny1 = node.y - r,
              ny2 = node.y + r;
          return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
              var x = node.x - quad.point.x,
                  y = node.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = node.radius + quad.point.radius;
              if (l < r) {
                l = (l - r) / l * .5;
                node.x -= x *= l;
                node.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
              }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
          };
        }


        //semi works
        //   .enter().append('circle')
        //   .attr('class', 'node')
        //   .attr('r', width * 0.03)//radius of circle
        //   .style('fill','lightblue')
        //   .attr('stroke','grey')

        function tick(e) {

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .call(force.drag);


        }




      },
      scope: { data: '=' }

    };
      return directiveDefinitionObject;
   };

})();