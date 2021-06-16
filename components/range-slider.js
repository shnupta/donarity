import styles from './range-slider.module.css';
import Slider from '@material-ui/core/Slider';
import { moneyFormat } from '../lib/utils';

export default function RangeSlider({ className, min, max, value, onChange, logarithmic, step }) {

  return (
    <div className={styles.slider + (className ? " " + className : "")}>
      <Slider
        value={value}
        step={step}
        max={max}
        min={min}
        scale={(x) => logarithmic ? x ** logarithmic : x}
        onChange={(event, newVal) => onChange(newVal)}
        valueLabelDisplay="on"
        valueLabelFormat={(val) => moneyFormat(val, 0)}
        getAriaValueText={(val) => moneyFormat(val, 0)}
        classes={{
          rail: styles.rail,
          track: styles.track,
          valueLabel: styles.valueLabel,
          thumb: styles.thumb,
          root: styles.root,
          active: styles.active,
        }}
      />
    </div>
  )
}