import React from 'react';
import {Movie} from './Movie.jsx';

export class Results extends React.Component {
    results = ['Interstellar', 'Alien', 'Chappie', 'Lord of the Rings', 'It', 'The Thing', 'Predator', 'A Walk to Remember'];

    chunkify(array, chunkSize) {
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    chunks = this.chunkify(this.results, 3);

    render() {
        console.log(this.chunks);
        return (
            <div className="results">{this.chunks.map(chunk =>
                <div className="movies-row">
                    {chunk.map(el => <Movie title={el}/>)}
                </div>)}
            </div>
        );
    }
}
