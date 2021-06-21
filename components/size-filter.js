import RangeSlider from './range-slider';
import styles from './size-filter.module.css';
import { connectRange } from 'react-instantsearch-dom';

const Filter = ({ min, max, currentRefinement, refine, className }) => {

  const logScale = 7;
  const maxValue = val => {
    return Math.min(max, val);
  }
  const minValue = val => {
    return Math.max(min, val);
  }

  return (
    <div className={styles.tile + (className ? " " + className : "")}>
      <h2>Size</h2>
      <RangeSlider
        className={styles.slider}
        step={0.1}
        logarithmic={logScale}
        min={min ** (1/logScale)}
        max={max ** (1/logScale)}
        value={[currentRefinement.min ** (1/logScale), currentRefinement.max ** (1/logScale)]}
        onChange={( newVal ) => {
          refine({ min: minValue(newVal[0] ** logScale), max: maxValue(newVal[1] ** logScale),});
        }}
      />
    </div>
  )
}

const SizeFilter = connectRange(Filter);
export default SizeFilter;