import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AtividadeDetalhes() {
  const { id } = useParams();
  const nav = useNavigate();
  const [atividade, setAtividade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/atividades/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Não encontrado");
        return r.json();
      })
      .then((d) => setAtividade(d))
      .catch(() => setAtividade(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (!atividade) return <div className="container mt-4">Atividade não encontrada.</div>;

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2>{atividade.nome}</h2>
          <div className="text-muted">ID: {atividade.id}</div>
        </div>

        <div>
          <button className="btn btn-secondary me-2" onClick={() => nav(-1)}>Voltar</button>
          <Link to={`/atividades/editar/${atividade.id}`} className="btn btn-primary">Editar</Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <dl className="row">

            <dt className="col-sm-3">Descrição</dt>
            <dd className="col-sm-9">{atividade.descricao || "-"}</dd>

          </dl>
        </div>
      </div>
    </div>
  );
}
