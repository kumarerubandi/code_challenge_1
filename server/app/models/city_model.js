const sql = require("./db.js");

// constructor
const City = function(city,bulk=false) {
  this.id = city.id
  this.city = city.city
  this.start_date = city.start_date
  this.end_date = city.end_date
  this.price = city.price
  this.status = city.status
  this.color = city.color
};

City.create = (newCity, result) => {
  sql.query("INSERT INTO cities SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created city: ", { id: res.insertId, ...newCity });
    result(null, { id: res.insertId, ...newCity });
  });
};

City.bulkCreate = (cities, result) => {
    sql.query("INSERT INTO cities ( city , start_date , end_date , price , status , color ) VALUES ?", cities, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Response:",res);
     
    });
};

City.findById = (cityId, result) => {
  sql.query(`SELECT * FROM cities WHERE id = ${cityId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found city: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found City with the id
    result({ kind: "not_found" }, null);
  });
};

City.getAll = result => {
  sql.query("SELECT * FROM cities", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cities: ", res);
    result(null, res);
  });
};

City.updateById = (id, city, result) => {
  sql.query(
    "UPDATE cities SET city = ? ,start_date = ? ,end_date = ? ,price = ? ,status = ? ,color = ?  WHERE id = ?",
       [city.city, city.start_date, city.end_date,city.price, city.status, city.color, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found City with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated city: ", { id: id, ...city });
      result(null, { id: id, ...city });
    }
  );
};

City.remove = (id, result) => {
  sql.query("DELETE FROM cities WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found City with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted city with id: ", id);
    result(null, res);
  });
};

City.removeAll = result => {
  sql.query("DELETE FROM cities", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cities`);
    result(null, res);
  });
};

module.exports = City;