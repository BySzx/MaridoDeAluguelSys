// src/pages/servicos/ListaServicos.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListaServicos() {
  const [servicos, setServicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [q, setQ] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [dataFrom, setDataFrom] = useState("");
  const [dataTo, setDataTo] = useState("");

  useEffect(() => {
    carregarTudo();
    // eslint-disable-next-line
  }, []);

  function carregarTudo() {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:8080/servicos").then((r) => r.ok ? r.json() : []),
      fetch("http://localhost:8080/clientes").then((r) => r.ok ? r.json() : [])
    ])
      .then(([s, c]) => {
        setServicos(s || []);
        setClientes(c || []);
      })
      .catch(() => {
        setServicos([]);
        setClientes([]);
      })
      .finally(() => setLoading(false));
  }

  function apagar(id) {
    if (!window.confirm("Tem certeza que deseja excluir este serviço?")) return;
    fetch(`http://localhost:8080/servicos/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) carregarTudo();
        else alert("Erro ao excluir serviço");
      })
      .catch(() => alert("Erro ao excluir serviço"));
  }

  function aplicarFiltros(lista) {
    return lista.filter((s) => {
      // filtro texto — procura no cliente, funcionario, atividade, descricao
      const texto = q.trim().toLowerCase();
      if (texto) {
        const combinado = [
          s.cliente?.nome,
          s.funcionario?.nome,
          s.atividade?.nome,
          s.descricao,
          s.localExecucao
        ].join(" ").toLowerCase();
        if (!combinado.includes(texto)) return false;
      }

      // filtro cliente
      if (clienteFilter) {
        if (!s.cliente || String(s.cliente.id) !== String(clienteFilter)) return false;
      }

      // filtro data (dataServico no formato YYYY-MM-DD)
      if (dataFrom) {
        if (!s.dataServico || s.dataServico < dataFrom) return false;
      }
      if (dataTo) {
        if (!s.dataServico || s.dataServico > dataTo) return false;
      }

      return true;
    });
  }

  const filtrados = aplicarFiltros(servicos);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Serviços</h2>
        <Link to="/servicos/novo" className="btn btn-primary">+ Novo Serviço</Link>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Pesquisar por cliente, funcionário, atividade, local..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select className="form-select" value={clienteFilter} onChange={(e) => setClienteFilter(e.target.value)}>
                <option value="">Filtrar por cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <input className="form-control" type="date" value={dataFrom} onChange={(e) => setDataFrom(e.target.value)} />
            </div>

            <div className="col-md-2">
              <input className="form-control" type="date" value={dataTo} onChange={(e) => setDataTo(e.target.value)} />
            </div>

            <div className="col-md-1 d-grid">
              <button className="btn btn-outline-secondary" onClick={() => { setQ(""); setClienteFilter(""); setDataFrom(""); setDataTo(""); }}>
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div>Carregando...</div>
          ) : filtrados.length === 0 ? (
            <div className="text-muted">Nenhum serviço encontrado.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Funcionário</th>
                    <th>Atividade</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th className="text-end">Custo</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((s) => (
                    <tr key={s.id}>
                      <td style={{width:70}}>{s.id}</td>
                      <td>{s.cliente?.nome || "-"}</td>
                      <td>{s.funcionario?.nome || "-"}</td>
                      <td>{s.atividade?.nome || "-"}</td>
                      <td>{s.dataServico || "-"}</td>
                      <td>{(s.horaInicio || "-") + (s.horaInicio && s.horaFim ? ` — ${s.horaFim}` : "")}</td>
                      <td className="text-end">R$ {s.custo != null ? Number(s.custo).toFixed(2) : "-"}</td>
                      <td className="text-end">
                        <Link to={`/servicos/${s.id}`} className="btn btn-sm btn-outline-primary me-2">Detalhes</Link>
                        <Link to={`/servicos/editar/${s.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => apagar(s.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Mostrando {filtrados.length} de {servicos.length} serviços
          <button className="btn btn-link float-end" onClick={carregarTudo}>Atualizar</button>
        </div>
      </div>
    </div>
  );
}
