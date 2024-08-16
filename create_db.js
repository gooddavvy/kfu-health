let fs = require('fs');

fs.writeFile('user_info.json', '{}', err => {
    if (err) throw err;
    console.log('Users\' info file has been created');
});
