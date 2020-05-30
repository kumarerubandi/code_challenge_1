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
    
    let post_data = {...req.body};
    // Create a City
    let response = createCity(post_data);
    if(response.type == "error"){
        res.status(500).send({
            message:response.value.message || "Some error occurred while creating city."
        });
    }
    else if(res.type == "data"){
        res.send(response.value)
    }
    
};

createCity = (city)=>{
    if(city.hasOwnProperty("start_date")){
        city.start_date = fomatDate(city.start_date)
    }
    if(city.hasOwnProperty("end_date")){
        city.end_date = fomatDate( city.end_date);

    }

    // Save City in the database
    City.create(city, (err, data) => {
        if (err)
            return {type:"error","value":err}
        else 
            return {type:"data","value":data}
    });
}


// Create and Save a multiple cities
exports.bulkCreate = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        }
    let post_data = [...req.body];
    let responses = []
    post_data.forEach(element => { 
        console.log("element",element)
        let response = createCity(element);
        console.log(response)
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


// Find a single City with a customerId
exports.findOne = (req, res) => {
  
};

// Update a City identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a City with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Cities from the database.
exports.deleteAll = (req, res) => {
  
};