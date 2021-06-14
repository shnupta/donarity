import styles from './stats-tile.module.css';
import BarChart from './bar-chart';

export default function StatsTile({total}) {

    const content = () => {
        if (total === true) {
            return (<div><h1>Total donations:</h1><h1>£100</h1></div>)
        } else {
            return (<BarChart/>)
        }
    }

    return(
        <div className={styles.tile}>
            <div className={styles.content}>
                { content() }
            </div>
        </div>
    )
}