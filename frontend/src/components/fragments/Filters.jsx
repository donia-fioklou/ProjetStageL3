import React, { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import UploadFile from '../pages/Charts/HandleFileUpload';


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
    <Form>
      <div style={{ display: 'flex' }}>
        {/* Filter by zone */}
        <div style={{ marginRight: '20px' }}>
          <Form.Group controlId="zoneFilter">
          <Card.Title><Form.Label>Filtrer par zone </Form.Label></Card.Title>
            <Form.Control as="select" value={zone} onChange={handleZoneChange}>
            <option value="">-- Sélectionnez une Zone --</option>
            {zones.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
            </Form.Control>
          </Form.Group>

        </div>

        {/* Filter by cooperative */}
        <div style={{ marginRight: '20px' }}>
          <Form.Group controlId="cooperativeFilter">
          <Card.Title><Form.Label>Filtrer par coopérative </Form.Label></Card.Title>
            <Form.Control as="select" value={cooperative} onChange={handleCooperativeChange}>
            <option value="">-- Sélectionnez une coopérative --</option>
              {cooperatives.map((coop) => (
                <option key={coop} value={coop}>
                  {coop}
                </option>
              ))}
            
            </Form.Control>
          </Form.Group>
        </div>
        {/* Filter by cooperative */}
        <div>
          <Form.Group controlId="nouveauFichier">
          <Card.Title><Form.Label>Nouveau Fichier </Form.Label></Card.Title>
            <UploadFile/>
          </Form.Group>
        </div>
        
      </div>
    </Form>
  );
};

export default Filters;
