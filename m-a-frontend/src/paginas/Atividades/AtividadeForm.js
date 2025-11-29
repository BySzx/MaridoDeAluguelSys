import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AtividadeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [atividade, setAtividade] = useState({ nome: "", descricao: "" });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/atividades/${id}`)
        .then((r) => r.ok ? r.json() : null)
        .then((d) => { if (d) setAtividade(d); })
        .catch(() => {});
    }
  }, [id]);

  function salvar(e) {
    e.preventDefault();
    const metodo = id ? "PUT" : "POST";
    const url = id ? `http://localhost:8080/atividades/${id}` : "http://localhost:8080/atividades";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(atividade)
    }).then((r) => {
      if (r.ok) navigate("/atividades");
      else alert("Erro ao salvar atividade");
    }).catch(() => alert("Erro ao salvar atividade"));
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-3">
        <h2>{id ? "Editar Atividade" : "Nova Atividade"}</h2>

        <form onSubmit={salvar} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              value={atividade.nome}
              onChange={(e) => setAtividade({ ...atividade, nome: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              rows="4"
              value={atividade.descricao}
              onChange={(e) => setAtividade({ ...atividade, descricao: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">{id ? "Salvar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
