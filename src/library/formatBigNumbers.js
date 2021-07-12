export const formatBigNumbers = number =>
    parseInt(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
