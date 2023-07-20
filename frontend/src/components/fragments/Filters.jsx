import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Filters = ({ zones, cooperatives }) => {
  return (
    <Form>
      <div style={{ display: 'flex' }}>
        {/* Filter by zone */}
        <div style={{ marginRight: '20px' }}>
          <Form.Group controlId="zoneFilter">
          <Card.Title><Form.Label>Filtrer par zone :</Form.Label></Card.Title>
            <Form.Control as="select">
            {zones.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
            </Form.Control>
          </Form.Group>
        </div>

        {/* Filter by cooperative */}
        <div>
          <Form.Group controlId="cooperativeFilter">
          <Card.Title><Form.Label>Filtrer par coopérative :</Form.Label></Card.Title>
            <Form.Control as="select">
              {cooperatives.map((coop) => (
                <option key={coop} value={coop}>
                  {coop}
                </option>
              ))}
            
            </Form.Control>
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default Filters;
