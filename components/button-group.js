import { useState } from "react"
import styles from './button-group.module.css'

export default function ButtonGroup({ buttons, handler, className, active }) {
    const [clickedId, setClickedId] = useState(0);

    const handleClick = (event, id) => {
        setClickedId(id);
        handler(event.target.name);
    }

    return (
      <div className={styles.buttonGroup + (className ? " " + className : "")}>
        {buttons.map((buttonLabel, i) => (
          <button 
            key={i} 
            name={buttonLabel} 
            onClick={(event) => handleClick(event, i)}
            className={(i == clickedId && active) ? styles.active : ""}
          >
            {buttonLabel} 
          </button>
        ))}
      </div>
    )
}