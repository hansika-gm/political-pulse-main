"""
PolitiSense Backend - Flask + Socket.IO Server
Real-Time Political Sentiment Analysis with Streaming

Setup:
    pip install -r requirements.txt

Run:
    python app.py
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from database import init_db, get_tweets, save_tweets, get_analytics_data
from twitter_stream import TwitterStream
from sentiment_model import predict_vader
from bert_model import predict_sentiment_bert
from preprocess import clean_text
import pandas as pd
import threading


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

init_db()

# Global stream reference
active_stream: TwitterStream | None = None


def process_tweet(tweet_data: dict):
    """Process incoming tweet through sentiment pipeline and emit via Socket.IO"""
    tweet_data['clean_text'] = clean_text(tweet_data['text'])

    # Fast model (VADER)
    vader_result = predict_vader(tweet_data['clean_text'])
    tweet_data['ml_sentiment'] = vader_result['label']
    tweet_data['vader_score'] = vader_result['compound']

    # Accurate model (BERT)
    bert_result = predict_sentiment_bert(tweet_data['clean_text'])
    tweet_data['bert_sentiment'] = bert_result['label']
    tweet_data['bert_confidence'] = bert_result['confidence']

    # Use BERT as primary sentiment
    tweet_data['sentiment'] = bert_result['label']
    tweet_data['confidence'] = bert_result['confidence']

    # Save to database
    save_tweets([tweet_data])

    # Emit to frontend via Socket.IO
    socketio.emit('new_tweet', tweet_data)

    # Emit updated stats
    stats = get_analytics_data()
    socketio.emit('sentiment_update', {
        'total': stats['total'],
        'positive': stats['positive'],
        'negative': stats['negative'],
        'neutral': stats['neutral'],
    })


@app.route('/api/status', methods=['GET'])
def get_status():
    """Return server and stream status"""
    return jsonify({
        'streaming': active_stream is not None and active_stream.is_running(),
        'keyword': active_stream.keyword if active_stream else '',
        'tweet_count': get_analytics_data()['total'],
    })


@app.route('/api/tweets', methods=['GET'])
def get_all_tweets():
    """Fetch stored tweets from database"""
    limit = request.args.get('limit', 100, type=int)
    keyword = request.args.get('keyword', None)
    tweets = get_tweets(limit=limit, keyword=keyword)
    return jsonify(tweets)


@app.route('/api/start-stream', methods=['GET'])
def start_stream():
    """Start streaming tweets for a keyword"""
    global active_stream
    keyword = request.args.get('keyword', 'elections')

    if active_stream and active_stream.is_running():
        active_stream.stop()

    active_stream = TwitterStream(keyword=keyword, callback=process_tweet)
    thread = threading.Thread(target=active_stream.start, daemon=True)
    thread.start()

    socketio.emit('stream_started', {'keyword': keyword})
    return jsonify({'status': 'streaming', 'keyword': keyword})


@app.route('/api/stop-stream', methods=['GET'])
def stop_stream():
    """Stop the active tweet stream"""
    global active_stream
    if active_stream:
        active_stream.stop()
        active_stream = None
        socketio.emit('stream_stopped')
    return jsonify({'status': 'stopped'})


@app.route('/api/predict', methods=['POST'])
def predict_sentiment():
    """Predict sentiment for a given text"""
    data = request.json
    text = data.get('text', '')
    clean = clean_text(text)

    vader = predict_vader(clean)
    bert = predict_sentiment_bert(clean)

    return jsonify({
        'text': text,
        'clean_text': clean,
        'vader_sentiment': vader['label'],
        'vader_score': vader['compound'],
        'bert_sentiment': bert['label'],
        'bert_confidence': bert['confidence'],
    })


@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Return comprehensive sentiment analytics"""
    keyword = request.args.get('keyword', None)
    stats = get_analytics_data(keyword=keyword)
    return jsonify(stats)


@app.route('/api/export', methods=['GET'])
def export_csv():
    """Export tweets as CSV"""
    import os
    tweets = get_tweets(limit=10000)
    df = pd.DataFrame(tweets)
    os.makedirs('data', exist_ok=True)
    csv_path = 'data/exported_tweets.csv'
    df.to_csv(csv_path, index=False)
    return jsonify({'status': 'success', 'path': csv_path})


@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('status', {'connected': True})


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
@app.route('/')
def home():
    return "🚀 Political Sentiment Analysis Backend is Running!"

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)

