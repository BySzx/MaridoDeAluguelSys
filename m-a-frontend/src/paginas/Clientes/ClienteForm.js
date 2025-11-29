import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ClienteForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    endereco: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/clientes/${id}`)
        .then((r) => {
          if (!r.ok) throw new Error("Não encontrado");
          return r.json();
        })
        .then((d) => setCliente(d))
        .catch(() => {});
    }
  }, [id]);

  function salvar(e) {
    e.preventDefault();
    const metodo = id ? "PUT" : "POST";
    const url = id ? `http://localhost:8080/clientes/${id}` : "http://localhost:8080/clientes";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    })
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao salvar");
        return r.json();
      })
      .then(() => navigate("/clientes"))
      .catch((err) => {
        console.error(err);
        alert("Erro ao salvar cliente. Confere o console.");
      });
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2>{id ? "Editar Cliente" : "Novo Cliente"}</h2>

          <form onSubmit={salvar} className="mt-3">
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  value={cliente.nome}
                  onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  value={cliente.telefone}
                  onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
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
                  value={cliente.email}
                  onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">CPF</label>
                <input
                  className="form-control"
                  value={cliente.cpf}
                  onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Endereço</label>
                <input
                  className="form-control"
                  value={cliente.endereco}
                  onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}