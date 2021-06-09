import styles from './charity-info.module.css'

export default function CharityInfo({ charity }) {

  const nFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

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
          <p>{"£" + nFormatter(charity.size, 0)}</p>
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