from SQL.conexion import conexion, cone

def insertar_urls(url):
    sql = "INSERT INTO paginas(url_pagina) VALUES (%s)"
    cone.execute(sql, (url,))
    conexion.commit()

def accion_inder(urls):
    for i in urls:
        insertar_urls(i)


def insertar_noticia(noticias_list):
    sql = """
    INSERT INTO noticias (titulo, url_noticia, clasificacion, id_pagina_fuente)
    VALUES (%s, %s, %s, %s)
    """
    # 1) Prepara lista de tuplas
    param_list = [
        (n['titulo'], n['url'], n['clasificacion'], n['id_pagina'])
        for n in noticias_list
    ]
    # 2) Ejecuta todos de golpe
    cone.executemany(sql, param_list)
    conexion.commit()
    print(f"{len(param_list)} noticias insertadas en bloque.")



