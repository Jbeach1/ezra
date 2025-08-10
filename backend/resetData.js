const fs = require('fs');
const path = require('path');

const files = ['organizations.json', 'locations.json', 'groups.json', 'members.json'];
const dataDir = path.join(__dirname, 'data');
const backupDir = path.join(__dirname, 'backup');

files.forEach(file => {
  fs.copyFileSync(path.join(backupDir, file), path.join(dataDir, file));
});

console.log('Data reset to backup state.');
