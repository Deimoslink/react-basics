import React from 'react';

export class FilmSubHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sortBy: 'rating' };

    }

    render() {
        return (
            <div className="sub-header">
                <div>
                    <span>Movies by Nolan</span>
                </div>
            </div>
        );
    }
}
