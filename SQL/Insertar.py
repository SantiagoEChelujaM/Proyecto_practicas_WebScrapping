from SQL.conexion import conexion

def insertar_urls(url):
    sql = "INSERT INTO paginas(url_pagina) VALUES (%s)"
    try:
        conn = conexion()
        cursor = conn.cursor()
        cursor.execute(sql, (url,))
        conn.commit()
    except Exception as e:
        print("Error al insertar URL:", e)
    finally:
        cursor.close()
        conn.close()


def insertar_noticia(noticias_list):
    sql = """
    INSERT INTO noticias (titulo, fecha, url_noticia, clasificacion, id_pagina_fuente)
    VALUES (%s, %s, %s, %s, %s)
    """
    param_list = [
        (n['titulo'], n['fecha'], n['url'], n['clasificacion'], n['id_pagina_fuente'])
        for n in noticias_list
    ]
    try:
        conn = conexion()
        cursor = conn.cursor()
        cursor.executemany(sql, param_list)
        conn.commit()
        print(f"{len(param_list)} noticias insertadas en bloque.")
    except Exception as e:
        print("Error al insertar noticias:", e)
    finally:
        cursor.close()
        conn.close()
