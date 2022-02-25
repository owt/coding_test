import React from "react";
import SubmissionSubject from "./SubmissionSubject"

class Submission extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h5>{this.props.submission.year}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Acedemic papers: {this.props.submission.academic_papers}</li>
          <li className="list-group-item">Institution income: {this.props.submission.institution_income}</li>
          <li className="list-group-item">Staff: {this.props.submission.staff_total}</li>
          <li className="list-group-item">Students: {this.props.submission.students_total}</li>
          <li className="list-group-item">Postgraduates: {this.props.submission.postgraduates_total}</li>
        </ul>
        <div>
        <h4>Subjects</h4>
          {this.props.submission.subjects.map((subject) => {
            return <SubmissionSubject subject={subject} key={subject.id} />
          })}
        </div>

      </div>
    );
  }

}

export default Submission;