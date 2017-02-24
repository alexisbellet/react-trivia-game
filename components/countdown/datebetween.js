let DateBetween = function(startDate, endDate) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let distance = endDate - startDate;
  if (distance < 0) {
    return 0;
  }
  let seconds = Math.floor((distance % minute) / second);
  var sec_description;
  if(seconds == 1) {
    sec_description = ' second';
  } else {
    sec_description = ' seconds';
  }
  let between = seconds + sec_description;
  return between;
}
module.exports = DateBetween;