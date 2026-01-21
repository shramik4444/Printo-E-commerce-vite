const bcrpyt = require('bcrypt');

bcrpyt.hash("gopi1234", 10).then(hash => {
    console.log(hash);
});