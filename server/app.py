from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__)
api = Api(app)

db_path = os.path.abspath('../data_processing/vivpro.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'

db = SQLAlchemy(app)

class PlaylistModel(db.Model):
    __tablename__ = 'playlist'

    index = db.Column(db.Integer, primary_key=True)  
    id = db.Column(db.String, nullable=True)
    title = db.Column(db.String, nullable=True)
    danceability = db.Column(db.Float, nullable=True)
    energy = db.Column(db.Float, nullable=True)
    key = db.Column(db.Integer, nullable=True)
    loudness = db.Column(db.Float, nullable=True)
    mode = db.Column(db.Integer, nullable=True)
    acousticness = db.Column(db.Float, nullable=True)
    instrumentalness = db.Column(db.Float, nullable=True)
    liveness = db.Column(db.Float, nullable=True)
    valence = db.Column(db.Float, nullable=True)
    tempo = db.Column(db.Float, nullable=True)
    duration_ms = db.Column(db.Integer, nullable=True)
    time_signature = db.Column(db.Integer, nullable=True)
    num_bars = db.Column(db.Integer, nullable=True)
    num_sections = db.Column(db.Integer, nullable=True)
    num_segments = db.Column(db.Integer, nullable=True)
    class_ = db.Column(db.Integer, nullable=True)

class Songs(Resource):
    def get(self):
        result = PlaylistModel.query.all()
        return result
    
class SongByTitle(Resource):    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, location='args')
        args = parser.parse_args()
        title = args['title']
        result = PlaylistModel.query.filter_by(title=title).all()
        return result

if __name__ == '__main__':
    app.run(debug=True)