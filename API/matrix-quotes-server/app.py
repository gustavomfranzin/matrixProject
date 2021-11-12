import random
from flask import jsonify,request,Flask
from flask_cors import CORS, cross_origin
import pandas as pd

MatrixApi = Flask(__name__)
cors = CORS(MatrixApi)
MatrixApi.config['CORS_HEADERS'] = 'Content-Type'

df = pd.read_csv('finalQuotes.csv', names=['Speakers', 'Quotes'])

def get_random_quote():
    rq = random.randint(0, len(df))
    speaking = df.values[rq][0]
    quote = df.values[rq][1]
    quote_obj = {"speaker": speaking, "quote": quote}
    return quote_obj

def get_ordenada_quote():
    quotes =  []
    for x in df.values:
        speaking = x[0]
        quote = x[1]
        quote_obj = {"speaker": speaking, "quote": quote}
        quotes.append(quote_obj)
    return quotes


@cross_origin()
@MatrixApi.route('/random', methods=['GET'])
def dashboardrand():
    return jsonify(get_random_quote())

@cross_origin()
@MatrixApi.route('/ordenada', methods=['GET'])
def dashboardord():
    return jsonify(get_ordenada_quote())

if __name__ == '__main__':
    MatrixApi.run(host= '127.0.0.1',port=5000)
