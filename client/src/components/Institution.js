import React from "react";
import SubmissionList from "./SubmissionList";

class Institution extends React.Component {

    constructor(props) {
      super();
      this.state = { 
        showSubmissionList: false
      }

      this.toggleSubmissions = this.toggleSubmissions.bind(this);
    }

    render() {
      return (
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button onClick={this.toggleSubmissions} className={`accordion-button ${ this.state.showSubmissionList ? null : "collapsed"}`} type="button">
            {this.props.institution.name}, {this.props.institution.country}
            </button>
          </h2>
          
          <div id="collapseOne" className="accordion-collapse collapse show" >
            { this.state.showSubmissionList ? <SubmissionList institutionId={this.props.institution.id} /> : null }
          </div>
        </div>
      );
    }
    
    toggleSubmissions(event) {
      event.preventDefault();
      if(this.state.showSubmissionList) {
        this.setState({ showSubmissionList: false });
      } else {
        this.setState({ showSubmissionList: true });
      }
    }


}

export default Institution;