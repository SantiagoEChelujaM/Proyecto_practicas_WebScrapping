from bs4 import Tag
from datetime import datetime

def detectar_fecha(elemento: Tag) -> str:
    """
    Intenta extraer una fecha a partir de un elemento HTML utilizando heurísticas comunes.
    """
    # 1. Buscar etiqueta <time> cercana
    time_tag = elemento.find_previous("time") or elemento.find_parent().find("time")
    if time_tag:
        if time_tag.has_attr("datetime"):
            return time_tag["datetime"]
        else:
            return time_tag.get_text(strip=True)

    # 2. Buscar atributos comunes en el elemento
    for attr in ["data-date", "data-fecha", "data-publicado", "date", "datetime"]:
        fecha = elemento.get(attr)
        if fecha:
            return fecha.strip()

    # 3. Buscar clases comunes relacionadas con fecha en elementos cercanos
    parent = elemento.find_parent()
    if parent:
        fecha_tag = parent.find(lambda tag: tag.name in ["span", "div", "p"] and (
            tag.get("class") and any("fecha" in c or "date" in c for c in tag.get("class"))
        ))
        if fecha_tag:
            return fecha_tag.get_text(strip=True)
        
    return datetime.now().isoformat(timespec='seconds')
