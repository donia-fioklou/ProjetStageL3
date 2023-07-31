import React from 'react';
import Card from 'react-bootstrap/Card';


const NumberCard = ({ title, number,color}) => {
  return (
      <div>
      <Card bg={color} text="white">
      <Card.Body>
        <Card.Title className="font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{number}</Card.Title>
        <Card.Text className="font-weight-bold font-size-sm">{title}</Card.Text>
      </Card.Body>
    </Card>
    </div>
    
  );
};

export default NumberCard;
