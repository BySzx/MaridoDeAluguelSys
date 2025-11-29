import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FuncionarioLista() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    setLoading(true);
    fetch("http://localhost:8080/funcionarios")
      .then((r) => r.json())
      .then((dados) => setFuncionarios(dados || []))
      .catch(() => setFuncionarios([]))
      .finally(() => setLoading(false));
  }

  function deletar(id) {
    if (!window.confirm("Confirma exclusão do funcionário?")) return;
    fetch(`http://localhost:8080/funcionarios/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) carregar();
        else alert("Erro ao excluir");
      })
      .catch(() => alert("Erro ao excluir"));
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Funcionários</h2>
        <Link to="/funcionarios/novo" className="btn btn-primary">+ Novo Funcionário</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div>Carregando...</div>
          ) : funcionarios.length === 0 ? (
            <div className="text-muted">Nenhum funcionário cadastrado.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Especialidade</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((f) => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td>{f.nome}</td>
                      <td>{f.telefone}</td>
                      <td>{f.especialidade}</td>
                      <td className="text-end">
                        <Link to={`/funcionarios/${f.id}`} className="btn btn-sm btn-outline-primary me-2">Ver</Link>
                        <Link to={`/funcionarios/editar/${f.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => deletar(f.id)}>Excluir</button>
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
