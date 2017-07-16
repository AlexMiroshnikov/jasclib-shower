import React, {Component} from 'react';
import Measure from 'react-measure';

import {
    Navigation,
    Input,
    TextOutput,
    ChartOutput,
} from '../';

import Research from '../../utils/Research';

const HEIGHT_OFFSET = 300;

export default class Prototype extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
            chartDimensions: {
                width: null,
                height: null,
            },
        };

        this.dimensions = {
            textAreaHeight: 0,
            chartAreaWidth: 0,
            chartAreaHeight: 0,
        };

        this.onSubmit = sanitizedInput => {
            let result = null;

            try {
                result = new Research(sanitizedInput);
            } catch (e) {
                window.alert(e);
            }

            this.setState({result});
        };

        this.onTextAreaMeasured = this.onTextAreaMeasured.bind(this);
        this.onChartAreaMeasured = this.onChartAreaMeasured.bind(this);
    }

    onTextAreaMeasured(dimensions) {
        this.dimensions.textAreaHeight = dimensions.height;
    }

    onChartAreaMeasured(dimensions) {
        this.dimensions.chartAreaWidth = dimensions.width;
        this.dimensions.chartAreaHeight = window.outerHeight - this.dimensions.textAreaHeight - HEIGHT_OFFSET;

        this.setState({
            chartDimensions: {
                width: this.dimensions.chartAreaWidth,
                height: this.dimensions.chartAreaHeight,
            },
        });
    }

    render() {
        const bsStyles = require('bootstrap/dist/css/bootstrap.min.css');
        const styles = require('./Prototype.sass');

        return (
            <div>
                <Navigation/>

                <div className="container">
                    <Measure onMeasure={this.onTextAreaMeasured}>
                        <div className="row">
                            <Input onSubmit={this.onSubmit}/>
                            <TextOutput result={this.state.result}/>
                        </div>
                    </Measure>
                    <Measure onMeasure={this.onChartAreaMeasured}>
                        <div className="row">
                            <ChartOutput result={this.state.result} chartDimensions={this.state.chartDimensions}/>
                        </div>
                    </Measure>
                </div>
            </div>
        );
    }
}
