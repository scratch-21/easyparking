import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '600px'
};

const defaultCenter = {
  lat: 36.863950,
        lng: -75.981910
}



function EasyGoogleMap(props) {
  const [ selected, setSelected ] = useState({});
  //Load state with available parking spots in component did mount or get locations by props
  const locations = [
    {
      name: "Location 1",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      name: "Location 2",
      location: { 
        lat: 36.8633,
        lng: -75.9799
      },
    },
    {
      name: "Location 3",
      location: { 
        lat: 36.8616,
        lng: -75.9796
      },
    },
    {
      name: "Location 4",
      location: { 
        lat: 36.8550,
        lng: -75.9778
      },
    },
    {
      name: "Location 5",
      location: { 
        lat: 36.863950,
        lng: -75.981910
      },
    }
  ];
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })
  const [map, setMap] = React.useState(null)

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const markerClickHandler = (spot) => {
    setSelected(spot);
  }

  const dbClick = (e) => {
    if (props.admin) {
      return props.getMapLocation(e.Va);
    }
  }
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={16}
        onRightClick={(e)=>dbClick(e)}
      >
        { 
        locations.map(item => {
          return (
          <Marker key={item.name} position={item.location} onClick={()=>markerClickHandler(item)}/>
          )
        })
        }
         {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
              <p>{selected.name}</p>
                <button onClick={()=>props.getSpotInfo(selected)}>Click me!!!</button> 
              </div>
              
            </InfoWindow>
            )
         }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(EasyGoogleMap)
