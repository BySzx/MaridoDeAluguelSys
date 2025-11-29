package com.example.maridodealuguel.controller;

import com.example.maridodealuguel.model.*;
import com.example.maridodealuguel.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/servicos")
@CrossOrigin(origins = "*")
public class ServicoController {

    private final ServicoRepository servicoRepo;
    private final ClienteRepository clienteRepo;
    private final FuncionarioRepository funcionarioRepo;
    private final AtividadeRepository atividadeRepo;

    public ServicoController(
            ServicoRepository servicoRepo,
            ClienteRepository clienteRepo,
            FuncionarioRepository funcionarioRepo,
            AtividadeRepository atividadeRepo
    ) {
        this.servicoRepo = servicoRepo;
        this.clienteRepo = clienteRepo;
        this.funcionarioRepo = funcionarioRepo;
        this.atividadeRepo = atividadeRepo;
    }

    @GetMapping
    public List<Servico> listar() {
        return servicoRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscar(@PathVariable Long id) {
        return servicoRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Servico> criar(@RequestBody Map<String, Object> body) {

        Servico s = new Servico();

        s.setCliente(clienteRepo.findById(Long.valueOf(body.get("clienteId").toString())).orElse(null));
        s.setFuncionario(funcionarioRepo.findById(Long.valueOf(body.get("funcionarioId").toString())).orElse(null));
        s.setAtividade(atividadeRepo.findById(Long.valueOf(body.get("atividadeId").toString())).orElse(null));

        s.setDescricao((String) body.get("descricao"));
        s.setLocalExecucao((String) body.get("localExecucao"));
        s.setCusto(Double.valueOf(body.get("custo").toString()));

        s.setDataServico(java.time.LocalDate.parse(body.get("dataServico").toString()));
        s.setHoraInicio(java.time.LocalTime.parse(body.get("horaInicio").toString()));
        s.setHoraFim(java.time.LocalTime.parse(body.get("horaFim").toString()));

        servicoRepo.save(s);
        return ResponseEntity.ok(s);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> editar(@PathVariable Long id, @RequestBody Map<String, Object> body) {

        Optional<Servico> optional = servicoRepo.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Servico s = optional.get();

        s.setCliente(clienteRepo.findById(Long.valueOf(body.get("clienteId").toString())).orElse(null));
        s.setFuncionario(funcionarioRepo.findById(Long.valueOf(body.get("funcionarioId").toString())).orElse(null));
        s.setAtividade(atividadeRepo.findById(Long.valueOf(body.get("atividadeId").toString())).orElse(null));

        s.setDescricao((String) body.get("descricao"));
        s.setLocalExecucao((String) body.get("localExecucao"));
        s.setCusto(Double.valueOf(body.get("custo").toString()));

        s.setDataServico(java.time.LocalDate.parse(body.get("dataServico").toString()));
        s.setHoraInicio(java.time.LocalTime.parse(body.get("horaInicio").toString()));
        s.setHoraFim(java.time.LocalTime.parse(body.get("horaFim").toString()));

        servicoRepo.save(s);
        return ResponseEntity.ok(s);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagar(@PathVariable Long id) {
        if (!servicoRepo.existsById(id)) return ResponseEntity.notFound().build();
        servicoRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
