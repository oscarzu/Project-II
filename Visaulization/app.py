from flask import Flask, render_template, jsonify, request
import pymongo

app = Flask(__name__,static_folder="./static")

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/sales")
@app.route("/sales/<year>")
def sales(year="2019"):
    # aqui me conecto a mi mongo db y pido todos los datos
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Project2"]
    mycol = mydb["ventas"]
    resultado = mycol.find({"Year":year},{"_id":False})
    resultado= [x for i,x in enumerate(resultado)]
    return jsonify (resultado)


@app.route("/hybrid")
@app.route("/hybrid/<year>")
def hybrid(year="2019"):
    # aqui me conecto a mi mongo db y pido todos los datos
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Project2"]
    mycol = mydb["Hybrid"]
    resultadoHybrid = mycol.find({"Year":year},{"_id":False})
    resultadoHybrid= [x for i,x in enumerate(resultadoHybrid)]
    return jsonify (resultadoHybrid)

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/pagsales")
def pagsales():
    return render_template("pagsales.html")

@app.route("/paghybrid")
def paghybrid():
    return render_template("hybrid.html")


if __name__ == "__main__":
    app.run()
