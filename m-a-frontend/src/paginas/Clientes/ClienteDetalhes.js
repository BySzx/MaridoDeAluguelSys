import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ClienteDetalhes() {
  const { id } = useParams();
  const nav = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/clientes/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Não encontrado");
        return r.json();
      })
      .then((d) => setCliente(d))
      .catch(() => setCliente(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (!cliente) return <div className="container mt-4">Cliente não encontrado.</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2>{cliente.nome}</h2>
          <div className="text-muted">ID: {cliente.id}</div>
        </div>

        <div>
          <button className="btn btn-secondary me-2" onClick={() => nav(-1)}>Voltar</button>
          <Link to={`/clientes/editar/${cliente.id}`} className="btn btn-primary">Editar</Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">Telefone</dt>
            <dd className="col-sm-9">{cliente.telefone || "-"}</dd>

            <dt className="col-sm-3">Email</dt>
            <dd className="col-sm-9">{cliente.email || "-"}</dd>

            <dt className="col-sm-3">CPF</dt>
            <dd className="col-sm-9">{cliente.cpf || "-"}</dd>

            <dt className="col-sm-3">Endereço</dt>
            <dd className="col-sm-9">{cliente.endereco || "-"}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
