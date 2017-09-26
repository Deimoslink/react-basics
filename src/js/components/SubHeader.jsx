import React from 'react';

export class SubHeader extends React.Component {
    render() {
        return (
            <div className="sub-header">
                <div>
                    <span>8 movies found</span>
                </div>
                <div className="filter-panel">
                    <span>Sort by</span>
                    <button className="button button-simple">release date</button>
                    <button className="button button-simple active">rating</button>
                </div>
            </div>
        );
    }
}
