const fs = require('fs');

fs.writeFileSync('notes.txt', 'This is my first note.');
console.log('Note written to notes.txt');

fs.appendFileSync('notes.txt', '\nThis is my second note.');
console.log('Note appended to notes.txt');