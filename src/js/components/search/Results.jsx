import React from 'react';
import {Movie} from './Movie.jsx';

import {connect} from 'react-redux';
import {getSortedResults} from '../../selectors'

export class Results extends React.Component {

    chunkify(array, chunkSize) {
        if (!array) {
            return [];
        }
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    render() {
        console.log('rerender results', this.props.results);
        let chunks = this.chunkify(this.props.results, 3);
        return (
            <div className="results">{chunks.map((chunk, j) =>
                <div className="movies-row" key={j}>
                    {chunk.map((el, i) => <Movie movie={el} key={j + '' + i}/>)}
                </div>)}
                <span hidden={this.props.results}>No results found</span>
            </div>
        );
    }
}

export default connect(
    state => ({
        results: getSortedResults(state)
    })
)(Results)
