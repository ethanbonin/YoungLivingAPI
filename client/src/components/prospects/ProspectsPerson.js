import React, { Component } from "react";
import { Button, Header, Modal} from "semantic-ui-react";
import FormDataModal from "./FormDataModal";
import { connect } from "react-redux";
import * as actions from "../../actions";


class ProspectsPerson extends Component {
  constructor(props) {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }

  closeModal(){
    this.props.popUp();
  }

  deletePerson(){
    this.props.deleteProspects(this.props.prospect._id);
    this.props.fetchProspects();
    this.closeModal();
  }

  render() {
    return (
      <Modal dimmer open>
        <Modal.Header>{this.props.prospect.first} {this.props.prospect.Bonin}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Prospect Information</Header>
            <FormDataModal data={this.props.prospect} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <div className="left">
            <Button negative labelPosition="right" icon="warning" content="Delete" onClick={()=>this.deletePerson()}/>
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

export default  connect(null, actions)(ProspectsPerson);
