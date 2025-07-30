// Create person object
const Person = function(firstAndLast) {
  this._firstName = firstAndLast.split(' ')[0];
  this._lastName = firstAndLast.split(' ')[1];

  this.getFirstName = function() {
    return this._firstName;
  };

  this.getLastName = function() {
    return this._lastName;
  };

  this.getFullName = function() {
    return `${this._firstName} ${this._lastName}`;
  };

  this.setFirstName = function(first) {
    this._firstName = first;
    return this._firstName;
  };

  this.setLastName = function(last) {
    this._lastName = last;
    return this._lastName;
  };

  this.setFullName = function(firstAndLast) {
    this._firstName = firstAndLast.split(' ')[0];
    this._lastName = firstAndLast.split(' ')[1];
    return `${this._firstName} ${this._lastName}`;
  };
};

/*
Verifying PostgreSQL Installation and Running Applications on Linux
1. Verify PostgreSQL Installation
Check if PostgreSQL is installed:
bash

psql --version

Check if the service is running:
bash

sudo systemctl status postgresql

Check installed PostgreSQL clusters:
bash

pg_lsclusters

2. Access PostgreSQL
Switch to postgres user and access PSQL:
bash

sudo -i -u postgres
psql

Or directly access:
bash

sudo -u postgres psql

Basic PSQL commands:
sql

\l         -- List databases
\du        -- List users
\c dbname  -- Connect to database
\q         -- Quit

3. Create a New Database and User
Create database:
bash

sudo -u postgres createdb mydb

Create user:
bash

sudo -u postgres createuser myuser

Set password for user:
sql

ALTER USER myuser WITH PASSWORD 'mypassword';

Grant privileges:
sql

GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

4. Configure Remote Access (Optional)

Edit PostgreSQL config file:
bash

sudo nano /etc/postgresql/[version]/main/postgresql.conf

Uncomment/modify:
text

listen_addresses = '*'

Edit pg_hba.conf:
bash

sudo nano /etc/postgresql/[version]/main/pg_hba.conf

Add:
text

host    all             all             0.0.0.0/0               md5

Restart PostgreSQL:
bash

sudo systemctl restart postgresql

5. Connect Applications to PostgreSQL
Python Example (using psycopg2):
python

import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="myuser",
    password="mypassword"
)

cursor = conn.cursor()
cursor.execute("SELECT version();")
print(cursor.fetchone())
conn.close()

Node.js Example (using pg):
javascript

const { Client } = require('pg');

const client = new Client({
  user: 'myuser',
  host: 'localhost',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

client.connect()
  .then(() => client.query('SELECT NOW()'))
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
  .finally(() => client.end());

6. Common Maintenance Commands
Backup database:
bash

sudo -u postgres pg_dump mydb > mydb_backup.sql

Restore database:
bash

sudo -u postgres psql mydb < mydb_backup.sql

Check active connections:
sql

SELECT * FROM pg_stat_activity;

7. Troubleshooting
Check PostgreSQL logs:
bash

sudo tail -n 50 /var/log/postgresql/postgresql-[version]-main.log

Reset password if locked out:
bash

sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'newpassword';"

Check port is listening:
bash

sudo netstat -plnt | grep postgres*/
