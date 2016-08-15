(function() {
  'use strict';

angular.module('app.home.insights').
  //camel cased directive name
  //in your HTML, this will be named as bubble-chart
  directive('bubbleChart', bubbleChart);

    function bubbleChart($parse, store, Insights) {

    var directiveDefinitionObject = {
      //We restrict its use to an element
      //as usually  <bubble-chart> is semantically
      //more understandable
      restrict: 'E',
      //this is important,
      //we don't want to overwrite our directive declaration
      //in the HTML mark-up
      replace: false,

      scope: { data: '=' },

      link: function (scope, element, attrs) {

        //converting all data passed thru into an array of objects.

        // var data = Insights.dataRefresh();
        function renderIt(data) {
        // var data = store.get('currentCorrelationData');

        data = data.map(function(obj) {
          var result = {};
          result.label = Object.keys(obj)[0];
          result.r = obj[result.label] * 100;
          return result;
        });
        console.log(data[0],'d3');
        //in D3, any selection[0] contains the group

        var svgContainer = d3.select(element[0]);



        var width = 600;
        var height = 800;

        //create svg container.
        var svg = svgContainer.append("svg").attr('width', width).attr('height', height);
        // d3.selectAll("svg > *").remove();

        svg.attr("class", "svgContainer");


        var nodes = d3.values(data);

        // layout for gravitational effect.
        var force = d3.layout.force()//build the layout
          .charge(-1200) // node distance from eachother.
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
          .attr("r", function(d){return d.r > 0 ? d.r / 2 : 20} )
          .attr("stroke","grey")
          .attr("fill", "lightblue");

        /* Create the text for each block */
        elemEnter.append("text")
          .attr("dr", function(d){return -10})
          .text(function(d){return d.label + " | " + ~~d.r + "%" + " | "});


        function tick(e) {
          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .call(force.drag);
        }
      }

        scope.$on('newData',function(event, data){
          d3.selectAll('svg').remove();
          renderIt(data.data);
          console.log('watch is working');
        });

      }


    };
      return directiveDefinitionObject;
   };

})();
