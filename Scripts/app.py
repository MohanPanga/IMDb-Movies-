import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://djc_1:test@localhost:5432/IMBD_films_db")
conn = engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/<name>")
def genre(name):

    data = pd.read_sql(f"select genre from world_films where genre = '{name}' limit(5);",conn)

    return data.to_json()

if __name__ == '__main__':
    app.run(debug=True)
