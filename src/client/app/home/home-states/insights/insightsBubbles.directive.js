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

        if (data.length > 18) {
          var cache = data.slice();
          console.log(cache,'cache');
          cache.sort(function(a,b) {
            return a.r - b.r;
          });
          cache.splice(9,cache.length - 18);
          data = cache;
          console.log(cache.length,'cache new length');
        }

        console.log(data[0],'d3');
        //in D3, any selection[0] contains the group

        var svgContainer = d3.select(element[0]);



        var width = 600; //600
        var height = 800;

        //create svg container.
        var svg = svgContainer.append("svg").attr('width', width).attr('height', height);
        // d3.selectAll("svg > *").remove();

        svg.attr("class", "svgContainer");

        //for custom colors
        // var colorScale = d3.scale.linear().domain([-100, 0, 100]).range(['red', '#ddd', 'lightblue']);

        //positive numbers
        // var posColorScale = d3.scale.category20c();
        // var posColorScale = d3.scale.linear().domain([-100,100]).range(['#BCCFO2', '#5BB12F']);
        // var posColorScale = d3.interpolateYlGn;
       var posColorScale = d3.scale.linear().domain([0,1])
        .interpolate(d3.interpolateHcl)
        .range(["white", d3.rgb('#FFF500')]);





        //negative colors
        // var negColorScale = d3.scale.category20b();
        // var negColorScale = d3.scale.linear().domain([0, -100]).range(['#ddd', '#EB65A0']);
        var negColorScale = d3.scale.linear().domain([0,1])
          .interpolate(d3.interpolateHcl)
          .range(['white', d3.rgb('#00FFFF')]);


        var nodes = d3.values(data);

        // layout for gravitational effect.
        var force = d3.layout.force()//build the layout
          .charge(-300) // node distance from eachother.
          .gravity(.05)
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
          .attr("r", function(d){return d.r > 0 ? d.r / 1.2 : 40} )
          .attr("stroke","grey")
          .attr('fill',function(d) {
            if (d.r < 0) {
              return negColorScale(d.r * -1);
            }
            var colorScl = d.r/100;
            return posColorScale(colorScl);
          })
          // .attr("fill", "lightblue");

        /* Create the text for each block */
        elemEnter.append("text")
          .attr("text-anchor", "middle")
          .text(function(d){return d.label})
          .attr('dy','0em');


        elemEnter.append("text")
          .attr("text-anchor", "middle")
          .text(function(d){return ~~d.r + "%"})
          .attr('dy','1.5em');



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
