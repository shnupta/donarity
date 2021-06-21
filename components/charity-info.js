import styles from './charity-info.module.css';
import { moneyFormat } from '../lib/utils';

export default function CharityInfo({ charity }) {

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img src="/location.svg" />
        <div>
          <h3>Location</h3>
          <p>{charity.city.name + ", " + charity.city.country.name}</p>
        </div>
      </div>
      <div className={styles.item}>
        <img src="/expenses.svg" />
        <div>
          <h3>Size (Total Expenses)</h3>
          <p>{"£" + moneyFormat(charity.size, 0)}</p>
        </div>
      </div>
      <div className={styles.item}>
        <img src="/scope.svg" />
        <div>
          <h3>Scope</h3>
          <p>{charity.scope}</p>
        </div>
      </div>
    </div>
  )
}