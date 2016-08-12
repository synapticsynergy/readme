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
        console.log(data,'d3');
        //in D3, any selection[0] contains the group

        var svgContainer = d3.select(element[0]);



        var width = 640;
        var height = 480;

        //create svg container.
        var svg = svgContainer.append("svg").attr('width', width).attr('height', height);

        svg.attr("class", "svgContainer");


        // layout for gravitational effect.
        var force = d3.layout.force() //build the layout
          .size([width, height]) //specified earlier
          .nodes(d3.values(data)) //add nodes
          .on("tick", tick) //what to do
          .linkDistance(300) //set for proper svg size
          .start();


        // add the nodes
        var node = svg.selectAll('.node')
          .data(force.nodes()) //add
          .enter().append('circle')
          .attr('class', 'node')
          .attr('r', width * 0.03)//radius of circle
          .style('fill','lightblue');



        function tick(e) {

          node.attr('cx', function(d) { return d.x; })
              .attr('cy', function(d) { return d.y; })
              .call(force.drag);

        }




      },
      scope: { data: '=' }

    };
      return directiveDefinitionObject;
   };

})();