import unittest
from unittest.mock import patch, MagicMock
from app import app, PlaylistModel
from flask import json

class FlaskTestCase(unittest.TestCase):
    
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    @patch('app.PlaylistModel.query')
    def test_get_songs(self, mock_query):
        mock_song = MagicMock()
        mock_song.id = 'testsong1'
        mock_query.all.return_value = [mock_song]
        response = self.client.get('/songs')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(len(data) > 0)
        self.assertEqual(data[0]['id'], 'testsong1')

    @patch('app.PlaylistModel.query')
    def test_get_songs_with_pagination(self, mock_query):
        mock_song = MagicMock()
        mock_song.id = 'testsong1'
        mock_query.paginate.return_value.items = [mock_song]
        mock_query.paginate.return_value.total = 1
        mock_query.paginate.return_value.page = 1
        mock_query.paginate.return_value.pages = 1
        mock_query.paginate.return_value.per_page = 1

        response = self.client.get('/songs?page=1&per_page=1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['items'][0]['id'], 'testsong1')
        self.assertEqual(data['per_page'], 1)

    @patch('app.PlaylistModel.query')
    def test_get_song_by_title(self, mock_query):
        mock_song = MagicMock()
        mock_song.title = 'TestSong'
        mock_query.filter.return_value.all.return_value = [mock_song]
        response = self.client.get('/searchByTitle?title=TestSong')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data[0]['title'], 'TestSong')

    @patch('app.PlaylistModel.query')
    def test_get_song_by_title_not_found(self, mock_query):
        mock_query.filter.return_value.all.return_value = None
        response = self.client.get('/searchByTitle?title=InvalidSongTitle')
        self.assertEqual(response.status_code, 404)

    @patch('app.db.session')
    @patch('app.PlaylistModel.query')
    def test_update_rating(self, mock_query, mock_session):
        mock_song = MagicMock()
        mock_song.id = 1
        mock_song.rating = 5
        mock_query.get.return_value = mock_song
        response = self.client.patch('/addRating/1', json={'rating': 4})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(mock_song.rating, 4)
        mock_session.commit.assert_called_once()

    @patch('app.PlaylistModel.query')
    def test_update_rating_not_found(self, mock_query):
        mock_query.get.return_value = None
        response = self.client.patch('/addRating/999', json={'rating': 4})
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
