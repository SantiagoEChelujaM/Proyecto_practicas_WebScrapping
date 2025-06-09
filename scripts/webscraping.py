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

CSS_SELECTOR = "h2.headline a, a.headline, h2 > a, h3 > a, div > a > h2"

titulos = []
i = 1  # ID de página

for url in urls:
    try:
        resp = requests.get(url[0], headers=headers, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Error al descargar {url[0]}: {e}")
        continue

    soup = BeautifulSoup(resp.text, "html.parser")
    elementos = soup.select(CSS_SELECTOR)
    
    for el in elementos:
        texto = el.get_text(strip=True)
        datatime = detectar_fecha(el)
        link_tag = el if el.name == "a" else el.find_parent("a")
        href = link_tag.get("href", "") if link_tag else ""
        url_completa = urljoin(url[0], href)

        titulos.append({
            "id_pagina": i,
            "titulo": texto,
            "url": url_completa,
            "fecha": datatime
        })

    i += 1

# Mostrar resultados
#for idx, item in enumerate(titulos, 1):
#    print(f"\n[{idx}] ID Página: {item['id_pagina']}")
#    print(f"  Título: {item['titulo']}")
#    print(f"  🔗 URL: {item['url']}")
#    print(f"  📅 Fecha: {item['fecha']}")

# Aquí ya puedes hacer:
# import pandas as pd
# df_ws = pd.DataFrame(titulos)

