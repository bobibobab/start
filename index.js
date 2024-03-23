const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const DB = require('./database.js');
const port = process.argv.length > 2 ? process.argv[2] : 3000;

const authCookieName = 'token';

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

let total = {};
let user = {};
let data = {};
let datas = [];

var apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.post('/auth/create', async (req, res) => {
    if(await DB.getUser(req.body.username)){
        res.status(409).send({msg: 'Existing user'});
    } else{
        const user = await DB.createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);

    if(user){
        if (await bcrypt.compare(req.body.password, user.password)){
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

apiRouter.get('/userinfo/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);

    if(user){
        const token = req?.cookies.token;
        res.send({ username: req.params.username, authenticated: token == user.token});
        return;
    }
    res.status(404).send({msg: 'Unknown'});
});

apiRouter.post('/comsumption', async (req, res) => {
    const comsumption = req.body;
    await DB.addComsumption(comsumption);
    res.send(comsumption);
});

apiRouter.get('/datas', async (req, res) => {
    const datas = await DB.getComsupmtions();
    res.send(datas);
});

//submit total
apiRouter.post('/total/:username', async (req, res) => {
    
    const total = await DB.getTotal(req.params.username);
    if(total){
        total["total"] = addingTotal(total["total"], req.body.total);
        const filter = {
            _id: total._id,
            rank: total.rank,
            username: total.username
        }
        const updateDocument = {
            $set: {
                total: total["total"]
            }
        }
        await DB.updateTotal(filter, updateDocument);
    }else{
        await DB.addTotal(req.body);
    }
    res.send();
});

function addingTotal(preTotal, newTotal){
    preTotal += newTotal;
    return preTotal;
}

//get total
apiRouter.get('/totals', async (_req, res) => {
    const totals = await DB.getTotals();
    res.send(totals);
});


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
