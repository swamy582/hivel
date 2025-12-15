const fs = require('fs');

// Function to convert a number from any base to base 10
function baseToDecimal(value, base) {
    return parseInt(value, base);
}

// Lagrange Interpolation to find f(0) - the secret
function lagrangeInterpolation(points, k) {
    // We only need the first k points
    const selectedPoints = points.slice(0, k);
    
    let secret = 0;
    
    // Calculate f(0) using Lagrange interpolation
    for (let i = 0; i < selectedPoints.length; i++) {
        const [xi, yi] = selectedPoints[i];
        
        // Calculate the Lagrange basis polynomial L_i(0)
        let li = 1;
        for (let j = 0; j < selectedPoints.length; j++) {
            if (i !== j) {
                const [xj, _] = selectedPoints[j];
                // L_i(0) = product of (0 - xj) / (xi - xj) for all j != i
                li *= (0 - xj) / (xi - xj);
            }
        }
        
        // Add yi * L_i(0) to the result
        secret += yi * li;
    }
    
    return Math.round(secret);
}

// Main function to solve the secret
function findSecret(jsonData) {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    const n = data.keys.n;
    const k = data.keys.k;
    
    console.log(`n (total roots): ${n}`);
    console.log(`k (minimum roots needed): ${k}`);
    console.log(`Polynomial degree: ${k - 1}\n`);
    
    // Extract and decode all points
    const points = [];
    
    for (let i = 1; i <= n; i++) {
        if (data[i.toString()]) {
            const x = i;
            const base = parseInt(data[i.toString()].base);
            const value = data[i.toString()].value;
            const y = baseToDecimal(value, base);
            
            points.push([x, y]);
            console.log(`Point ${i}: x=${x}, y=${y} (decoded from base ${base}: "${value}")`);
        }
    }
    
    console.log(`\nTotal points available: ${points.length}`);
    console.log(`Using first ${k} points for interpolation\n`);
    
    // Find the secret using Lagrange interpolation
    const secret = lagrangeInterpolation(points, k);
    
    return secret;
}

// Test Case 1
console.log("=" .repeat(60));
console.log("TEST CASE 1");
console.log("=" .repeat(60));

const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

const secret1 = findSecret(testCase1);
console.log(`\n🔐 SECRET (constant term c): ${secret1}`);

// Test Case 2
console.log("\n" + "=".repeat(60));
console.log("TEST CASE 2");
console.log("=" .repeat(60));

const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d635"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

const secret2 = findSecret(testCase2);
console.log(`\n🔐 SECRET (constant term c): ${secret2}`);

console.log("\n" + "=".repeat(60));
console.log("SOLUTION SUMMARY");
console.log("=" .repeat(60));
console.log(`Test Case 1 Secret: ${secret1}`);
console.log(`Test Case 2 Secret: ${secret2}`);
console.log("=" .repeat(60));