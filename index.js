const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

let total = {};
let user = {};
let data = {};
let datas = [];

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/login', async (req, res) => {
    user = req.body;
    res.send("Posting the user");
});

apiRouter.get('/userinfo', async (req, res) => {
    res.send(user);
});

apiRouter.post('/comsumption', async (req, res) => {
    data = req.body;
    datas.push(data);
    res.send("Updated Data");
});

apiRouter.get('/datas', async (req, res) => {
    res.send(datas);
});

//submit total
apiRouter.post('/total', async (req, res) => {
    total = req.body;
    total["total"] = addingTotal(req.body.total);
    res.send("Updated Total");
});


let totalprice = 0;
function addingTotal( newTotal){
    totalprice += newTotal;
    return totalprice;
}
//get total
apiRouter.get('/totals', async (_req, res) => {
    res.json(total);
});



//submit comsumption
// apiRouter.post();

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
