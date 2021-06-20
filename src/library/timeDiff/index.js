/**
 * calculate the time difference
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns {Error|string}
 * @constructor
 */
const TimeDiff = (startTime, endTime) => {
    startTime = new Date(startTime);

    endTime = endTime ? new Date(endTime) : new Date();

    const startTimeInMS = startTime.getTime();

    const endTimeInMS = endTime.getTime();

    if (!startTimeInMS) return new Error('Invalid start date');

    if (!endTimeInMS) return new Error('Invalid end date');

    /**
     * time difference in milliseconds
     * @type {number}
     */
    let timeDifference = endTimeInMS - startTimeInMS;

    timeDifference = timeDifference > 0 ? timeDifference : -timeDifference;

    /**
     * time difference in seconds
     * @type {number}
     */
    const secondsAgo = timeDifference / 1000;

    /**
     * time difference in minutes
     * @type {number}
     */
    const minutesAgo = secondsAgo / 60;

    /**
     * time difference in hours
     * @type {number}
     */
    const hoursAgo = minutesAgo / 60;

    /**
     * time difference in days
     * @type {number}
     */
    const daysAgo = hoursAgo / 24;

    /**
     * time difference in months
     * @type {number}
     */
    const monthsAgo = daysAgo / 30;

    /**
     * time difference in years
     * @type {number}
     */
    const yearsAgo = monthsAgo / 12;

    if (monthsAgo >= 12) {
        const year = Math.round(yearsAgo);
        return `${year}y`;
    } else if (daysAgo >= 30) {
        const month = Math.round(monthsAgo);
        return `${month}mo`;
    } else if (hoursAgo >= 24) {
        const day = Math.round(daysAgo);
        return `${day}d`;
    } else if (minutesAgo >= 60) {
        const hour = Math.round(hoursAgo);
        return `${hour}h`;
    } else if (secondsAgo >= 60) {
        const minute = Math.round(minutesAgo);
        return `${minute}m`;
    } else {
        const second = Math.round(secondsAgo);
        return `${second}s`;
    }
};

// window.timeDiff = TimeDiff;

export default TimeDiff;

// ((() => {
//     if (typeof define === 'function' && define.amd)
//         define('TimeDiff', () => TimeDiff);
//     else if (typeof module !== 'undefined' && module.exports)
//         module.exports = TimeDiff;
//     else
//         window.TimeDiff = TimeDiff;
// }))();
