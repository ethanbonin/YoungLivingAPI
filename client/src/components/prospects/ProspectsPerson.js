import React, { Component } from "react";
import { Button, Header, Modal, Label} from "semantic-ui-react";
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
    const lead_colors = {
      cold: "black",
      warm: "orange",
      hot: "red"
    }

    return (
      <Modal dimmer open>
        <Modal.Header>
          {this.props.prospect.first} {this.props.prospect.last}
          <Label size={"large"} horizontal style={{width: 100, marginLeft: "15px"}} color={lead_colors[this.props.prospect.lead]}>
            {this.props.prospect.lead.toUpperCase()}
          </Label>
        </Modal.Header>
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
          <Button onClick={this.closeModal}>Done</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, actions)(ProspectsPerson);
