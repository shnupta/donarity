import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['British Red Cross', 'Dog\'s Trust', 'Malala Fund',
           'Save The Children'],
  datasets: [
    {
      label: 'Donations',
      backgroundColor: 'rgba(64,182,97, 0.8)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10, 25, 20, 4, 30]
    }
  ]
}

export default class BarChart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
