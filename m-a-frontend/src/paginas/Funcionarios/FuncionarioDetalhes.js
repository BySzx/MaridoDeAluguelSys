import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function FuncionarioDetalhes() {
  const { id } = useParams();
  const nav = useNavigate();
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/funcionarios/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Não encontrado");
        return r.json();
      })
      .then((d) => setFuncionario(d))
      .catch(() => setFuncionario(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (!funcionario) return <div className="container mt-4">Funcionário não encontrado.</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2>{funcionario.nome}</h2>
          <div className="text-muted">ID: {funcionario.id}</div>
        </div>
        <div>
          <button className="btn btn-secondary me-2" onClick={() => nav(-1)}>Voltar</button>
          <Link to={`/funcionarios/editar/${funcionario.id}`} className="btn btn-primary">Editar</Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">Telefone</dt>
            <dd className="col-sm-9">{funcionario.telefone || "-"}</dd>

            <dt className="col-sm-3">Email</dt>
            <dd className="col-sm-9">{funcionario.email || "-"}</dd>

            <dt className="col-sm-3">CPF</dt>
            <dd className="col-sm-9">{funcionario.cpf || "-"}</dd>

            <dt className="col-sm-3">Especialidade</dt>
            <dd className="col-sm-9">{funcionario.especialidade || "-"}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
