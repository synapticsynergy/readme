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
           var data = attrs.chartData.split(',');
           console.log(data,'d3');
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           var svgContainer = d3.select(element[0]);
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each
           //data entry to the chart
            var svg = svgContainer.append("svg").attr('width', 100 + '%').attr('height','500px');

            svg.attr("class", "svgContainer");






             // .selectAll("svg")
             // .data(data).enter().append("circle")
             // // .transition().duration(1000).ease("elastic")
             // .style("width", function(d) { return d + "%"; })
             // .style('background-color','blue')
             // .text(function(d) { return d + "%"; });
           //a little of magic: setting it's width based
           //on the data value (d)
           //and text all with a smooth transition
         }
      };
      return directiveDefinitionObject;
   };

})();