import React from 'react';

export class FilmSubHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sub-header">
                <div>
                    <span>Movies by {this.props.director}</span>
                </div>
            </div>
        );
    }
}

FilmSubHeader.propTypes = {
    director: React.PropTypes.string
};