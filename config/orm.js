const connection = require("../config/connection.js");

function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  let arr = [];
  for (let key in ob) {
    arr.push(key + "=" + ob[key]);
  }
  return arr.toString();
}

let orm = {
  all: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput;

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  create: function(table, col, vals, cb) {
    let queryString = "INSERT INTO " + table;
    queryString = queryString + " (";
    queryString = queryString + col.toString();
    queryString = queryString + ") ";
    queryString = queryString + "VALUES (";
    queryString = queryString + printQuestionMarks(vals.length);
    queryString = queryString + ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  update: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;
    queryString = queryString + " SET ";
    queryString = queryString + objToSql(objColVals);
    queryString = queryString + " WHERE ";
    queryString = queryString + condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
