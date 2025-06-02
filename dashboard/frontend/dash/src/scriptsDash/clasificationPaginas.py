import os
import sys
import pandas as pd

# Agrega al path la carpeta donde está extraer.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../SQL")))

from extraer import extraer_noticias

df = pd.DataFrame(extraer_noticias())
print(df)
