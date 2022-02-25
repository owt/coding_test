import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

class IncomeChart extends React.Component {

  constructor(props) {
      super();
  }

  render() {
    return(
      <div>
        <LineChart
          width={500}
          height={300}
          data={this.props.chartData}
          margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    )
  }

}

export default IncomeChart