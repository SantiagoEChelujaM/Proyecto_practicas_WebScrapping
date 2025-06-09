import sys
import os

# Añade la raíz del proyecto al path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pandas as pd
from SQL.extraer import extraer_noticias
from webscraping import titulos

df_ws = pd.DataFrame(titulos)
df_db = extraer_noticias()


def datos_nuevos():
    return df_ws[~df_ws['titulo'].isin(df_db['titulo'])].copy()
    

