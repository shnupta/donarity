import styles from './stats-tile.module.css';
import BarChart from './bar-chart';
import DoughnutChart from './doughnut-chart';

export default function StatsTile({labels, data, bar, title}) {

    const content = () => {
        if (bar === true) {
            return (<BarChart labels={labels} data={data}/>)
        } else {
            let colors = []
            for(let i=0;i<data.length;i++){
                colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
          }
            return (<DoughnutChart labels={labels} data={data} colors={colors}/>)
        }
    }

    return(
        <div className={styles.tile}>
            <h3>{title}</h3>
            <div className={styles.content}>
                {content()}
            </div>
        </div>
    )
}