import React, {Component} from 'react';
import PropTypes from 'prop-types';

const DEFAULT_DECIMAL_ROUND = 3;

export default class TextOutput extends Component {

    static propTypes = {
        result: PropTypes.shape({
            mean: PropTypes.func.isRequired,
            deviation: PropTypes.func.isRequired,
            median: PropTypes.func.isRequired,
            max: PropTypes.func.isRequired,
            min: PropTypes.func.isRequired,
        }),
        decimalRound: PropTypes.number,
    };

    static defaultProps = {
        decimalRound: DEFAULT_DECIMAL_ROUND,
    };

    constructor(props) {
        super(props);

        const roundVal = Math.pow(10, this.props.decimalRound);
        this.round = val => Math.round(val * roundVal) / roundVal;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.result && !this.props.result) {
            return false;
        }

        return true;
    }

    render() {
        const styles = require('./TextOutput.sass');
        const {result} = this.props;


        return (
            <div className="col">
                <h3>Output</h3>
                <div className="row output">
                    {result ?
                        [
                        <div key="mean" className="col-xs-6 col-sm-6 col-md-3">
                            <dt>mean</dt>
                            <dd>{this.round(result.mean())} <small>&plusmn; {this.round(result.deviation())}</small></dd>
                        </div>,
                        <div key="median" className="col-xs-6 col-sm-6 col-md-2">
                            <dt>median</dt>
                            <dd className="output-median">{this.round(result.median())}</dd>
                        </div>,
                        <div key="min-max" className="col output-bounds">
                            <dt>min / max</dt>
                            <dd><span className="output-bounds-min">{result.min()}</span> / <span className="output-bounds-max">{result.max()}</span></dd>
                        </div>,
                        ]
                        :
                        <div className="alert alert-warning">Nothing to output</div>
                    }
                </div>
            </div>
        );
    }
}
