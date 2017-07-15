import React, {Component} from 'react';
import * as d3 from 'd3';

export default class Chart extends Component {
    componentDidMount() {
        console.log(this.props.data);

        const width = 640;
        const height = 200;
        const len = this.props.data.length;
        const space = 1;
        const barWidth = Math.floor((width - len * space) / len);

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px');

        svg.selectAll('rect.bar').data(this.props.data).enter()
            .append('rect')
            .attr('width' , barWidth)
            .attr('height' , function (d, i) { return Math.round(100 * d.time); })
            .attr('x' , function (d, i) { return i * (barWidth + space) })
            .attr('y' , function (d, i) { return height - Math.round(100 * d.time); })
            .attr('fill', '#6655AA')
            // .exit();

        const yScale = d3.scaleLinear()
            .domain( [0, len])
            .range( [0, width]);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(this.props.data, function(d) { return d.time; })])
            .range([0, height]);

        const xAxis = d3.axisRight().scale(xScale);
        const yAxis = d3.axisBottom().scale(yScale).ticks(3);

        svg.append('g').attr('transform', 'translate(0, '+height*0+')').call(xAxis);
        svg.append('g').call(yAxis);
    }

    render() {
        return <div id="chart" />;
    }
}

/*
 svg.selectAll('rect.bar').data(this.props.data).enter()
 .append('rect')
 .attr('width' , function (d, i) { return Math.floor(width / len) })
 .attr('height' , function (d, i) { return Math.round(100 * d.time); })
 .attr('x' , function (d, i) { return i * (20 + 1) })
 .attr('y' , function (d, i) { return height - Math.round(100 * d.time); })
 .attr('fill', '#6655AA')
 // .exit();
 //*/