const express = require('express');
const app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/api', require('./controller.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Server started on port ${PORT}`);
});