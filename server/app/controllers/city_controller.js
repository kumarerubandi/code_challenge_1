const City = require("../models/city_model.js");


fomatDate =(date)=>{
    let date_items = date.split(/\//);
    let formated_date = [date_items[2],date_items[0],date_items[1]].join("/")
    console.log(formated_date);
    return formated_date;
}
// Create and Save a new City
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        }
    
    let city = {...req.body};
    // Create a City
    if(city.hasOwnProperty("start_date")){
        city.start_date = fomatDate(city.start_date)
    }
    if(city.hasOwnProperty("end_date")){
        city.end_date = fomatDate( city.end_date);

    }

    // Save City in the database
    City.create(city, (err, data) => {
        if (err)
            res.status(500).send({
                message:err.message || "Some error occurred while creating city."
            });
        else 
            res.send(data)
    });

};



// Create and Save a multiple cities
exports.bulkCreate = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        }
    let post_data = [...req.body];
    let responses = []
    post_data.forEach(city => { 
        // Create a City
        if(city.hasOwnProperty("start_date")){
            city.start_date = fomatDate(city.start_date)
        }
        if(city.hasOwnProperty("end_date")){
            city.end_date = fomatDate( city.end_date);
    
        }
    
        // Save City in the database
        City.create(city, (err, data) => {
           
        });
    }); 
    res.send({"Message":"done"})
   
};

// Retrieve all Cities from the database.
exports.findAll = (req, res) => {
    City.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cities."
        });
      else res.send(data);
    });
};


// Find a single City with a cityId
exports.findOne = (req, res) => {
    City.findById(req.params.cityId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with id ${req.params.cityId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving City with id " + req.params.cityId
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a City identified by the cityId in the request
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    let city = {...req.body}
    if(city.hasOwnProperty("start_date")){
        city.start_date = fomatDate(city.start_date)
    }
    if(city.hasOwnProperty("end_date")){
        city.end_date = fomatDate( city.end_date);

    }
    console.log(city);
    City.updateById(
      req.params.cityId,
      new City(city),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found City with id ${req.params.cityId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating City with id " + req.params.cityId
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a City with the specified cityId in the request
  exports.delete = (req, res) => {
    City.remove(req.params.cityId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with id ${req.params.cityId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete City with id " + req.params.cityId
          });
        }
      } else res.send({ message: `City was deleted successfully!` });
    });
  };
  
  // Delete all Cities from the database.
  exports.deleteAll = (req, res) => {
    City.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cities."
        });
      else res.send({ message: `All Cities were deleted successfully!` });
    });
  };