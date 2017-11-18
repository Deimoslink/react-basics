import React from 'react';
import {Movie} from './Movie.jsx';

export class Results extends React.Component {

    chunkify(array, chunkSize) {
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    render() {
        let chunks = this.chunkify(this.props.results, 3);
        return (
            <div className="results">{chunks.map((chunk, j) =>
                <div className="movies-row" key={j}>
                    {chunk.map((el, i) => <Movie movie={el} key={j + '' + i}/>)}
                </div>)}
                <span hidden={this.props.results.length}>No results found</span>
            </div>
        );
    }
}

Results.propTypes = {
    results: React.PropTypes.array
};