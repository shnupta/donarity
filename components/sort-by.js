import styles from './sort-by.module.css';
import { connectSortBy } from 'react-instantsearch-dom';

const MySortBy = ({ className, items, refine, createURL }) => {
  return (
    <div className={styles.tile + (className ? " " + className : "")}>
      <select onChange={event => {event.preventDefault; refine(event.currentTarget.value)}}>
        <option value={items[0].value}>Sort By:</option>
        {items.map(item => 
          <option key={item.value} value={item.value} >{item.label}</option>
        )}
      </select>
    </div>
  )
}

const SortBy = connectSortBy(MySortBy);
export default SortBy;