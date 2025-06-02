from transformers import pipeline
from webscraping import titulos_por_pagina
import math

# Modelo multilingüe entrenado para análisis de sentimientos
analizador = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

#for titulo in titulos_por_pagina:
#    resultado = analizador(titulo)
#    print(f"{titulo} → {resultado[0]['label']} (score: {resultado[0]['score']:.2f})")

noticias = []
for id_pagina, (pagina, items) in enumerate(titulos_por_pagina.items(), start=1):
    for item in items:
        titulo = item["titulo"]
        
        # Elegir la función que prefieras: léxica o transformers
        # etiqueta, score = etiqueta_lex(titulo)
        scores = analizador(titulo)
        print(titulo)
        print((scores[0]['score']))
        score = math.floor((scores[0]['score'])*10)
        if score <= 2:
            clasi = "negativo"
        elif score == '3 stars':
            clasi = "neutral"
        else:
            clasi = "positivo"
        noticias.append({
            "id_pagina": id_pagina,     # contador secuencial de páginas 
            "titulo": titulo,
            "fecha": item['fecha'],
            "url": item["url"],
            "clasificacion": clasi
        })

for i in noticias:
    print(i)