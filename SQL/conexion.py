import mysql.connector

conexion = mysql.connector.connect(user="root", password="Phoslyte124096",
                                   host="localhost", 
                                   database="practicas",
                                   port="3306")

cone = conexion.cursor()
    