import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from SQL.Insertar import insertar_noticia
from sentimientos import noticias


insertar_noticia(noticias)



#Se insertan los datos dentro de la base de datos, tabla de noticias


