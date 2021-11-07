function dblLinear(n) {
    const series = [1];

    const calc = x => ({
        y: 2 * x + 1,
        z: 3 * x + 1
    });

    const ascendingOrder = (a, b) => a - b;

    for (let idx = 0; idx <= n; idx++) {
        let x = series[idx];
        const { y, z } = calc(x);
        for (let v of [y, z]) {
            if (series.indexOf(v) < 0) {
                series.push(v);
                series.sort(ascendingOrder);
                series.splice(n+1);
            }
        }
    }
    return series[n];
}
