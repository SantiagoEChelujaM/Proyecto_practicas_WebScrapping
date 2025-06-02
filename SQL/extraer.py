from SQL.conexion import cone


url=[]
def extraer_urls(urls):

    cone.execute("SELECT url_pagina FROM paginas")
    paginas = cone.fetchall()
    for i in paginas:
        urls.append(i)
    
    return urls

def extraer_noticias():
    cone.execute("SELECT id_noticia, titulo, fecha ,url_noticia, clasificacion, id_pagina_fuente FROM noticias")
    paginas = cone.fetchall()
    cone.close()
    # Devuelve una lista limpia
    return [fila for fila in paginas]

