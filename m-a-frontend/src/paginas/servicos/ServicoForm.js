import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function ServicoForm() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    atividadeId: "",
    funcionarioId: "",
    clienteId: "",
    dataHora: "",
    local: ""
  });
  const [atividades, setAtividades] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadingLists, setLoadingLists] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function loadLists() {
      setLoadingLists(true);
      try {
        const [r1, r2, r3] = await Promise.all([
          api.get("/atividades"),
          api.get("/funcionarios"),
          api.get("/clientes")
        ]);
        setAtividades(r1.data || []);
        setFuncionarios(r2.data || []);
        setClientes(r3.data || []);
      } catch (err) {
        setAtividades([]);
        setFuncionarios([]);
        setClientes([]);
        console.error(err);
      } finally {
        setLoadingLists(false);
      }
    }

    loadLists();

    if (id) {
      (async () => {
        try {
          const res = await api.get(`/servicos/${id}`);
          const s = res.data || {};
          setForm({
            nome: s.nome ?? "",
            descricao: s.descricao ?? "",
            preco: s.preco ?? 0,
            atividadeId: s.atividadeId ?? s.atividade?.id ?? "",
            funcionarioId: s.funcionarioId ?? s.funcionario?.id ?? "",
            clienteId: s.clienteId ?? s.cliente?.id ?? "",
            dataHora: s.dataHora ? formatForInput(s.dataHora) : "",
            local: s.local ?? ""
          });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [id]);

  function formatForInput(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }

  function toPayload(f) {
    const payload = {
      nome: f.nome,
      descricao: f.descricao,
      preco: parseFloat(f.preco || 0),
      atividadeId: f.atividadeId || null,
      funcionarioId: f.funcionarioId || null,
      clienteId: f.clienteId || null,
      local: f.local || null
    };
    if (f.dataHora) payload.dataHora = new Date(f.dataHora).toISOString();
    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (id) await api.put(`/servicos/${id}`, payload);
      else await api.post("/servicos", payload);
      navigate("/servicos");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container pt-5 mt-4">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h3 className="mb-4">{id ? "Editar Serviço" : "Novo Serviço"}</h3>

          {loadingLists && (
            <div className="mb-3 d-flex align-items-center">
              <div className="spinner-border" role="status" />
              <span className="ms-2">Carregando listas...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                className="form-control"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                disabled={loadingLists || saving}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                disabled={loadingLists || saving}
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preço</label>
              <input
                type="number"
                className="form-control"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: e.target.value })}
                disabled={loadingLists || saving}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Atividade</label>
              <select
                className="form-select"
                value={form.atividadeId || ""}
                onChange={(e) => setForm({ ...form, atividadeId: e.target.value })}
                disabled={loadingLists || saving || atividades.length === 0}
                required
              >
                <option value="">Selecione...</option>
                {atividades.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome || a.titulo || `Atividade ${a.id}`}
                  </option>
                ))}
              </select>
              {atividades.length === 0 && <div className="form-text">Cadastre atividades primeiro.</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Funcionário</label>
              <select
                className="form-select"
                value={form.funcionarioId || ""}
                onChange={(e) => setForm({ ...form, funcionarioId: e.target.value })}
                disabled={loadingLists || saving || funcionarios.length === 0}
                required
              >
                <option value="">Selecione...</option>
                {funcionarios.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>
              {funcionarios.length === 0 && <div className="form-text">Cadastre funcionários primeiro.</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Cliente</label>
              <select
                className="form-select"
                value={form.clienteId || ""}
                onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
                disabled={loadingLists || saving || clientes.length === 0}
                required
              >
                <option value="">Selecione...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
              {clientes.length === 0 && <div className="form-text">Cadastre clientes primeiro.</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Data e Hora</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.dataHora}
                onChange={(e) => setForm({ ...form, dataHora: e.target.value })}
                disabled={loadingLists || saving}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Local</label>
              <input
                className="form-control"
                value={form.local}
                onChange={(e) => setForm({ ...form, local: e.target.value })}
                disabled={loadingLists || saving}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loadingLists || saving}>
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" />
                  <span className="ms-2">Salvando...</span>
                </>
              ) : (
                "Salvar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
