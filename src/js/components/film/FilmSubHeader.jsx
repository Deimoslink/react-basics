import React from 'react';
import {connect} from 'react-redux';

export class FilmSubHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sub-header">
                <div>
                    <span>Movies by {this.props.director ? this.props.director.name : 'N/A'}</span>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        director: state.director
    })
)(FilmSubHeader)
