var express = require('express');
var router = express.Router();
var db = require('./dbconnect');

router.post('/create', function (req, res) {
    const { idParent, idNews, idUser, open, content } = req.body;
    var query = 'insert into answer (idParent, idNews, idUser, open, content, created_at) values (?, ?, ?, ?, ?, NOW())';
    var selectQuery = `select * from answer
                    inner join user on answer.idUser = user.id
                    where answer.id = last_insert_id()`;
    db.query(query,[idParent, idNews, idUser, open, content], function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        db.query(selectQuery, function (err, selectedResult) {
            if (err) res.status(500).send('Lỗi: ' + err);
            res.json(selectedResult[0]);
        });
    });
});

router.get('/getall/:id', function (req, res) {
    var query = `select user.id, user.username, user.image, answer.* from answer
                inner join user on answer.idUser = user.id where answer.idNews =
                ` + req.body.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.json(result);
    });
});

module.exports = router;