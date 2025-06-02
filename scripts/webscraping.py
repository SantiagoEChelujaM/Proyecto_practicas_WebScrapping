import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import sys
import os
from obtFecha import detectar_fecha

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from SQL.extraer import extraer_urls


urls = []

extraer_urls(urls)

headers = {
    "User-Agent": "MiScraperBot/1.0 (+https://tu-sitio.com/info)"
}

# Tu selector global; ajústalo si es necesario
CSS_SELECTOR = "h2.headline a, a.headline, h2 > a, h3 > a, div > a > h2"


titulos_por_pagina = {}

for url in urls:
    try:
        resp = requests.get(url[0], headers=headers, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Error al descargar {url[0]}: {e}")
        continue

    soup = BeautifulSoup(resp.text, "html.parser")
    elementos = soup.select(CSS_SELECTOR)
    
    # Aquí extraemos texto y URL
    titulos = []
    for el in elementos:
        texto = el.get_text(strip=True)
        datatime = detectar_fecha(el)
        # 1) Si 'el' es <a>, lo usamos, si no buscamos el padre <a>
        if el.name == "a":
            link_tag = el
        else:
            link_tag = el.find_parent("a")
        href = link_tag.get("href", "") if link_tag else ""
        url_completa = urljoin(url[0], href)
        

        titulos.append({
            "titulo": texto,
            "url": url_completa,
            "fecha": datatime
        })
    titulos_por_pagina[url] = titulos or [{"titulo": "— No se encontró ningún título —", "url": ""}]

# Imprimimos resultados
#for pagina, items in titulos_por_pagina.items():
#    print(f"\nPágina: {pagina}")
#    for i, item in enumerate(items, 1):
#       print(f"  {i}. {item['titulo']}")
#       print(f"     🔗 {item['url']}")
#       print(f"       {item['fecha']}")


#Web sacrpping de las paginas de noticias







