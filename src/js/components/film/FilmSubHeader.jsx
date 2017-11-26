import React from 'react';
import {connect} from 'react-redux';

class FilmSubHeader extends React.Component {
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
