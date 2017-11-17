import React from 'react';
import { Link } from "react-router-dom";
import {Card, Image } from "semantic-ui-react";

import '../communicatorcss/communicator.css';

const TextCard = () => {
  return (
    <Card fluid style={{margin: 'auto'}} as={Link} to={`/dashboard/textcommunicator`}>
      <Image src={'https://images.unsplash.com/photo-1470350576089-539d5a852bf7?auto=format&fit=crop&w=3900&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'} />
      <Card.Content>
        <Card.Header>Text Communicator</Card.Header>
        <Card.Description>Need to send mass text messages to your downline or prospects?</Card.Description>
      </Card.Content>
    </Card>
  )
};

export default TextCard;
