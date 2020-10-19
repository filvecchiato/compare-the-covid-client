import React, { useState, useEffect } from 'react';
import "./index.style.scss";
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
// import { userSearchDataVar } from '../../apolloclient/makevar'
// import { useReactiveVar } from '@apollo/client';
type Location = {
  name: string;
  latitude: number;
  longitude: number;
  location_id: number | string;
};

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  name?: string;
  savedLocations?: Location[];
  markerSelectedAction: (e: any) => any;
}

const GoogleMap = (props: GoogleMapProps): JSX.Element => {

  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    setCenter({
      lat: props.latitude,
      lng: props.longitude,
    });
  }, []);
  
  // https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng

  const googleMapKey = 'AIzaSyBnQCOZ8iMqtqBFAqpF7w-YdlaOBfeD3lA'
  const mapClick = (mapProps: any) => {
    console.log(mapProps)
  }

  const createMapOptions = (maps: any) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      zoomControl: false,
      styles: [{ stylers: [{ 'saturation': 0 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }
  const markers = props.savedLocations?.map(item => {
    return (
      <MapMarker
        key={item.location_id}
        lat={item.latitude}
        lng={item.longitude}
        text={item.name}
        onClick={props.markerSelectedAction(item)}
      />
    );
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: String(googleMapKey) }}
        center={center}
        defaultZoom={zoom}
        onClick={mapClick}
      >
        <MapMarker
          lat={center.lat}
          lng={center.lng}
          text='Current location'
        />
        {markers}
      </GoogleMapReact>
    </div>
  );
};


export default GoogleMap;
