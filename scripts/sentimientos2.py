from transformers import pipeline
from webscraping import titulos
import math
import pandas as pd
from transform import datos_nuevos



# Modelo multilingüe entrenado para análisis de sentimientos
analizador = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

#for titulo in titulos_por_pagina:
#    resultado = analizador(titulo)
#    print(f"{titulo} → {resultado[0]['label']} (score: {resultado[0]['score']:.2f})")

data = datos_nuevos()

noticias = []
for idx, row in data.iterrows():
    titulo = row["titulo"]
        
    # Elegir la función que prefieras: léxica o transformers
    # etiqueta, score = etiqueta_lex(titulo)
    scores = analizador(titulo)
    #print(titulo)
    #print((scores[0]['score']))
    score = math.floor((scores[0]['score'])*10)
    if score <= 2:
        clasi = "negativo"
    elif score == 3:
        clasi = "neutral"
    else:
        clasi = "positivo"
    noticias.append({
        "clasificacion": clasi,     # contador secuencial de páginas 
        "titulo": titulo,
        "fecha": row['fecha'],
        "url": row["url"],
        "id_pagina_fuente": row["id_pagina"]
    })


df = pd.DataFrame(noticias)
print(df)
