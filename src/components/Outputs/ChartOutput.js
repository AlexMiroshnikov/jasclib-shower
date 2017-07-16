import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StyledChart from "../StyledChart";

export default class ChartOutput extends Component {

    static propTypes = {
        result: PropTypes.shape({
            data: PropTypes.func.isRequired,
        }),
        chartDimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
    };

    constructor(props) {
        super(props);

        this.height = null;
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.result && !this.props.result) {
            return false;
        }

        return true;
    }

    componentWillReceiveProps(props) {
        if (this.height === null && props.result) {
            this.height = props.chartDimensions.height; // @TODO Make height more dynamic
        }
    }

    render() {
        const {result} = this.props;
        const data = result && result.data() || null;

        return (
            <div className="col mt">
                <h3>Chart representation</h3>
                {result ?
                    <StyledChart
                        data={data}
                        height={this.height}
                        width={this.props.chartDimensions.width}
                        noAxisX={true}
                    />
                    :
                    <div className="alert alert-warning">Nothing to display</div>
                }
            </div>
        );
    }
}
