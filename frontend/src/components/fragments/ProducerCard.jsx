import React from 'react';
import Card from 'react-bootstrap/Card';

const ProducerCard = ({ numberOfProducers }) => {
  return (
    <Card bg="light" text="dark">
      <Card.Body>
        <Card.Title>Nombre de producteurs</Card.Title>
        <Card.Text>{numberOfProducers}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProducerCard;
