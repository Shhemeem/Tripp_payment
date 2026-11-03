const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

function findMatches(keyword) {
  console.log(`=== Matches for: ${keyword} ===`);
  lines.forEach((l, idx) => {
    if (l.toLowerCase().includes(keyword.toLowerCase())) {
      console.log(`${idx + 1}: ${l.slice(0, 110)}`);
    }
  });
}

findMatches('openPaymentModal');
findMatches('handlePayment');
findMatches('amount');
findMatches('paymentModal');
findMatches('registerStudent');
