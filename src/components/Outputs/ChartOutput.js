import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StyledChart from "../StyledChart";

export default class ChartOutput extends Component {

    static propTypes = {
        result: PropTypes.shape({
            data: PropTypes.func.isRequired,
        }),
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.result && !this.props.result) {
            return false;
        }

        return true;
    }

    render() {
        const {result} = this.props;
        const data = result && result.data() || null;

        return (
            <div className="col">
                <h3>Chart representation</h3>
                {result ?
                    <StyledChart
                        data={data}
                        height={480}
                        width={640}
                        noAxisX={true}
                    />
                    :
                    <div className="alert alert-warning">Nothing to display</div>
                }
            </div>
        );
    }
}
