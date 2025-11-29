import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AtividadeLista() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    setLoading(true);
    fetch("http://localhost:8080/atividades")
      .then((r) => r.json())
      .then((dados) => setAtividades(dados || []))
      .catch(() => setAtividades([]))
      .finally(() => setLoading(false));
  }

  function deletar(id) {
    if (!window.confirm("Excluir atividade?")) return;
    fetch(`http://localhost:8080/atividades/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) carregar();
        else alert("Erro ao excluir");
      })
      .catch(() => alert("Erro ao excluir"));
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Atividades</h2>
        <Link to="/atividades/novo" className="btn btn-primary">+ Nova Atividade</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          {loading ? (
            <div>Carregando...</div>
          ) : atividades.length === 0 ? (
            <div className="text-muted">Nenhuma atividade cadastrada.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {atividades.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.nome}</td>
                      <td className="text-end">
                        <Link to={`/atividades/${a.id}`} className="btn btn-sm btn-outline-primary me-2">Ver</Link>
                        <Link to={`/atividades/editar/${a.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => deletar(a.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
