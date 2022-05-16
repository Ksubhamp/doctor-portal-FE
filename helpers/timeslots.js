
const splitTime = (startTime, endTime, interval) => {
    if (!startTime || !endTime || !interval) {
        return false;
    }
    let time = startTime.add(interval, 'm');
    if (time.isBetween(startTime, endTime, undefined, []) == false) {
       return false
    }
    const result = [startTime.toString()];
    while (time.isBetween(startTime, endTime, undefined, [])) {
        result.push(time.toString());
        time = time.add(interval, 'm');
    }
    return result;
}


module.exports = splitTime;