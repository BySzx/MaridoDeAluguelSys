import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FuncionarioForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [funcionario, setFuncionario] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    especialidade: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/funcionarios/${id}`)
        .then((r) => {
          if (!r.ok) throw new Error("Erro ao carregar funcionário");
          return r.json();
        })
        .then((dados) => setFuncionario(dados))
        .catch(() => {/* silencia erro de carga, pode não existir */});
    }
  }, [id]);

  function salvar(e) {
    e.preventDefault();
    const metodo = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8080/funcionarios/${id}`
      : "http://localhost:8080/funcionarios";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionario)
    })
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao salvar");
        return r.json();
      })
      .then(() => navigate("/funcionarios"))
      .catch((err) => {
        console.error(err);
        alert("Erro ao salvar funcionário. Confere o console.");
      });
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{id ? "Editar Funcionário" : "Novo Funcionário"}</h2>

          <form onSubmit={salvar} className="mt-3">
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  value={funcionario.nome}
                  onChange={(e) => setFuncionario({ ...funcionario, nome: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  value={funcionario.telefone}
                  onChange={(e) => setFuncionario({ ...funcionario, telefone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={funcionario.email}
                  onChange={(e) => setFuncionario({ ...funcionario, email: e.target.value })}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">CPF</label>
                <input
                  className="form-control"
                  value={funcionario.cpf}
                  onChange={(e) => setFuncionario({ ...funcionario, cpf: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Especialidade</label>
                <input
                  className="form-control"
                  value={funcionario.especialidade}
                  onChange={(e) => setFuncionario({ ...funcionario, especialidade: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}