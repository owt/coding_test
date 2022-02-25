import React from "react";
import axios from "axios";
import Submission from "./Submission";
import IncomeChart from "./IncomeChart";

class SubmissionList extends React.Component {

  constructor(props) {
    super();
    this.state = {
      submissions: [],
      chartData: [],
    }

    this.processChartData = this.processChartData.bind(this);  
  }

  render() {
    return (
        <div className="accordion-body">
          <div className="container">
            <div className="row align-items-start">
              <div className="col">
                <p><strong>Submissions</strong></p>
                {this.state.submissions.map((submission) => {
                  return <Submission submission={submission} key={submission.id} />
                })}
              </div>
              <div className="col">
                <p><strong>Income</strong></p>
                <IncomeChart chartData={this.state.chartData} />
              </div>
            </div>
          </div>
        </div>
    );
  }

  componentDidMount() {
    // Load submission info
    axios.get(`${process.env.REACT_APP_API_URL}/submissions/for-institution/${this.props.institutionId}`)
    .then((response) => {
      this.setState({ submissions: response.data.submissions });
      this.processChartData();
    })
    .catch(() => { 
      // Display an error
    });
  }

  processChartData() {
    let chartData = [];

    chartData = this.state.submissions.map((submission) => {
      return {
        year: submission.year,
        income: submission.institution_income,
        amt: submission.institution_income
      }
    })  

    this.setState({chartData: chartData});
  }
}

export default SubmissionList;