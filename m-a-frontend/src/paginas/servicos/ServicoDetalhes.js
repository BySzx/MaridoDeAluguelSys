import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ServicoDetalhes() {
  const { id } = useParams();
  const nav = useNavigate();
  const [servico, setServico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/servicos/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Não encontrado");
        return r.json();
      })
      .then((d) => setServico(d))
      .catch(() => setServico(null))
      .finally(() => setLoading(false));
  }, [id]);

  function excluir() {
    if (!window.confirm("Tem certeza que deseja excluir este serviço?")) return;
    fetch(`http://localhost:8080/servicos/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) nav("/servicos");
        else alert("Erro ao excluir serviço");
      })
      .catch(() => alert("Erro ao excluir serviço"));
  }

  if (loading) return <div className="container mt-4">Carregando...</div>;
  if (!servico) return <div className="container mt-4">Serviço não encontrado.</div>;

  const custoFormatado = servico.custo != null ? Number(servico.custo).toFixed(2) : "-";
  const data = servico.dataServico || "-";
  const horaInicio = servico.horaInicio || "-";
  const horaFim = servico.horaFim || "-";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2>Serviço #{servico.id}</h2>
          <div className="text-muted">
            {servico.cliente?.nome ? `Cliente: ${servico.cliente.nome}` : "Cliente: -"}
          </div>
        </div>

        <div>
          <button className="btn btn-secondary me-2" onClick={() => nav(-1)}>Voltar</button>
          <Link to={`/servicos/editar/${servico.id}`} className="btn btn-primary me-2">Editar</Link>
          <button className="btn btn-danger" onClick={excluir}>Excluir</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">Cliente</dt>
            <dd className="col-sm-9">
              {servico.cliente ? (
                <Link to={`/clientes/${servico.cliente.id}`}>{servico.cliente.nome}</Link>
              ) : "-"}
            </dd>

            <dt className="col-sm-3">Funcionário</dt>
            <dd className="col-sm-9">
              {servico.funcionario ? (
                <Link to={`/funcionarios/${servico.funcionario.id}`}>{servico.funcionario.nome}</Link>
              ) : "-"}
            </dd>

            <dt className="col-sm-3">Atividade</dt>
            <dd className="col-sm-9">
              {servico.atividade ? (
                <Link to={`/atividades/${servico.atividade.id}`}>{servico.atividade.nome}</Link>
              ) : "-"}
            </dd>

            <dt className="col-sm-3">Descrição</dt>
            <dd className="col-sm-9">{servico.descricao || "-"}</dd>

            <dt className="col-sm-3">Local</dt>
            <dd className="col-sm-9">{servico.localExecucao || "-"}</dd>

            <dt className="col-sm-3">Custo</dt>
            <dd className="col-sm-9">R$ {custoFormatado}</dd>

            <dt className="col-sm-3">Data</dt>
            <dd className="col-sm-9">{data}</dd>

            <dt className="col-sm-3">Horário</dt>
            <dd className="col-sm-9">{horaInicio}{horaInicio && horaFim ? ` — ${horaFim}` : ""}</dd>
          </dl>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Registrado em: {servico.id ? `#${servico.id}` : "-"}</div>
            {servico.cliente?.id ? (
              <Link
                to={`/servicos/novo?clienteId=${servico.cliente.id}`}
                className="btn btn-outline-primary"
              >
                Novo serviço com este cliente
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
