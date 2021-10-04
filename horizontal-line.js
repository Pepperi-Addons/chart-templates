define(['exports'], function (exports) {
    'use strict';

    // some JSDoc comments for IDE intellisense

    /**
     * @typedef Configuration A configuration object supplied to the chart by the embedder
     * @type {object}
     * @property {string} label The label of the chart
     */

    /**
     * @typedef ChartData A data object supplied to the chart by the embedder containing the chart data
     * @type {object}
     * @property {string[]} series The chart data groups
     * @property {string[]} groups The chart data series
     * @property {object[]} values The chart data values
     */

    /**
    * This is the class the chart-manager will use to render the chart
    */
    class MyChart {

        /**
         * The chart constructor.
         * 
         * @param {HTMLElement} element The embedder supplies this HTMLElement which can be used to render UI
         * @param {Configuration} configuration a JSON object that holds the chart specific configuration
         */
        constructor(element, configuration) {
            /**
             * The embedder of this chart will insert the chart data to this property
             * @type {ChartData}
             */
            this.data = {};

            // In this template we will use a chart.js Chart to render a chart

            // first we create a canvas on the HTML element
            element.innerHTML = this.getHTML();

            // retrieve the canvas element from the element
            const canvas = element.querySelector('canvas');

            // create a chart.js configuration using the label from the configuration
			var conf = this.getChartJSConfiguration('bar', configuration.label);

            // create a chart.js Chart element with the canvas and configuration
			this.chart = new Chart(canvas, conf);
        }

        /**
         * This function must be implemented by the chart
         * the embedder calls if when there are changes to the chart data
         */
        update() {
            // multiple group by values - show them in the x-axis
			if (this.data.groups.length > 0) {  
				this.chart.data = {
					datasets: this.data.groups.map(group => {
                        return this.data.series.map(series => {
                            return this.getGroupedDataSet(series, group, series);
                        })
                    }).flat()
				}
			
			} else { 
                // no group by, show the series in the x-axis
                this.chart.data = {
					datasets: [
                        this.getDataSet()
                    ],
                    labels: this.data.series
				}			
			}
	
			// update the chart.js chart
			this.chart.update();
        }

        getRandomColor() {
            return `${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}`;
        }

        getChartJSConfiguration(type, label) {
            return {
				type: type,
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					},
					plugins: {
						title: {
							display: true,
							text: label
						},
					}
				}			
			};
        }

        getGroupedDataSet(label, xAxisKey, yAxisKey) {
            const color = this.getRandomColor();
            return {						
                label: label,
                data: this.data.values,
                borderColor: 'rgb('+color+')',
                backgroundColor: 'rgba('+color+', 0.2)',
                borderWidth: 1,
                parsing: {
                    yAxisKey: yAxisKey,
                    xAxisKey: xAxisKey
                }
            }
        }

        getDataSet() {
            const colors = this.data.series.map(series => this.getRandomColor());
            return {						
                data: this.data.series.map(series => {
                    return this.data.values[0][series];
                }),
                borderColor: colors.map(color => `rgb(${color})`),
                backgroundColor: colors.map(color => `rgba(${color}, 0.2)`),
                borderWidth: 1
            }
        }

        getHTML() {
            return `<div style="border:1px solid #000000;">
                <canvas></canvas>
                </div>`;
        }
    }

    const deps = [
        'https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js'
    ];

    exports['default'] = MyChart;
    exports.deps = deps;

    Object.defineProperty(exports, '__esModule', { value: true });

});