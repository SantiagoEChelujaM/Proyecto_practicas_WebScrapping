from sentiment_analysis_spanish import sentiment_analysis
from transformers import pipeline
from webscraping import titulos_por_pagina

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
def etiqueta_lex(texto, umbral=0.15):
    """
    Usa el analizador léxico para asignar una etiqueta:
    - 'positivo' si score > umbral
    - 'negativo' si score < -umbral
    - 'neutral' si |score| <= umbral
    Devuelve tupla (etiqueta, score).
    """
    score = lex.sentiment(texto)
    if abs(score) < umbral:
        return "neutral", score
    return ("positivo", score) if score > 0 else ("negativo", score)

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
# Si titulos_por_pagina es un dict {pagina: [items,...], ...}
for id_pagina, (pagina, items) in enumerate(titulos_por_pagina.items(), start=1):
    for item in items:
        titulo = item["titulo"]
        
        # Elegir la función que prefieras: léxica o transformers
        # etiqueta, score = etiqueta_lex(titulo)
        etiqueta, score = etiqueta_transformers(titulo)
        
        noticias.append({
            "id_pagina": id_pagina,     # contador secuencial de páginas 
            "clasificacion": etiqueta,
            "titulo": titulo,
            "url": item["url"]
        })


#Anaisis de los titulos y se le clasifica una categoria
