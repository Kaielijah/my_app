var mongo_url = 'mongodb://localhost/myapp_db';

var mongoose = require('mongoose');
mongoose.Promises = global.Promise;
mongoose.connect(mongo_url);

var actorSchema = new mongoose.Schema ({
firstName:String,
lastName:String,
email:{
  type:String,
  unique:true,
  index:true,
},
age: Number,

website: {
  type: String,
  trim: true,
  get: function(url) {
    if (!url) return url; {

      if (url.indexOf('http://') !== 0 &&
        url.indexOf('https://') !== 0)
        {
        url = 'http://' + url;
      }
      return url;
    }
  }
},
created_at: {
  type: Date,
    default: Date.now
}
});


//register a virual attribues
actorSchema.virtual ('fullName').get(function(){
  return this.firstName + '' + this.lastName;

});
//register the getter
actorSchema.set('toJSON', {getters:true});

//register the Schema
var Actor = mongoose.model('Actor', actorSchema);
//make this available to our other files
module.exports = Actor;
