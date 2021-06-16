import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class DoughnutChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: props.labels,
            datasets: [
              {
                label: '# of Votes',
                data: props.data,
                backgroundColor: props.colors,
              },
            ],
          };
    }

    render() {
        return (
            <div style={{maxWidth:"320px", maxHeight:"350px", margin:"0 auto"}}>
                <Doughnut 
                    data={this.state}
                />
            </div>
        )
    }
}
