import { Form, Button} from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";


const SaveCancelButtons = () => {
  return (
    <Form.Group>
      <div style={{ margin: "auto auto" }}>
        <Button.Group>
          <Button as={Link} to={"/dashboard/prospects"}>
            Cancel
          </Button>
          <Button.Or />
          <Button color="teal" positive>
            Save
          </Button>
        </Button.Group>
      </div>
    </Form.Group>
  );
}


export default SaveCancelButtons;
