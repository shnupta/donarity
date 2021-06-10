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