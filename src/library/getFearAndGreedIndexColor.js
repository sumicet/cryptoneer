export const getFearAndGreedIndexColor = value =>
    value < 26
        ? 'red'
        : value < 47
        ? 'orange'
        : value < 55
        ? 'white'
        : value < 76
        ? '#B1FB17'
        : 'lime';
