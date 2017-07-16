import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class StyledChart extends Component {

    static instanceCounter = 0;

    static propTypes = {
        data: PropTypes.array.isRequired,
        valueExtractor: PropTypes.func,
        fillColor: PropTypes.string,
        chartId: PropTypes.string,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        noAxisX: PropTypes.bool,
    };

    static generateChartId = () => 'Chart-' + StyledChart.instanceCounter;

    static defaultProps = {
        data: [],
        valueExtractor: null,
        fillColor: '#6655AA',
        chartId: StyledChart.generateChartId(),
        noAxisX: false,
    };

    constructor(props) {
        super(props);

        this.init = () => {
            this.dataParams = {
                len: this.props.data.length,
                values: new Array(this.props.data.length),
                // multiplier: 100,    // @TODO Make dynamic
            };

            for (let i = 0; i < this.dataParams.len; i++) {
                this.dataParams.values[i] = (this.props.valueExtractor ? this.props.valueExtractor(this.props.data[i]) : this.props.data[i]);

                if (isNaN(this.dataParams.values[i])) {
                    throw new Error('Value must be numeric either valueExtractor(item) was not provided');
                }
            }

            this.dataParams.maxValue = d3.max(this.dataParams.values);
            this.dataParams.mean = d3.mean(this.dataParams.values);
            this.dataParams.median = d3.median(this.dataParams.values.slice().sort());
        };

        this.makeChart = () => {
            // return false;
            console.log('>>C.makeChart');

            const margin = {
                top: 12,
                right: 0,
                bottom: 24,
                left: 32,
            };

            const id = '#' + (this.props.chartId || StyledChart.generateChartId());
            d3.select(id).selectAll("*").remove();
            const width = this.props.width;
            const height = this.props.height;

            const space = 1;
            const barWidth = Math.max(1, Math.floor((width - this.dataParams.len * space) / this.dataParams.len));

            const calcHeight = val => ((height - margin.bottom) * (val / this.dataParams.maxValue));

            const svg = d3.select(id)
                .append('svg')
                .attr('width', width + 'px')
                .attr('height', height + 'px')
                .attr('transform', 'translate(0, 0)');

            svg.selectAll('rect.bar').data(this.dataParams.values).enter()
                .append('rect')
                .attr('width' , barWidth)
                .attr('height' , d => (calcHeight(d)))
                .attr('x' , (d, i) => (margin.left + i * (barWidth + space)))
                .attr('y' , (d, i) => (height - margin.bottom - (calcHeight(d)) + margin.top))
                .attr('fill', '#6655AA');

            const yScale = d3.scaleLinear()
                .domain([0, this.dataParams.len])
                .range([0, width]);

            const xScale = d3.scaleLinear()
                .domain([this.dataParams.maxValue, 0])
                .range([margin.top, height - margin.bottom + margin.top]);

            const xAxis = d3.axisLeft().scale(xScale);
            const yAxis = d3.axisTop().scale(yScale)
                .ticks(this.dataParams.len)
                .tickSize(0);

            svg.append('g')
                .style('font', '12px Arial')
                .attr('transform', 'translate('+margin.left+', 0)')
                .call(xAxis);

            !this.props.noAxisX && svg.append('g')
                .attr('transform', 'translate(-' + barWidth / 2 + ', ' + height + ')')
                .call(yAxis);
        };

        this.timeout = null;

        this.redraw = () => {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.init();
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                this.timeout = null;

                this.makeChart();
            }, 70);
        };

        StyledChart.instanceCounter++;
    }

    componentDidMount() {
        this.redraw();
    }

    componentDidUpdate() {
        this.redraw();
    }

    render() {
        return (
            <div id={this.props.chartId} style={{background: '#fafafa', border: 'solid 1px #cdcdcd'}}/>
        );
    }
}