import axios from 'axios';

const API_BASE = 'http://localhost:5000';  // Ajusta si tu backend corre en otro host/puerto

export async function fetchNoticias() {
  const { data } = await axios.get(`${API_BASE}/all-data`);
  return data;  // será un arreglo de objetos: { id_noticia, titulo, url_noticia, clasificacion, pagina_origen }
}
