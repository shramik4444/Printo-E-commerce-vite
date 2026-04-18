const bcrypt = require('bcrypt');

bcrypt.hash("shramik1234", 10).then(hash => {
    console.log(hash);
});