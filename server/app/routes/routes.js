module.exports = app => {
    const city = require("../controllers/city_controller.js");

    // Create a new City
    app.post("/city", city.create);

    // Bulk Create cities
    app.post("/city/bulkCreate", city.bulkCreate);

    // Retrieve all Cities
    app.get("/cities", city.findAll);

    // Retrieve a single City with cityId
    app.get("/city/:cityId", city.findOne);

    // Update a City with cityId
    app.put("/city/:cityId", city.update);

    // Delete a City with cityId
    app.delete("/city/:cityId", city.delete);

    // Create a new City
    app.delete("/city", city.deleteAll);
};