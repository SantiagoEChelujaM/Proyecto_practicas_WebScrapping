import { useEffect, useState } from 'react';
import { fetchNoticias } from '../api/noticias';

export default function NoticiasTable() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoticias()
      .then(rows => setNoticias(rows))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando noticias…</p>;
  if (!noticias.length) return <p>No hay noticias para mostrar.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Clasificación</th>
            <th className="px-4 py-2">Enlace Noticia</th>
            <th className="px-4 py-2">Página Origen</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map(n => (
            <tr key={n.id_noticia} className="border-t">
              <td className="px-4 py-2">{n.id_noticia}</td>
              <td className="px-4 py-2">{n.titulo}</td>
              <td className="px-4 py-2">{n.clasificacion}</td>
              <td className="px-4 py-2">
                <a href={n.url_noticia} target="_blank" rel="noreferrer">
                  Ver
                </a>
              </td>
              <td className="px-4 py-2">
                <a href={n.pagina_origen} target="_blank" rel="noreferrer">
                  Fuente
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
