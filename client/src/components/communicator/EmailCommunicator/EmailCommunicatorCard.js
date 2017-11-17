import React from 'react';
import { Link } from "react-router-dom";
import {Card, Image } from "semantic-ui-react";

const EmailCard = () => {
  return (
    <Card fluid size="large" style={{margin: "auto", marginTop: "5em"}} as={Link} to={`/dashboard/emailcommunicator`}>
      <Image src={'https://images.unsplash.com/photo-1485119584289-30ca2b38c67e?auto=format&fit=crop&w=3900&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'} />
      <Card.Content>
        <Card.Header>Email Communicator</Card.Header>
        <Card.Description>Send Mass Emails to your Downline or Prospects</Card.Description>
      </Card.Content>
    </Card>
  )
};

export default EmailCard;
