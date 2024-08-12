# vivpro-assignment

## Set-up instructions
1. `git clone https://github.com/sbhabya/vivpro-assignment.git`
1. Create python virtual environment and install the dependencies:
    1. `conda create --name vivpro_assgn --file environment.yaml`
    1. `conda activate vivpro_assgn`
1. Install dependencies for the React front-end:
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