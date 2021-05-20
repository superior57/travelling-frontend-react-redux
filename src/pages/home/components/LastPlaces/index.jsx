import React from 'react';
import SliderBlock from '../../../../components/SliderBlock';

import './style.scss';

class LastPlaces extends React.PureComponent {
  render() {
    const { lastPlaces } = this.props;
    return (
      <div className="LastPlaces">
        <h1 className="LastPlaces__headline">Last venue listing in New York</h1>
        <div className="LastPlaces__sliders">
          {lastPlaces && <SliderBlock places={lastPlaces} />}
        </div>
      </div>
    );
  }
}

export default LastPlaces;
