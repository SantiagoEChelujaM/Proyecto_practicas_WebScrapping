from SQL.conexion import conexion
import pandas as pd

def extraer_urls(urls):
    try:
        conn = conexion()
        cursor = conn.cursor()
        cursor.execute("SELECT url_pagina FROM paginas")
        paginas = cursor.fetchall()
        for i in paginas:
            urls.append(i)
        return urls
    except Exception as e:
        print("Error al extraer URLs:", e)
    finally:
        cursor.close()
        conn.close()


def extraer_noticias():
    try:
        conn = conexion()
        cursor = conn.cursor()
        cursor.execute("SELECT id_noticia, titulo, fecha ,url_noticia, clasificacion, id_pagina_fuente FROM noticias")
        paginas = cursor.fetchall()
        columnas = [desc[0] for desc in cursor.description]
        df = pd.DataFrame(paginas, columns=columnas)
        return df
    except Exception as e:
        print("Error al extraer noticias:", e)
        return pd.DataFrame()
    finally:
        cursor.close()
        conn.close()
