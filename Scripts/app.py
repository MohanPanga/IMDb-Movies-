import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:Redcherry@localhost:5432/Imdb")
conn = engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# @app.route("/<name>")
# def genre(name):
#     # data = pd.read_sql(f"select * from world_films where genre like '{name}'",conn)
#     data = pd.read_sql("select * from world_films",conn)
#     return data.to_json(orient="records")

@app.route("/api/movies")
def movies():
    # data_country = pd.read_sql("select distinct latitude, longitude, country from world_films;",conn)
    data_country = pd.read_sql("select country, avg(reviews_from_critics) as avg_rating, avg(latitude) as latitude, avg(longitude) as longitude from world_films group by country;",conn)
    return data_country.to_json(orient="records")

@app.route("/")
def index():
    return render_template("index.html") 

if __name__ == '__main__':
    app.run(debug=True)
