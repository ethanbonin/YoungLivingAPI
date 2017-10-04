import React, { Component } from "react";
import { Button, Header, Modal} from "semantic-ui-react";
import FormDataModal from "./FormDataModal";

class ProspectsPerson extends Component {
  constructor(props) {
    super();
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.props.popUp();
  }

  render() {
    return (
      <Modal open>
        <Modal.Header>{this.props.prospect.first} {this.props.prospect.Bonin}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Prospect Information</Header>
            <FormDataModal data={this.props.prospect} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <div className="left">
            <Button negative labelPosition="right" icon="warning" content="Delete"/>
          </div>
          <Button negative onClick={this.closeModal}>Back</Button>
          <Button
            positive
            labelPosition="right"
            icon="checkmark"
            content="Save"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ProspectsPerson;
