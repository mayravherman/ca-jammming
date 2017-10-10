import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction() {
    this.props.isRemoval ? '-' : '+';
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>TRACK NAME</h3>
          <p>TRACK ARTIST | TRACK ALBUM</p>
        </div>
        <a className="Track-action">{this.renderAction}</a>
      </div>
    );
  }
}

export default Track;
