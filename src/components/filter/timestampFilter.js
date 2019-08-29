export default function (timeStamp) {
  if(timeStamp == undefined){return;}
  let date = new Date(timeStamp*1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // month 是從 0 開始算起
  let day = date.getDate();
  let timeStr = `${year}/${month}/${day}`;
  return timeStr;
}