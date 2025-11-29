import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClienteLista() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    setLoading(true);
    fetch("http://localhost:8080/clientes")
      .then((r) => r.json())
      .then((dados) => setClientes(dados || []))
      .catch(() => setClientes([]))
      .finally(() => setLoading(false));
  }

  function deletar(id) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    fetch(`http://localhost:8080/clientes/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) carregar();
        else alert("Erro ao excluir");
      })
      .catch(() => alert("Erro ao excluir cliente"));
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Clientes</h2>
        <Link to="/clientes/novo" className="btn btn-primary">+ Novo Cliente</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div>Carregando...</div>
          ) : clientes.length === 0 ? (
            <div className="text-muted">Nenhum cliente cadastrado.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.nome}</td>
                      <td>{c.telefone}</td>
                      <td>{c.cpf}</td>
                      <td className="text-end">
                        <Link to={`/clientes/${c.id}`} className="btn btn-sm btn-outline-primary me-2">Ver</Link>
                        <Link to={`/clientes/editar/${c.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => deletar(c.id)}>Excluir</button>
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
