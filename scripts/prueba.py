import pandas as pd
from sentiment_analysis_spanish import sentiment_analysis
from transformers import pipeline
from transform import datos_nuevos


datos = datos_nuevos()


# Instanciar el analizador léxico en español
lex = sentiment_analysis.SentimentAnalysisSpanish()

# 1) Modelo multilingüe de Transformers para clasificación de sentimiento
clf = pipeline(
    "sentiment-analysis",
    model="nlptown/bert-base-multilingual-uncased-sentiment",
    tokenizer="nlptown/bert-base-multilingual-uncased-sentiment",
    return_all_scores=True
)

# --- Funciones de mapeo ---
#def etiqueta_lex(texto, umbral=0.15):
#    """
#    Usa el analizador léxico para asignar una etiqueta:
#    - 'positivo' si score > umbral
#    - 'negativo' si score < -umbral
#    - 'neutral' si |score| <= umbral
#    Devuelve tupla (etiqueta, score).
#    """
#    score = lex.sentiment(texto)
#    if abs(score) < umbral:
#        return "neutral", score
#    return ("positivo", score) if score > 0 else ("negativo", score)

def etiqueta_transformers(texto):
    """
    Usa el pipeline de Transformers para obtener predicciones de 1 a 5 estrellas,
    luego las convierte en etiquetas:
    - 1–2 estrellas → 'negativo'
    - 3 estrellas   → 'neutral'
    - 4–5 estrellas → 'positivo'
    Devuelve tupla (etiqueta, score de la mejor predicción).
    """
    salida = clf(texto)[0]
    mejor = max(salida, key=lambda x: x["score"])
    estrellas = int(mejor["label"].split()[0])
    if estrellas <= 2:
        return "negativo", mejor["score"]
    elif estrellas == 3:
        return "neutral", mejor["score"]
    else:
        return "positivo", mejor["score"]

# --- Procesamiento de todos los títulos ---
noticias = []

# Contador por página (si deseas reiniciar por cada id_pagina_fuente, puedes agrupar después)
for idx, row in datos.iterrows():
    titulo = row["titulo"]
    etiqueta, score = etiqueta_transformers(titulo)

    noticias.append({
        "clasificacion": etiqueta,
        "titulo": titulo,
        "fecha": row['fecha'],
        "url": row["url"],
        "id_pagina_fuente": row["id_pagina"]
    })

# Crear nuevo DataFrame con clasificaciones
df_clasificadas = pd.DataFrame(noticias)
print(df_clasificadas)

#Anaisis de los titulos y se le clasifica una categoria
