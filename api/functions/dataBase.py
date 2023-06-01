import mysql.connector
from mysql.connector import Error
from decouple import config

DB_NAME_I = config("DB_NAME_I")
DB_NAME_II = config("DB_NAME_II")
DB_HOST = config("DB_HOST")
DB_USER = config("DB_USER")
DB_PASS = config("DB_PASS")
DB_PORT = config("DB_PORT")


def formatear_arreglo(arreglo):
    result_final = []
    for res in arreglo:
        result_final.append(res[0])
    return result_final


def consulta(operation):
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            database=DB_NAME_I,
            port=DB_PORT,
        )
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print(db_Info)
    except Error as e:
        print("Error al conectarse a MySQL", e)
    cursor = connection.cursor()
    cursor.execute(operation)
    result = cursor.fetchall()

    if connection.is_connected():
        connection.close()
        cursor.close()
    return result


def consulta2(operation):
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            database=DB_NAME_II,
            port=DB_PORT,
        )
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print(db_Info)
    except Error as e:
        print("Error al conectarse a MySQL", e)
    cursor = connection.cursor()
    cursor.execute(operation)
    result = cursor.fetchall()
    if connection.is_connected():
        connection.close()
        cursor.close()
    return result


def consultaOneRow(operation):
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            database=DB_NAME_I,
            port=DB_PORT,
        )
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print(db_Info)
    except Error as e:
        print("Error al conectarse a MySQL", e)
    cursor = connection.cursor()
    cursor.execute(operation)
    result = cursor.fetchall()
    resulTotal = formatear_arreglo(result)
    if connection.is_connected():
        connection.close()
        cursor.close()
    return resulTotal
