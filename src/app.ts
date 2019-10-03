// @ts-ignore: no types available
import snowflake from 'snowflake-sdk';

import * as dotenv from 'dotenv';

dotenv.config();

const connection = snowflake.createConnection({
  account: process.env.ACCOUNT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  role: process.env.ROLE,
  warehouse: process.env.WAREHOUSE,
  database: process.env.DATABASE,
  schema: process.env.SCHEMA
});

/**
CREATE TABLE WIDGETS (COLOR VARCHAR(200), LABEL VARCHAR(200));
 INSERT INTO WIDGETS (COLOR, LABEL) VALUES('blue', 'TEST1'),('yellow', 'TEST2'),('green', 'test3')
select * from WIDGETS 
 */

connection.connect(function(err, conn) {
  if (err) {
    console.error('Unable to connect: ' + err.message);
  } else {
    console.log('Successfully connected to Snowflake.');
    // Optional: store the connection ID.
    const connection_ID = conn.getId();

    var statement = connection.execute({
      sqlText: 'SELECT * FROM WIDGETS WHERE LABEL = ? AND COLOR IN (?)',
      binds: ['TEST1', ['blue', 'yellow']],
      complete: function(err, stmt, rows) {
        if (err) {
          console.error(
            'Failed to execute statement due to the following error: ' +
              err.message
          );
        } else {
          console.log('Successfully executed statement: ' + stmt.getSqlText());
          console.log(rows);
        }
      }
    });
  }
});
