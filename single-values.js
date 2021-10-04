define(["exports"], function (exports) {
    "use strict";
  
      Object.defineProperty(exports, "__esModule", {
      value: true
    });
  
      class MyChart {
          chart;
          constructor(element, configuration) {
              this.chart = element;	
          }
          
              // set the data to the chart
          update(data) {
              // create ui object
              let content = '<div _ngcontent-sgu-c156 class="rows ng-star-inserted"><div _ngcontent-sgu-c156 class="content row">';
              for (let i=0; i<this.data.series.length; i++) {
                  content += '<div _ngcontent-sgu-c156 class="info-chart chart-background"><p _ngcontent-sgu-c156 class="desc color-dimmed">' + this.data.series[i] + '</p><p _ngcontent-sgu-c156 class="value bold">' + this.data.values[0][this.data.series[i]] + '</p></div>';
              };
              content += '</div></div>';
              this.chart.innerHTML = content;
          }
      }
      const deps = [];
  
      exports.default = MyChart;
      exports.deps = deps;
  
  });