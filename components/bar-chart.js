import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: props.labels,
      datasets: [
        {
          label: 'Donations',
          backgroundColor: 'rgba(64,182,97, 0.8)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 0.1,
          data: props.data
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Bar
          data={this.state}
          options={{
            legend:{
              display:true,
              position:'right'
            },
          }}
          height={90}
        />
      </div>
    );
  }
}
