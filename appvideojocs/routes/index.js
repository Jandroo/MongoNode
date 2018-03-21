var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017";

router.get('/', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJocs");

	  db.collection('jocs').find({}).toArray(function (findErr, result) {
		if (findErr) throw findErr;
	    client.close();

	    res.render('jocs/mostrarTodos', { jocs: result});
	  	});
 	});
});


//Crear
router.get('/jocs/crear', function(req, res, next) {
  res.render('jocs/crear', { title: 'Express', id: req.params.id});
});

router.post('/jocs/crear', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJocs");
	  var myobj = {titulo: req.body.titulo, año: req.body.any, plataforma: req.body.plataforma};
	  db.collection("jocs").insertOne(myobj, function(err, result) {
	    if (err) throw err;
	    client.close();
  		res.redirect('/jocs');
	  });
	});
});

//Editar
router.get('/jocs/editar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('videoJocs');
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  db.collection('jocs').findOne({"_id" : o_id}, function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
	    res.render('jocs/editar', {jocs: result});
	  });
	});
});

router.post('/jocs/editar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJocs");

	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  var myquery = { _id: o_id };
	  var newvalues = { $set: {titulo: req.body.titulo, año: req.body.any, plataforma: req.body.plataforma} };
	  db.collection("jocs").updateOne(myquery, newvalues, function(findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
  		res.redirect('/jocs/ver/' + req.params.id);
	  });
	});
});

//Borrar
router.get('/jocs/borrar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJocs");

	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  var myquery = { _id: o_id };

	  db.collection("jocs").deleteOne(myquery, function(err, obj) {
	    if (err) throw err;
	    client.close();
  		res.redirect('/jocs');
	  });
	});
});


//Mostrar Todos
router.get('/jocs', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('videoJocs');

	  db.collection('jocs').find({}).toArray(function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();

	    res.render('jocs/mostrarTodos', { jocs: result});
	    
	  });

	});
  
});

//Mostrar
router.get('/jocs/ver/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('videoJocs');
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  db.collection('jocs').findOne({"_id" : o_id}, function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
	    res.render('jocs/mostrar', {jocs: result});
	  });
	});
  
});

module.exports = router;