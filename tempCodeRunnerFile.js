if(err) return console.log(err);
      
    collection.find().toArray(function(err, results){
                 
        console.log(results);
        client.close();
    });