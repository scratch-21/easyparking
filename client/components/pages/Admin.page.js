import React, {useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';

import Menu from '../layout/Menu.layout'
import SpotList from '../SpotList';
import EasyGoogleMap from '../layout/GoogleMap.layout';

// check if the user is admin and logged in 
const AdminPage = (props) => {
  const {user, setUser} = useContext(AuthContext);
  const [pt_name, setPtName] = useState(1);
  const [pt_type_desc, setPtTypeDesc] = useState([]);
  const [pt_log, setPtLog] = useState([]);
  const [pt_lat, setPtLat] = useState([]);
  const [pt_loc_desc, setPtLocDesc] = useState([]);
	const [spots, setSpots] = useState([]);

  const history = useHistory();

  //UPDATE PT NAME STATE ON INPUT
  const handlePtNameChange = (event) => {
    setPtName(event.target.value);
  }
  //UPDATE PT DESC STATE ON INPUT
  const handlePtDescChange = (event) => {
    setPtTypeDesc(event.target.value);
  }
  //UPDATE PT LONGITUDE STATE ON INPUT
  const handlePtLogChange = (event) => {
    setPtLog(event.target.value);
  }
  //UPDATE PT LATITUDE STATE ON INPUT
  const handlePtLatChange = (event) => {
    setPtLat(event.target.value);
  }
  //UPDATE PT LOCATION DESCRIPTION STATE ON INPUT
  const handlePtLocDescChange = (event) => {
    setPtLocDesc(event.target.value);
  }
  
  const handleGetLog = (spot) => {
    console.log(spot);
    setPtLat(spot.x);
    setPtLog(spot.y);
  }

  const mapCheckIn = () => {

  }

  const showAllSpots = () => {
    fetch(`/spot/viewAllSpots`)
    .then(response => response.json())
    .then(spots => {
      console.log('Loading spots:' ,spots);
      setSpots(spots);
    });
  }

  //Check if user is admin, if not redirect to root.
  //TODO: Make admin check more secure. id_role is able to be edited in browser
  useEffect(() => {
    if (user[0].id_role !== 2) history.push('/');
    showAllSpots();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // Handle click event (Add Spot) => POST request
  const addSpotHandler = (e) => {
    const body = {
      pt_name,
      pt_type_desc,
      pt_log,
      pt_lat,
      pt_loc_desc
    }
    console.log('this is body', body);
    // Making a post request to store the spot information
    fetch('/spot/adminCreateSpot', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      showAllSpots();
    })
    .catch(err => console.log('Admin create spot err:', err))
    e.preventDefault();
  }

  // Handle click event (Delete Spot) => POST request
  const deleteSpotHandler = (e) => {

  }

  const handleClick = (spot) => {
    // e.preventDefault();
    console.log('handleClick event: ', spot)
    history.push({
      pathname:`/spot-detail`,
      state: { spot: spot } //Passes the spot inside location.state.item
    })
  };


  return (
    //Add HTML buttons, long, lat input here
      <div>
        <Menu/> 
        { user ? (
      <div>      
        <div className="container">
          <div className="dashboard-bar dashboard">Admin Dashboard</div>
          <div className="row search-item">
            <div className="col-3">
            </div>
            <div className="col-3">
              <form onSubmit={addSpotHandler}>
                <label>
                  {/* PARKING TYPE INPUT INFO */}
                  Parking Type Name:<br />
                  <input type="select" name="name"></input>
                  <input type="text" name="name" onChange={handlePtNameChange}></input>
                </label>
                <label>
                  Parking Type Description:<br />
                  <input type="text" name="description" onChange={handlePtDescChange}></input>
                </label>
                <label>
                  {/* LOCATION INPUT INFO */}
                  Longitude:<br />
                  <input type="text" name="log" onChange={handlePtLogChange} value={pt_log}></input>
                </label>
                <label>
                  Latitude:<br />
                  <input type="text" name="lat" onChange={handlePtLatChange} value={pt_lat}></input>
                </label>
                <label>
                  Location Description:<br />
                  <input type="text" name="description" onChange={handlePtLocDescChange}></input>   
                </label>
                {/* <input type="submit" className="btn btn-primary" href="#" role="button" onClick={addSpotHandler}>Add Spot</input> */}
                <input type="submit" value="SUBMIT" /> 
              </form>  
              <a className="btn btn-primary" href="#" role="button" onClick={deleteSpotHandler}>Delete Spot</a>             
            </div>
            <div className="col-2">
              <EasyGoogleMap spots={[]} getSpotInfo={mapCheckIn} getMapLocation={handleGetLog} admin={true}/>
            </div>
            <div className="col-4">
            </div>
          </div>
          <div className="dashboard-main dashboard">
          <SpotList spots={spots} onClick={handleClick}></SpotList>
            

          
          </div>
        </div>
      </div>
      ) :
      (<div>loading...</div>)
      }
      
      </div>
  );
}
// make this a react component

// export default this component
export default AdminPage