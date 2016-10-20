(function() {
  'use strict';
  angular.module('app.home.insights').
  directive('bubbleChart', bubbleChart);

  function bubbleChart($parse, store, Insights) {
    var directiveDefinitionObject = {
      restrict: 'E',
      replace: false,
      scope: {
        data: '=',
        width: '=',
        height: '='
      },
      link: function(scope, element, attrs) {
        function renderIt(data, width, height) {
          data = data.map(function(obj) {
            var result = {};
            result.label = Object.keys(obj)[0];
            result.r = obj[result.label] * 100;
            return result;
          });
          if (data.length > 18) {
            var cache = data.slice();
            console.log(cache, 'cache');
            cache.sort(function(a, b) {
              return a.r - b.r;
            });
            cache.splice(9, cache.length - 18);
            data = cache;
            console.log(cache.length, 'cache new length');
          }
          console.log(data[0], 'd3');
          var svgContainer = d3.select(element[0]);
          var width = width;
          var height = height;
          var svg = svgContainer.append("svg").attr('width', width).attr('height', height);
          svg.attr("class", "svgContainer");
          var posColorScale = d3.scale.linear().domain([0, 75, 100]).interpolate(d3.interpolateHcl).range([
            '#ffff66', 'green']);
          var negColorScale = d3.scale.linear().domain([0, 75, 100]).interpolate(d3.interpolateHcl).range([
            '#ff8080', '#5900b3']);
          var nodes = d3.values(data);
          var force = d3.layout.force() //build the layout
            .charge(-300) // node distance from eachother.
            .gravity(.05).size([width, height]) //specified earlier
            .nodes(nodes) //add nodes
            .on("tick", tick) //what to do
            .start();
          // add the nodes
          var node = svg.selectAll('.node').data(force.nodes()) //add
          var elemEnter = node.enter().append('g').attr("transform", function(d) {
            return "translate(" + d.x + ",80)"
          });
          /*Create the circle for each block */
          var circle = elemEnter.append("circle").attr('class', 'node').attr("r", function(d) {
              if (d.r > -20 && d.r < 20) {
                return 30;
              }
              return d.r > 0 ? d.r / 1.2 : Math.max((d.r * -1) / 1.2, 30);
            }).attr('fill', function(d) {
              if (d.r === 100) {
                return "#73C5E1";
              }
              if (d.r < 0) {
                console.log('negative', d.r * -1)
                return negColorScale(d.r * -1);
              }
              var colorScl = d.r * 1;
              console.log('positive', colorScl);
              return posColorScale(colorScl);
            })
            // .attr("fill", "lightblue");
            /* Create the text for each block */
          elemEnter.append("text").attr("text-anchor", "middle").text(function(d) {
            return d.label
          }).attr('dy', '0em');
          elemEnter.append("text").attr("text-anchor", "middle").text(function(d) {
            return ~~d.r + "%"
          }).attr('dy', '1.5em');

          function tick(e) {
            node.attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")";
            }).call(force.drag);
          }
        }
        scope.$on('newData', function(event, data) {
          d3.selectAll('svg').remove();
          renderIt(data.data, data.width, data.height);
          // console.log('watch is working');
        });
      }
    };
    return directiveDefinitionObject;
  };
})();
