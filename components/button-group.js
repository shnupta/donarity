import { useState } from "react"
import styles from './button-group.module.css'

export default function ButtonGroup({ buttons, handler }) {
    const [clickedId, setClickedId] = useState(0);

    const handleClick = (event, id) => {
        setClickedId(id);
        handler(event.target.name);
    }

    return (
      <div>
        <div className={styles.buttonGroup}>
          {buttons.map((buttonLabel, i) => (
            <button 
              key={i} 
              name={buttonLabel} 
              onClick={(event) => handleClick(event, i)}
              className={i == clickedId ? styles.active : ""}
            >
              {buttonLabel} 
            </button>
          ))}
        </div>
      </div>
    )
}