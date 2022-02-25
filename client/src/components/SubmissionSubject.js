import React from "react";

class SubmissionSubject extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h5>{this.props.subject.name}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Academic papers: {this.props.subject.academic_papers}</li>
          <li className="list-group-item">Students: {this.props.subject.students_total}</li>
          <li className="list-group-item">Student rating: {this.props.subject.student_rating}</li>
        </ul>
      </div>
    );
  }

}

export default SubmissionSubject;