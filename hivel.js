const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(points, k) {
    let secret = 0;
    const selectedPoints = points.slice(0, k);
    
    for (let i = 0; i < selectedPoints.length; i++) {
        const [xi, yi] = selectedPoints[i];
        let li = yi;
        
        for (let j = 0; j < selectedPoints.length; j++) {
            if (i !== j) {
                const [xj, _] = selectedPoints[j];
                li *= (0 - xj) / (xi - xj);
            }
        }
        secret += li;
    }
    
    return Math.round(secret);
}

function solveTestCase(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const n = data.keys.n;
    const k = data.keys.k;
    
    const points = [];
    
    for (let i = 1; i <= n; i++) {
        if (data[i.toString()]) {
            const x = i;
            const y = decodeValue(data[i.toString()].base, data[i.toString()].value);
            points.push([x, y]);
        }
    }
    
    return lagrangeInterpolation(points, k);
}

console.log("Test Case 1:");
console.log(solveTestCase('testcase1.json'));

console.log("\nTest Case 2:");
console.log(solveTestCase('testcase2.json'));
