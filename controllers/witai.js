"use strict"
var appConfig = require('../config');
var request = require('request');
var witAiAccessToken = appConfig.witAi.serverAccessToken;
exports.addValue = (req, res) => {
    let entitiId = req.body.entitiId;
    let data = {
        value: req.body.value,
        expressions: req.body.expressions,
        metadata: req.body.metadata
    }
    request({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + witAiAccessToken,
            'Content-Type': 'application/json',
        },
        url: 'https://api.wit.ai/entities/' + entitiId + '/values',
        form: JSON.stringify(data)
    }, (err, ress, body) => {
        if (ress.statusCode == 409 && data.expressions.length > 0) {
            data.expressions.forEach(e => {
                request({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + witAiAccessToken,
                        'Content-Type': 'application/json',
                    },
                    url: `https://api.wit.ai/entities/${entitiId}/values/${encodeURI(data.value)}/expressions`,
                    form: JSON.stringify({ expression: e })
                }, (err, ress, body) => {

                })
            })
        }
        res.json({ res: ress, body: body, err: err });
    })
}

exports.getAllValue = (req, res) => {
    let entitiId = req.params.id
    request({
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + witAiAccessToken,
            'Content-Type': 'application/json',
        },
        url: 'https://api.wit.ai/entities/' + entitiId
    }, (err, ress, body) => {
        res.json({ res: ress, body: JSON.parse(body), err: err });
    })
}

// exports.editValue = (req, res) => {
//     let entitiId = req.params.id;
//     let data = {
//         values: req.body.values
//     }
//     request({
//         method: 'PUT',
//         headers: {
//             'Authorization': 'Bearer ' + witAiAccessToken,
//             'Content-Type': 'application/json',
//         },
//         url: 'https://api.wit.ai/entities/' + entitiId,
//         form: JSON.stringify(data)
//     }, (err, ress, body) => {
//         res.json({ res: ress, body: body, err: err });
//     })
// }
exports.addExpression = (req, res) => {
    let entitiId = req.body.entitiId;
    let value = req.body.value;
    let data = {
        expression: req.body.expression
    }
    request({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + witAiAccessToken,
            'Content-Type': 'application/json',
        },
        url: `https://api.wit.ai/entities/${entitiId}/values/${encodeURI(value)}/expressions`,
        form: JSON.stringify(data)
    }, (err, ress, body) => {
        res.json({ res: ress, body: body, err: err });
    })
}
exports.delExpression = (req, res) => {
    let entitiId = req.body.entitiId;
    let value = req.body.value;
    let expression = req.body.expression;
    request({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + witAiAccessToken,
            'Content-Type': 'application/json',
        },
        url: `https://api.wit.ai/entities/${entitiId}/values/${encodeURI(value)}/expressions/${encodeURI(expression)}`
    }, (err, ress, body) => {
        res.json({ res: ress, body: body, err: err });
    })
}

exports.delValue = (req, res) => {
    let entitiId = req.body.entitiId;
    let value = req.body.value;
    request({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + witAiAccessToken,
            'Content-Type': 'application/json',
        },
        url: `https://api.wit.ai/entities/${entitiId}/values/${encodeURI(value)}`
    }, (err, ress, body) => {
        res.json({ res: ress, body: body, err: err });
    })
}

// exports.train = (req, res) => {
//     let text = req.body.text;
//     //let entitiId = req.body.entitiId;
//     let value = req.body.value;
//     let start = req.body.start;
//     let end = req.body.end;
//     let data = [{
//         text: text,
//         entities: [{
//             entity: "intent",
//             value: value,
//             //start: start,
//             //end: end
//         }]
//     }]
//     console.log(JSON.stringify(data))
//     request({
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer ' + witAiAccessToken,
//             'Content-Type': 'application/json',
//         },
//         url: `https://api.wit.ai/samples`,
//         form: JSON.stringify(data)
//     }, (err, ress, body) => {
//         res.json({ res: ress, body: body, err: err });
//     })
// }