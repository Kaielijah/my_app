var Movie = require('./app/models/movie');
var Actor = require('./app/models/actor');

var bodyParser = require('body-parser')
//require express module
var express = require('express');

//run express
var app = express();

//set up the port
var port = 5000;
app.set('port',port);


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Let's set the routes to list all the movie
app.route('/actors')
  .get(function(req,res,next){
    Actor.find().exec(function(err, actors){
      console.log(actors);
      res.json(actors);
    })
  })
  .post(function(req,res){
    var new_actors = new Actor(req.body);
    console.log(req.body);

    new_actors.save(function(err){
      if(err)return next(err);
      res.json(new_actors);

    })
  })
//list all the movies
app.route('/movies')
    .get(function(req,res,next){
      Movie.find().exec(function(err,movies){
        console.log(movies);
        res.json(movies);
      })
    })

    .post(function(req,res){

      var new_movie = new Movie(req.body);
      console.log(req.body);

      new_movie.save(function(err){
        if(err)return next(err);

        res.json(new_movie);
      })

    })
app.route('/actors/:actor_id')
  .get(function(req,res,next){
    var actor_id = req.params.actor_id;
    res.send('actor_id is' + actor_id);

    Actor.findOne({
      _id:id
    },function(err,actor){
      if(err) return next (err);
      res.json(actor);
    })
  })

  .put(function(req,res){
    console.log(req);

    var actor_id = req.params.actor_id;


    Actor.findByIdAndUpdate(actor_id,req.body,function(err,body){
      if(err, body){
        if (err) return next(err);
        res.json(actor);
      }



    });


res.send('update actor by actor id')
  })
// app.set('port', (process.env.PORT|| 5000));

app.listen(app.get('port'),function(){
  console.log('Server is runnning on localhost' + app.get('port'));

});
module.exports = app;
