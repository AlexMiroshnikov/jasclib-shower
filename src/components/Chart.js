import React, {Component} from 'react';
import * as d3 from 'd3';

export default class Chart extends Component {
    componentDidMount() {
        const width = 640;
        const height = 200;
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
    }

    render() {
        return <div id="chart" />;
    }
}