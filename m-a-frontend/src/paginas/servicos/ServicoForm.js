import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function ServicoForm() {
  const [form, setForm] = useState({ nome: "", preco: 0, funcionarioId: "" });
  const [funcionarios, setFuncionarios] = useState([]);
  const [loadingLists, setLoadingLists] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function loadLists() {
      setLoadingLists(true);
      try {
        const res = await api.get("/funcionarios");
        setFuncionarios(res.data);
      } catch (err) {
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
          setForm(res.data);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) await api.put(`/servicos/${id}`, form);
      else await api.post("/servicos", form);
      navigate("/servicos");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container mt-4">
      <h3>{id ? "Editar Serviço" : "Novo Serviço"}</h3>

      {loadingLists && (
        <div className="mb-3">
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Funcionário</label>
          <select
            className="form-select"
            value={form.funcionarioId || ""}
            onChange={(e) => setForm({ ...form, funcionarioId: e.target.value })}
            disabled={loadingLists || saving}
          >
            <option value="">Selecione...</option>
            {funcionarios.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome}
              </option>
            ))}
          </select>
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
  );
}
