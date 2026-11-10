const fs = require('fs');
const { execSync } = require('child_process');

const content = fs.readFileSync('index.html', 'utf8');

// Test ES module
const tag = '<script type="module">';
const start = content.indexOf(tag);
const end = content.indexOf('</script>', start);

if (start !== -1 && end !== -1) {
  const code = content.substring(start + tag.length, end);
  fs.writeFileSync('temp_check_module.mjs', code);
  try {
    execSync('node --check temp_check_module.mjs');
    console.log('PASS: ES module syntax verified with 0 errors.');
  } catch (err) {
    console.error('FAIL: ES module syntax error:', err.message);
    process.exit(1);
  } finally {
    if (fs.existsSync('temp_check_module.mjs')) fs.unlinkSync('temp_check_module.mjs');
  }
}

// Test other inline scripts
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
