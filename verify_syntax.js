const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const scripts = content.match(/<script[\s\S]*?<\/script>/gi) || [];

let errors = 0;
scripts.forEach((s, idx) => {
  if (!s.includes('type="module"') && !s.includes('src=')) {
    const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      new Function(code);
      console.log('Script', idx, 'valid syntax.');
    } catch (e) {
      errors++;
      console.error('Script', idx, 'Syntax Error:', e.message);
    }
  }
});

if (errors === 0) {
  console.log('All inline scripts verified successfully!');
}

