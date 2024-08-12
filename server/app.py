from flask import Flask, request, abort
from flask_restful import Api, Resource, reqparse, fields, marshal, marshal_with
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
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
    class_ = db.Column('class', db.Integer, nullable=True)
    rating = db.Column(db.Integer, nullable=True)

resource_fields = {
    'index': fields.Integer,
    'id': fields.String,
    'title': fields.String,
    'danceability': fields.Float,
    'energy': fields.Float,
    'key': fields.Integer,
    'loudness': fields.Float,
    'mode': fields.Integer,
    'acousticness': fields.Float,
    'instrumentalness': fields.Float,
    'liveness': fields.Float,
    'valence': fields.Float,
    'tempo': fields.Float,
    'duration_ms': fields.Integer,
    'time_signature': fields.Integer,
    'num_bars': fields.Integer,
    'num_sections': fields.Integer,
    'num_segments': fields.Integer,
    'class_': fields.Integer,
    'rating': fields.Integer
}

class Songs(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('per_page', type=int, location='args')
        args = parser.parse_args()

        page = args['page']
        per_page = args['per_page']
        if not page and not per_page:
            result = PlaylistModel.query.all()
            result = marshal(result, resource_fields)
            return result

        paginated_result = PlaylistModel.query.paginate(page=page, per_page=per_page, error_out=False)

        items = marshal(paginated_result.items, resource_fields)

        result = {
            'items': items,
            'total': paginated_result.total,
            'page': paginated_result.page,
            'pages': paginated_result.pages,
            'per_page': paginated_result.per_page
        }

        return result

class Rating(Resource):
    def patch(self, index):
        song = PlaylistModel.query.get(index)
        if not song:
            abort(404, description='Song not found')
        star_rating = request.json.get('rating')
        app.logger.info(star_rating)
        song.rating = star_rating
        db.session.commit()
        return {'message': 'Rating updated successfully'}, 200

    
class SongByTitle(Resource):    
    @marshal_with(resource_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, location='args')
        args = parser.parse_args()
        title = args['title']
        if not title:
            abort(400, description='No title provided')
        app.logger.info(title)
        result = PlaylistModel.query.filter(
            func.lower(PlaylistModel.title).ilike(f'%{title.lower()}%')).all() 
        if not result:
            abort(404, description='Song not found')

        return result


api.add_resource(Songs, '/songs')
api.add_resource(Rating, '/addRating/<int:index>')
api.add_resource(SongByTitle, '/searchByTitle')
   

if __name__ == '__main__':
    app.run(debug=True)