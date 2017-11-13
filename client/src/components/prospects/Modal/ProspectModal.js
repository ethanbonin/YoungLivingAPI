import React, { Component } from "react";
import { Button, Header, Modal, Label } from "semantic-ui-react";
import FormDataModal from "./FormDataModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LabelsModal from "./LabelsModal";


import * as actions from "../../../actions";

class ProspectModal extends Component {
  constructor(props) {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.addNote = this.addNote.bind(this);
    this.togglePerson = this.togglePerson.bind(this);

    let labels = []
    if (props.labels.prospectslabels !== undefined){
      labels = props.labels.prospectslabels[0].labels;
    }


    this.state = {
      labelsChosen: props.prospect.labels,
      masterList: labels
    }
  }

  componentWillMount() {

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
    this.props.prospectToDelete(this.props.prospect._id);
    this.closeModal();
  }

  render() {
    const lead_colors = {
      cold: "black",
      warm: "orange",
      hot: "red"
    };
    let address = { address1: "", address2: "", city: "", state: "", zip: "" }
    if (this.props.prospect.address !== undefined){
      address = this.props.prospect.address;
    }

    return (
      <Modal dimmer open size="fullscreen">
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
          <LabelsModal labelsChosen={this.state.labelsChosen} masterList={this.state.masterList}/>
          <Button
            style={{ float: "right" }}
            color="teal"
            onClick={this.closeModal}
          >
            Done
          </Button>
          <Button
            style={{ float: "right" }}
            color="red"
            as={Link}
            to={{
              pathname: "/dashboard/prospects/new",
              state: {
                _id: this.props.prospect._id,
                first: this.props.prospect.first,
                last: this.props.prospect.last,
                met_date: this.props.prospect.met_date,
                email: this.props.prospect.email,
                phone: this.props.prospect.phone,
                invite_to_class: this.props.prospect.invite_to_class,
                add_facebook_group: this.props.prospect.add_facebook_group,
                texting_marketing: this.props.prospect.texting_marketing,
                emailed: this.props.prospect.emailed,
                host_a_class: this.props.prospect.host_a_class,
                know_them: this.props.prospect.know_them,
                lead: this.props.prospect.lead,
                health_needs: this.props.prospect.health_needs,
                family: this.props.prospect.family,
                labels: this.props.prospect.labels,
                occupation: this.props.prospect.occupation,
                recreation: this.props.prospect.recreation,
                additional_notes: this.props.prospect.additional_notes,
                closedDeal: this.props.prospect.closedDeal,
                editingProspect: true,
                address: address,
                masterList: this.state.masterList
              }
            }}

          >
            Edit Prospect
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

function mapStateToProps({ labels }) {
  return { labels };
}


export default connect(mapStateToProps, actions)(ProspectModal);
