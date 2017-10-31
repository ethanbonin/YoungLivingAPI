import React, { Component } from "react";
import { Button, Header, Modal, Label } from "semantic-ui-react";
import FormDataModal from "./FormDataModal";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ProspectsPerson extends Component {
  constructor(props) {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.addNote = this.addNote.bind(this);
    this.togglePerson = this.togglePerson.bind(this);
  }

  addNote(_id, note) {
    this.props.addNote(_id, note);
  }

  togglePerson(_id, toggler, truthy) {
    this.props.togglePerson(_id, toggler, truthy);
  }

  closeModal() {
    this.props.popUp();
  }

  deletePerson() {
    this.props.deleteProspects(this.props.prospect._id);
    console.log("DELETING from prsoepctsPerson");
    this.props.prospectToDelete(this.props.prospect._id);
    this.closeModal();
    this.props.fetchProspects();
  }

  render() {
    const lead_colors = {
      cold: "black",
      warm: "orange",
      hot: "red"
    };

    return (
      <Modal dimmer open>
        <Modal.Header>
          {this.props.prospect.first} {this.props.prospect.last}
          <Label
            size={"large"}
            horizontal
            style={{ width: 100, marginLeft: "15px" }}
            color={lead_colors[this.props.prospect.lead]}
          >
            {this.props.prospect.lead.toUpperCase()}
          </Label>
          <Button
            style={{ float: "right" }}
            color="teal"
            onClick={this.closeModal}
          >
            Done
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Prospect Information</Header>
            <FormDataModal
              data={this.props.prospect}
              addNote={this.addNote}
              togglePerson={this.togglePerson}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <div className="left">
            <Button
              negative
              labelPosition="right"
              icon="warning"
              content="Delete"
              onClick={() => this.deletePerson()}
            />
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, actions)(ProspectsPerson);
