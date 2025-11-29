package com.example.maridodealuguel.controller;

import com.example.maridodealuguel.model.*;
import com.example.maridodealuguel.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;
import java.util.Optional;

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
    public java.util.List<Servico> listar() {
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
        try {
            Servico s = new Servico();

            // relacionamentos por id (se presentes)
            Long clienteId = parseLong(body.get("clienteId"));
            if (clienteId != null) s.setCliente(clienteRepo.findById(clienteId).orElse(null));

            Long funcionarioId = parseLong(body.get("funcionarioId"));
            if (funcionarioId != null) s.setFuncionario(funcionarioRepo.findById(funcionarioId).orElse(null));

            Long atividadeId = parseLong(body.get("atividadeId"));
            if (atividadeId != null) s.setAtividade(atividadeRepo.findById(atividadeId).orElse(null));

            // campos simples
            s.setDescricao(asString(body.get("descricao")));
            s.setLocalExecucao(asString(body.get("localExecucao")));

            Double custo = parseDouble(body.get("custo"));
            if (custo != null) s.setCusto(custo);

            LocalDate dataServico = parseDate(body.get("dataServico"));
            if (dataServico != null) s.setDataServico(dataServico);

            LocalTime horaInicio = parseTime(body.get("horaInicio"));
            if (horaInicio != null) s.setHoraInicio(horaInicio);

            LocalTime horaFim = parseTime(body.get("horaFim"));
            if (horaFim != null) s.setHoraFim(horaFim);

            Servico salvo = servicoRepo.save(s);
            return ResponseEntity.ok(salvo);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> editar(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        try {
            Optional<Servico> optional = servicoRepo.findById(id);
            if (optional.isEmpty()) return ResponseEntity.notFound().build();

            Servico s = optional.get();

            Long clienteId = parseLong(body.get("clienteId"));
            if (clienteId != null) s.setCliente(clienteRepo.findById(clienteId).orElse(null));
            else if (body.containsKey("clienteId") && body.get("clienteId") == null) s.setCliente(null);

            Long funcionarioId = parseLong(body.get("funcionarioId"));
            if (funcionarioId != null) s.setFuncionario(funcionarioRepo.findById(funcionarioId).orElse(null));
            else if (body.containsKey("funcionarioId") && body.get("funcionarioId") == null) s.setFuncionario(null);

            Long atividadeId = parseLong(body.get("atividadeId"));
            if (atividadeId != null) s.setAtividade(atividadeRepo.findById(atividadeId).orElse(null));
            else if (body.containsKey("atividadeId") && body.get("atividadeId") == null) s.setAtividade(null);

            s.setDescricao(asString(body.get("descricao")));
            s.setLocalExecucao(asString(body.get("localExecucao")));

            Double custo = parseDouble(body.get("custo"));
            if (custo != null) s.setCusto(custo);

            LocalDate dataServico = parseDate(body.get("dataServico"));
            if (dataServico != null) s.setDataServico(dataServico);

            LocalTime horaInicio = parseTime(body.get("horaInicio"));
            if (horaInicio != null) s.setHoraInicio(horaInicio);

            LocalTime horaFim = parseTime(body.get("horaFim"));
            if (horaFim != null) s.setHoraFim(horaFim);

            Servico salvo = servicoRepo.save(s);
            return ResponseEntity.ok(salvo);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagar(@PathVariable Long id) {
        if (!servicoRepo.existsById(id)) return ResponseEntity.notFound().build();
        servicoRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ---------- helpers ----------
    private String asString(Object o) {
        if (o == null) return null;
        return o.toString();
    }

    private Long parseLong(Object o) {
        if (o == null) return null;
        try {
            String s = o.toString();
            if (s.isBlank()) return null;
            return Long.valueOf(s);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid long");
        }
    }

    private Double parseDouble(Object o) {
        if (o == null) return null;
        try {
            String s = o.toString();
            if (s.isBlank()) return null;
            return Double.valueOf(s);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid double");
        }
    }

    private LocalDate parseDate(Object o) {
        if (o == null) return null;
        try {
            String s = o.toString();
            if (s.isBlank()) return null;
            return LocalDate.parse(s);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid date");
        }
    }

    private LocalTime parseTime(Object o) {
        if (o == null) return null;
        try {
            String s = o.toString();
            if (s.isBlank()) return null;
            return LocalTime.parse(s);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid time");
        }
    }
}
