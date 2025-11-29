import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [counts, setCounts] = useState({
    clientes: null,
    funcionarios: null,
    atividades: null,
    servicos: null
  });

  useEffect(() => {
    async function loadCounts() {
      try {
        const [clientes, funcionarios, atividades, servicos] = await Promise.all([
          fetch("http://localhost:8080/clientes").then(r => r.ok ? r.json() : []),
          fetch("http://localhost:8080/funcionarios").then(r => r.ok ? r.json() : []),
          fetch("http://localhost:8080/atividades").then(r => r.ok ? r.json() : []),
          fetch("http://localhost:8080/servicos").then(r => r.ok ? r.json() : [])
        ]);
        setCounts({
          clientes: Array.isArray(clientes) ? clientes.length : 0,
          funcionarios: Array.isArray(funcionarios) ? funcionarios.length : 0,
          atividades: Array.isArray(atividades) ? atividades.length : 0,
          servicos: Array.isArray(servicos) ? servicos.length : 0
        });
      } catch (err) {
        setCounts({ clientes: "-", funcionarios: "-", atividades: "-", servicos: "-" });
      }
    }
    loadCounts();
  }, []);

  const cardStyle = {
    flex: "1 1 220px",
    background: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    margin: 8,
    minWidth: 200
  };

  const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center" };

  return (
    <div style={{ padding: 20 }}>
      <div style={headerStyle}>
        <div>
          <h1>Marido de Aluguel — Painel</h1>
          <p style={{ marginTop: 6, color: "#555" }}>Acesse e gerencie Clientes, Funcionários, Atividades e Serviços.</p>
        </div>
        <div>
          <Link to="/servicos/novo" style={{ padding: "8px 14px", background: "#2d87f0", color: "#fff", borderRadius: 6, textDecoration: "none" }}>
            + Novo Serviço
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
        <div style={cardStyle}>
          <h3>Clientes</h3>
          <p style={{ fontSize: 28, margin: "8px 0" }}>{counts.clientes ?? "—"}</p>
          <p style={{ color: "#666", margin: "8px 0" }}>Gerencie clientes cadastrados.</p>
          <div>
            <Link to="/clientes" style={{ marginRight: 8 }}>Ver lista</Link>
            <Link to="/clientes/novo">Novo</Link>
          </div>
        </div>

        <div style={cardStyle}>
          <h3>Funcionários</h3>
          <p style={{ fontSize: 28, margin: "8px 0" }}>{counts.funcionarios ?? "—"}</p>
          <p style={{ color: "#666", margin: "8px 0" }}>Gerencie prestadores de serviço.</p>
          <div>
            <Link to="/funcionarios" style={{ marginRight: 8 }}>Ver lista</Link>
            <Link to="/funcionarios/novo">Novo</Link>
          </div>
        </div>

        <div style={cardStyle}>
          <h3>Atividades</h3>
          <p style={{ fontSize: 28, margin: "8px 0" }}>{counts.atividades ?? "—"}</p>
          <p style={{ color: "#666", margin: "8px 0" }}>Tipos de serviço oferecidos.</p>
          <div>
            <Link to="/atividades" style={{ marginRight: 8 }}>Ver lista</Link>
            <Link to="/atividades/novo">Novo</Link>
          </div>
        </div>

        <div style={cardStyle}>
          <h3>Serviços</h3>
          <p style={{ fontSize: 28, margin: "8px 0" }}>{counts.servicos ?? "—"}</p>
          <p style={{ color: "#666", margin: "8px 0" }}>Agendamentos e serviços realizados.</p>
          <div>
            <Link to="/servicos" style={{ marginRight: 8 }}>Ver lista</Link>
            <Link to="/servicos/novo">Novo</Link>
          </div>
        </div>
      </div>

    </div>
  );
}