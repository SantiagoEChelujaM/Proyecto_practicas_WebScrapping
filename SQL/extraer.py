from SQL.conexion import cone


url=[]
def extraer_urls(urls):

    cone.execute("SELECT url_pagina FROM paginas")
    paginas = cone.fetchall()
    for i in paginas:
        urls.append(i)
    
    return urls

    