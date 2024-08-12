# vivpro-assignment

## Set-up instructions
1. `git clone https://github.com/sbhabya/vivpro-assignment.git`
1. Create python virtual environment and install the dependencies:
    1. `conda env create -f environment.yaml`
    1. `conda activate vivpro_assgn` (on Linux and Mac) or `activate vivpro_assgn` (on Windows)
1. Install dependencies for the React front-end:
    1. If you don't already have Node.js installed, please do so from [here](https://nodejs.org/en/download/package-manager).
    1. `cd client`
    1. `npm install`

## Steps to run the application
1. Set up the database from the JSON data
    1. `cd data_processing`
    1. `python data.py` <br>
    (This will create vivpro.db, playlist table and insert data into the SQLite table)
1. Run the server
    1. `cd ../server`
    1. `python app.py`
1. Run the client
    1. `cd ../client`
    1. `npm start`
1. Open `http://127.0.0.0:3000` in a browser

## Steps to run unit tests

1. `cd server` 
1. `python -m unittest -v test_app.py`

## Application snapshots

### Main screen (table of all songs)

### Get song by title

### Ratings

### Scatter plot