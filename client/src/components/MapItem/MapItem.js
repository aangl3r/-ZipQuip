import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from "@material-ui/core/styles";

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

const styles = theme => ({
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 17,
    },
    pos: {
      marginBottom: 12,
    },
  });

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };
/* 
    componentWillReceiveProps(nextProps) {
        if (nextProps.users.length > this.props.users.length) {
            let zipcodes = nextProps.users.map(user => user.zip)
            zipcodes.forEach((code) => {
                fetch(`https:maps.googleapis.com/maps/api/geocode/json?address=${code}$key`)
                .then(data => data.json())
                .then(data => this.setState({
                    latLongs: [...this.state.latLongs, data.results[0].geometry.location]
                }))
            })
        }
    }
 */
    render() {
        const { center } = this.props
        return (
            <div>
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDnCD1LtlpL1LzYgLbFJt1U2dSi-NJuY84" }}
                        defaultCenter={
                            center
                        }
                        defaultZoom={this.props.zoom}
                    >
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleMap);

//AIzaSyDnCD1LtlpL1LzYgLbFJt1U2dSi-NJuY84