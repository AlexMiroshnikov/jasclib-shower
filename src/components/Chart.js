import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class Chart extends Component {

    static instanceCounter = 0;

    static propTypes = {
        data: PropTypes.array.isRequired,
        valueExtractor: PropTypes.func,
        fillColor: PropTypes.string,
        chartId: PropTypes.string,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    };

    static generateChartId = () => 'Chart-' + Chart.instanceCounter;

    static defaultProps = {
        data: [],
        valueExtractor: null,
        fillColor: '#6655AA',
        chartId: Chart.generateChartId(),
    };

    constructor(props) {
        super(props);

        this.dataParams = {
            len: this.props.data.length,
            values: new Array(this.props.data.length),
            multiplier: 100,    // @TODO Make dynamic
        };

        for (let i = 0; i < this.dataParams.len; i++) {
            this.dataParams.values[i] = (this.props.valueExtractor ? this.props.valueExtractor(this.props.data[i]) : this.props.data[i]);

            if (isNaN(this.dataParams.values[i])) {
                throw new Error('Value must be numeric either valueExtractor(item) was not provided');
            }
        }

        this.dataParams.maxValue = d3.max(this.dataParams.values);

        this.makeChart = () => {
            console.log('>>C.makeChart');
            const id = '#' + (this.props.chartId || Chart.generateChartId());
            console.log('id', id);
            d3.select(id).selectAll("*").remove();

            const space = 1;
            const barWidth = Math.floor((this.props.width - this.dataParams.len * space) / this.dataParams.len);

            const calcHeight = val => {
                // console.log('val', val);
                // console.log(this.props.height + '*'+ this.dataParams.multiplier +'*'+ '('+val+' / ' +this.dataParams.maxValue+')');
                //const res = this.props.height * this.dataParams.multiplier * (val / this.dataParams.maxValue);
                const res = this.props.height * 1 * (val / this.dataParams.maxValue);
                // console.log('res', res);
                return res;
            };

            const svg = d3.select(id)
                .append('svg')
                .attr('width', this.props.width + 'px')
                .attr('height', this.props.height + 'px');

            svg.selectAll('rect.bar').data(this.dataParams.values).enter()
                .append('rect')
                .attr('width' , barWidth)
                .attr('height' , calcHeight)
                .attr('x' , (d, i) => i * (barWidth + space))
                .attr('y' , (d, i) => (this.props.height - calcHeight(d)))
                .attr('fill', '#6655AA');

            const yScale = d3.scaleLinear()
                .domain([0, this.dataParams.len])
                .range([0, this.props.width]);

            const xScale = d3.scaleLinear()
                .domain([this.dataParams.maxValue, 0])
                .range([0, this.props.height]);

            const xAxis = d3.axisRight().scale(xScale);
            const yAxis = d3.axisTop().scale(yScale).ticks(this.dataParams.len);

            svg.append('g').attr('transform', 'translate(0, 0)').call(xAxis);
            svg.append('g').attr('transform', 'translate(-' + barWidth / 2 + ', ' + this.props.height + ')').call(yAxis);
        };

        Chart.instanceCounter++;
    }

    componentDidMount() {
        console.log('>C.didMount');
        return this.makeChart();
        /*
        const width = 640;
        const height = this.props.height || 200;
        const len = this.props.data.length;
        const space = 1;
        const barWidth = Math.floor((width - len * space) / len);
        const mY = 100;
        const maxY = d3.max(this.props.data, function(d) { return Math.round(mY * d.time); });
        const calcHeight = val => height * mY * (val / maxY);

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px');

        svg.selectAll('rect.bar').data(this.props.data).enter()
            .append('rect')
            .attr('width' , barWidth)
            .attr('height' , function(d) { return calcHeight(d.time)})
            .attr('x' , function (d, i) { return i * (barWidth + space) })
            .attr('y' , function (d, i) { return height - calcHeight(d.time);})
            .attr('fill', '#6655AA');

        const yScale = d3.scaleLinear()
            .domain( [0, len])
            .range( [0, width]);

        const xScale = d3.scaleLinear()
            .domain([maxY, 0])
            .range([0, height]);

        const xAxis = d3.axisRight().scale(xScale);
        const yAxis = d3.axisTop().scale(yScale).ticks(len);

        svg.append('g').attr('transform', 'translate(0, 0)').call(xAxis);
        svg.append('g').attr('transform', 'translate(-'+barWidth / 2+', '+height+')').call(yAxis);
        //*/
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('>C.shouldComponentUpdate');
        //*
        console.log(nextProps);
        console.log(this.props);
        //*/
        // return false;

        if (this.props.width !== nextProps.width) {
            return true;
        }

        if (this.props.height <= nextProps.height) {
            return false;
        }

        return true;
    }

    componentDidUpdate() {
        this.makeChart();
    }

    render() {
        console.log('C.render');
        console.log(this.props);
        return <div id={this.props.chartId} />;
    }
}