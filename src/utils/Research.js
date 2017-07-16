import {
    max as d3Max,
    min as d3Min,
    mean as d3Mean,
    deviation as d3Deviation,
    median as d3Median,
} from 'd3';

import ResearchError from './ResearchError';

export default function (input = [], options = []) {
    if (options.valueExtractor && typeof options.valueExtractor !== 'function') {
        throw new ResearchError('valueExtractor must be a function');
    }

    const dataParams = {
        len: input.length,
        values: new Array(input.length),
    };

    for (let i = 0; i < dataParams.len; i++) {
        dataParams.values[i] = (options.valueExtractor ? options.valueExtractor(input[i]) : input[i]);

        if (isNaN(dataParams.values[i])) {
            throw new ResearchError('Value must be numeric either valueExtractor(item) was not provided');
        }
    }

    dataParams.maxValue = d3Max(dataParams.values);
    dataParams.minValue = d3Min(dataParams.values);
    dataParams.mean = d3Mean(dataParams.values);
    dataParams.deviation = d3Deviation(dataParams.values);
    dataParams.median = d3Median(dataParams.values.slice().sort());

    this.max = () => dataParams.maxValue;
    this.min = () => dataParams.minValue;
    this.mean = () => dataParams.mean;
    this.deviation = () => dataParams.deviation;
    this.median = () => dataParams.median;

    this.data = () => dataParams.values;
    this.len = () => dataParams.len;
}
