import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextOutput extends Component {

    static propTypes = {
        result: PropTypes.shape({
            mean: PropTypes.func.isRequired,
            deviation: PropTypes.func.isRequired,
            median: PropTypes.func.isRequired,
            max: PropTypes.func.isRequired,
            min: PropTypes.func.isRequired,
        }).isRequired,
    };

    shouldComponentUpdate(nextState, nextProps) {
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
                            <dd>{result.mean()} <small>&plusmn; {result.deviation()}</small></dd>
                        </div>,
                        <div key="median" className="col-xs-6 col-sm-6 col-md-2">
                            <dt>median</dt>
                            <dd className="output-median">{result.median()}</dd>
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
