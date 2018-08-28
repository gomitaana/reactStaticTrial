import React, { Component } from 'react'
import { withSiteData } from 'react-static'
import autobind from 'autobind-decorator'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap,GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  	withProps({
	    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDiD0F938wQsEBgJpT9EyswQbuq-iloRXE&libraries=geometry,drawing,places",
	    loadingElement: <div className="loadingElement" />,
	    containerElement: <div className="containerElement" />,
	    mapElement: <div className="mapElement" />,
	  }),
	  withScriptjs,
	  withGoogleMap
	)((props) =>
	  <GoogleMap
	    defaultZoom={8}
	    center={{ lat: props.latitude, lng: props.longitude }}
	  >
	    {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} />}
	  </GoogleMap>
	)

export default withSiteData(() => (
    	<Map />
))

export class Map extends Component {
	state = {
		latitude: 0, 
		longitude: 0,
	}

	constructor(props) {
		super(props);

		this.getPoint = this.getPoint.bind(this);
	}

	componentDidMount(){
		if (navigator.geolocation) {
			const getLocation = navigator.geolocation.getCurrentPosition(this.getPoint);		}
	}

	getPoint(position) {
		this.setState({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	}

	render(){
		return (
			<MyMapComponent 
			isMarkerShown 
			latitude = {this.state.latitude} 
			longitude = {this.state.longitude} 
			/>
			);
	}
}
