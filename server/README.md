# Server 

### GUIDE

i) Database Setup 

ii) Installation and Running

iii) API Documentation

## i) Database Setup

1. You need mysql datbase for this and create a table named "***cities***" with following query :


        CREATE TABLE `cities` (

        `id` int(11) NOT NULL AUTO_INCREMENT,
  
        `city` varchar(255) NOT NULL,
  
        `start_date` date NOT NULL,
  
        `end_date` date NOT NULL,
  
        `price` double NOT NULL,
  
        `status` varchar(255) NOT NULL,
  
        `color` varchar(255) NOT NULL,
  
        PRIMARY KEY (`id`)
  
        ) 
        
2. Edit MySQL configuration in [db_config.js](https://github.com/kumarerubandi/code_challenge_1/blob/master/server/app/config/db_config.js) file.


## ii) Installation and Running

1. Run "npm install" in server's directory .

2. Run "npm start" to start the server and it runs by default on [http://localhost:3000](http://localhost:3000). 

## iii) API Documentation

The following are the list of endpoints and supported methods :

1. GET ***/city*** : Retrieves all the available records .

2. GET ***/city/{id}*** : Retrieves the record with matching id if it exists.

3. POST ***/city*** : Creates a new record . And the sample request json looks like :

        {
          "city": "A dos Negros",
          "start_date": "08/27/2011",
          "end_date": "08/27/2012",
          "price": 9.48,
          "status": "Often",
          "color": "#903761",
          "id":30
        }
4. PUT ***/city/{id}*** : Updates an existing record with given Id and the request json is similar to the above post request body.

5. DELETE ***/city/{id}*** : Deletes the record with given Id if it exists.




