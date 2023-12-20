let express = require('express');
let path = require('path');
let pug = require("pug");
let app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

let ip = require("ip");
//console.dir ( ip.address() );
let ipaddress=ip.address();

app.get('/', (req, res) => {
    res.render('index', { ipaddress });
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});