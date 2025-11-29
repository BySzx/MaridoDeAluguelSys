import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./paginas/Home";
import ListaServicos from "./paginas/servicos/ListaServicos";
import ServicoForm from "./paginas/servicos/ServicoForm";
import ServicoDetalhes from "./paginas/servicos/ServicoDetalhes";
import ClienteLista from "./paginas/Clientes/ClienteLista";
import ClienteForm from "./paginas/Clientes/ClienteForm";
import ClienteDetalhes from "./paginas/Clientes/ClienteDetalhes";
import FuncionarioLista from "./paginas/Funcionarios/FuncionarioLista";
import FuncionarioForm from "./paginas/Funcionarios/FuncionarioForm";
import FuncionarioDetalhes from "./paginas/Funcionarios/FuncionarioDetalhes";
import AtividadeLista from "./paginas/Atividades/AtividadeLista";
import AtividadeForm from "./paginas/Atividades/AtividadeForm";
import AtividadeDetalhes from "./paginas/Atividades/AtividadeDetalhes";

function App() {
  return (
    <BrowserRouter>
    <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<ListaServicos />} />
        <Route path="/servicos/novo" element={<ServicoForm />} />
        <Route path="/servicos/editar/:id" element={<ServicoForm />} />
        <Route path="/servicos/:id" element={<ServicoDetalhes />} />
        <Route path="/clientes" element={<ClienteLista />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />
        <Route path="/clientes/:id" element={<ClienteDetalhes />} />
        <Route path="/funcionarios" element={<FuncionarioLista />} />
        <Route path="/funcionarios/novo" element={<FuncionarioForm />} />
        <Route path="/funcionarios/editar/:id" element={<FuncionarioForm />} />
        <Route path="/funcionarios/:id" element={<FuncionarioDetalhes />} />
        <Route path="/atividades" element={<AtividadeLista />} />
        <Route path="/atividades/novo" element={<AtividadeForm />} />
        <Route path="/atividades/editar/:id" element={<AtividadeForm />} />
        <Route path="/atividades/:id" element={<AtividadeDetalhes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
