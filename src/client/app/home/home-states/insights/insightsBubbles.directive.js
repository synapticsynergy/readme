(function() {
  'use strict';

angular.module('app.home.insights').
   //camel cased directive name
   //in your HTML, this will be named as bars-chart
   directive('bubbleChart', bubbleChart);

    function bubbleChart($parse) {
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}
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
           //converting all data passed thru into an array
           var data = scope.data;
           console.log(data,'d3');
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           var svgContainer = d3.select(element[0]);
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each

           var width = 640;
           var height = 480;

           //data entry to the chart
            var svg = svgContainer.append("svg").attr('width', width).attr('height', height);

            svg.attr("class", "svgContainer");


            var links = [
            { source: 'Baratheon', target:'Lannister' },
            { source: 'Baratheon', target:'Stark' },
            { source: 'Lannister', target:'Stark' },
            { source: 'Stark', target:'Bolton' }
            ];


            // create empty nodes array
            var nodes = {};

            // compute nodes from links data
            links.forEach(function(link) {
                link.source = nodes[link.source] ||
                    (nodes[link.source] = {name: link.source});
                link.target = nodes[link.target] ||
                    (nodes[link.target] = {name: link.target});
            });






            // use the force
            var force = d3.layout.force() //build the layout
                .size([width, height]) //specified earlier
                .nodes(d3.values(nodes)) //add nodes
                // .links(links) //add links
                .on("tick", tick) //what to do
                .linkDistance(300) //set for proper svg size
                .start(); //kick the party off!



                // add the links
                var link = svg.selectAll('.link')
                    .data(links)
                    .enter().append('line')
                    .attr('class', 'link');

                // add the nodes
                var node = svg.selectAll('.node')
                    .data(force.nodes()) //add
                    .enter().append('circle')
                    .attr('class', 'node')
                    .attr('r', width * 0.03); //radius of circle



              function tick(e) {

                  node.attr('cx', function(d) { return d.x; })
                      .attr('cy', function(d) { return d.y; })
                      .call(force.drag);

                  link.attr('x1', function(d) { return d.source.x; })
                      .attr('y1', function(d) { return d.source.y; })
                      .attr('x2', function(d) { return d.target.x; })
                      .attr('y2', function(d) { return d.target.y; });

              }



             // .selectAll("svg")
             // .data(data).enter().append("circle")
             // // .transition().duration(1000).ease("elastic")
             // .style("width", function(d) { return d + "%"; })
             // .style('background-color','blue')
             // .text(function(d) { return d + "%"; });
           //a little of magic: setting it's width based
           //on the data value (d)
           //and text all with a smooth transition
         },
         scope: { data: '=' }
      };
      return directiveDefinitionObject;
   };

})();