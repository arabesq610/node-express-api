let express = require('express');
let _ = require('lodash');
let app = express();
let port = 3000;
let dict = {
    items: [{
        id: 1
    }, { 
        id: 2
    }, {
        id: 3
    }]
};


function GetItemsHandler(req, res) {

    console.log(req.params);
    if (!req.params || !req.params.id) {
        res.json(dict.id);
        return;
    }
    let itemId = _.toNumber(req.params.id);
    console.log('itemId: ', itemId);

    let targetItem = _.find(dict.items, {id: itemId});

    console.log(targetItem);

    res.json(targetItem);
}

function PostItemsHandler(req, res) {
    let items = req.body.items;
    dict.items.push(items);
    res.send(items);
}

function GetDefaultHandler(req, res) {
    res.sendFile(__dirname + '/index.html', function (err) {
        if (err) { 
            res.status(500).send(res);
        }
    });
}

// endpoint request handlers
app.get('/', GetDefaultHandler);
app.get('/items/:id', GetItemsHandler);
app.post('/items', PostItemsHandler);
app.listen(port);
