import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "semantic-ui-react";
import _ from "lodash";
import * as actions from "../../../actions";


class SendEmailModal extends Component {
  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.sendEmails = this.sendEmails.bind(this);
    this.state = { option: 0};
  }

  closeModal() {
    this.props.emailModal();
  }


  sendEmails() {
    if (this.state.option === 0){
      const listOfProspects = this.props.prospects.prospects;
      let list = _.map(listOfProspects, ({email}) => {
        return email;
      })

      list = _.compact(list);
      list = list.toString();
      let win = window.open(`mailto:?bcc=${list}`);
      win.close()
    }

    if (this.state.option === 1){
      const listOfProspects = this.props.prospects.prospects;
      let list = _.map(listOfProspects, ({email, emailed}) => {
        if (emailed === false || emailed === undefined){
          return email;
        }
      })
       list = _.compact(list);
       list = list.toString();
       let win = window.open(`mailto:?bcc=${list}`);
       win.close()
    }

    this.props.emailModal();
  }

  render() {
    return (
      <div>
        <Modal open>
          <Modal.Header>Choose who you want to email</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>You can only choose one of the options.</p>
            </Modal.Description>
            <p>
              <input
                name="group1"
                type="radio"
                id="test1"
                onChange={() => this.setState({option: 0})}
              />
              <label htmlFor="test1">Email Everybody</label>
            </p>
            <p>
              <input
                name="group1"
                type="radio"
                id="test2"
                onChange={() => this.setState({option: 1})}
              />
              <label htmlFor="test2">People you haven't Emailed</label>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.closeModal}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Send Emails"
              onClick={this.sendEmails}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ prospects }) {
  return { prospects };
}

export default connect(mapStateToProps, actions)(SendEmailModal);
