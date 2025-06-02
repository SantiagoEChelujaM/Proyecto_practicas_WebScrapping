import sys
import os

# Añade la raíz del proyecto al path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pandas as pd
from SQL.extraer import extraer_noticias
from webscraping import titulos_por_pagina

#df_ws = pd.DataFrame(titulos_por_pagina)
df_db = pd.DataFrame(extraer_noticias())

print(titulos_por_pagina[0,{0}])
