import mysql.connector

def conexion():
    return mysql.connector.connect(
        user="root",
        password="Phoslyte124096",
        host="localhost",
        database="practicas",
        port=3306
    )
  