export function parseDate(date) {
  let re = /(\d+)-(\d+)-(\d+)T(\d+):(\d+).*/i;
  let groups = date.match(re);
  return {
    day: groups[3],
    month: groups[2],
    year: groups[1],
    hour: groups[4],
    minute: groups[5],
  }
}

export function moneyFormat(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "bn" },
    { value: 1e12, symbol: "tn" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}