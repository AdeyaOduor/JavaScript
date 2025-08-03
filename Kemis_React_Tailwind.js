/*
Linux CLI Setup for Full-Stack Development (React, Node.js, Express, PostgreSQL, Tailwind CSS)

//update packages
sudo apt update && sudo apt upgrade -y

//install essential buid tools
sudo apt install -y build-essential curl git

// install nodesource repository latest version
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

// verify installation
node --version
npm --version

// Create postgre database
sudo -u postgres psql -c "CREATE USER devuser WITH PASSWORD '@K3m1s_2025';"
sudo -u postgres psql -c "CREATE DATABASE kemis_db WITH OWNER devuser;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kemis_db TO devuser;"

*/
