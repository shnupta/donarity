import styles from './scope-selector.module.css';
import CheckBox from './checkbox';
import { connectRefinementList } from 'react-instantsearch-dom';

function MyScopeSelector({ className, items, refine }) {

  return (
    <div className={styles.tile + (className ? " " + className : "")}>
      <h2>Scope</h2>
      <div className={styles.scopes}>
        {items.map((item, key) => (
          <CheckBox className={styles.checkbox} key={key} name={item.label} checked={item.isRefined} onClick={event => {event.preventDefault(); refine(item.value);}} />
        ))}
      </div>
    </div>
  )
}

const ScopeSelector = connectRefinementList(MyScopeSelector);
export default ScopeSelector;