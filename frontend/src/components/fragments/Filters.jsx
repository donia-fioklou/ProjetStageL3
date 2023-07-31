import React, { useEffect,useState } from 'react';

const Filters = ({zone,cooperative, upadateZone,updateCooperative}) => {
  const [listeZoneCooperative, setListeZoneCooperative] = useState({});
  

  
  useEffect(()=>{
     // Fetch the list of zones
     fetch('http://127.0.0.1:8000/api/filter-zone-cooperative/')
     .then((response) => response.json())
     .then((data) => {
       // Assuming the API returns an array of zones as 'zones' field
       setListeZoneCooperative(data);
       //console.log(data);
     })
     .catch((error) => {
       console.error('Error fetching zones:', error);
     });

  },[]
  )
  var zones=Object.keys(listeZoneCooperative);
  console.log(zones);
  var cooperatives=[]
  if(zone ===''){
    //litste de tout les coopératives
    
    const values = Object.values(listeZoneCooperative);

    // Step 2: Flatten the array of values into a single array
    const flattenedArray = values.flat();

    // Step 3: Remove duplicate elements from the flattened array
     cooperatives = [...new Set(flattenedArray)];
  }
  else{
    cooperatives=listeZoneCooperative[zone];
  }
 
 

  const handleZoneChange = (event) => {
    upadateZone(event.target.value);
  };

  const handleCooperativeChange = (event) => {
    updateCooperative(event.target.value);
  };

  return (
    <div>
      <div >
        <select id="zone" value={zone} onChange={handleZoneChange} className="form-control" style={{ marginBottom: '10px' }}>
          <option value="">Zones</option>
          {zones.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    <div>
      <select id="cooperative" value={cooperative} onChange={handleCooperativeChange} className="form-control" >
        <option value="">Coopératives</option>
        {cooperatives.map((coop, index) => (
          <option key={index} value={coop}>
            {coop}
          </option>
        ))}
      </select>
    </div>
  </div>

   
  );
};
// const selectContainerStyle = {
//   marginBottom: '10px',
// };

// const selectStyle = {
//   padding: '4px', 
//   fontSize: '12px', 
//   width: '100%',
// };

export default Filters;
