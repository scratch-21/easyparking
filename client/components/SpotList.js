import React, { useState, useMemo, useEffect } from 'react';

const SpotList = (props) => {

    console.log('props.spots', props.spots)
    const spots = [];

    if(Array.isArray(props.spots)){
      props.spots.forEach((spot, index) => {
        const spotRow =  
          <tr key = {index}>
           <th scope="row">{index}</th>
            <td>button</td>
            <td>{spot.status}</td>
            <td>{spot.locationid}</td>
            <td>{spot['id_user']}</td>
            <td>{spot['expired_time']}</td>
          </tr>
          spots.push(spotRow)
        });
    }



  return (
    <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">View Details</th>
      <th scope="col">Status</th>
      <th scope="col">Location</th>
      <th scope="col">User ID</th>
      <th scope="col">Expiry Time</th>
    </tr>
  </thead>
  <tbody>
    {spots}
  </tbody>
</table>
  )

   
    
  return (
    <div>
      <div className={'headerRow'} >
        <label className = {'headingLabel'}>View Details</label>
        <label className = {'headingLabel'}>Status</label>
        <label className = {'headingLabel'}>Location</label>
        <label className = {'headingLabel'}>User</label>
        <label className = {'headingLabel'}>Expiry Time</label>
      </div>
      {spots}
      {/* {Array.isArray(props.spots)?
      (
        <div>
        {props.spots.forEach((spot, index) => {
            <div key = {index}>
              <label className = {'spotRowLabel'}> hello {spot.status}</label>
              <label className = {'spotRowLabel'}>{spot.locationid}</label>
              <label className = {'spotRowLabel'}>{spot['id_user']}</label>
              <label className = {'spotRowLabel'}>{spot['expired_time']}</label>
            </div>
          })
        }
        </div>
      )

      :(<div>Hello</div>)} */}
    </div>
  )

};


export default SpotList


      
// // availableSpots
// fetch('http://localhost:3000/spot/viewAvailableSpots')
// .then(response => response.json())
// .then(availableSpots => {
//   props.availableSpots = availableSpots
// })
// .catch(err => console.log('error in available spots', err));

