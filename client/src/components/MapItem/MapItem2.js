import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: "200pt",
  height: "200pt",
  position: "static",
  marginTop: "20pt"
};

const container = {

}

export class MapContainer extends Component {
  render() {
    return (
      <div className={container}>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{
            lat: 43.07572,
            lng: -70.76075,
          }}>

          <Marker onClick={this.onMarkerClick}
            name={'Current location'} />

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDnCD1LtlpL1LzYgLbFJt1U2dSi-NJuY84")
})(MapContainer)