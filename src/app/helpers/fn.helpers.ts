export const roundUp = (num: number, precision: number = 0) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
}

