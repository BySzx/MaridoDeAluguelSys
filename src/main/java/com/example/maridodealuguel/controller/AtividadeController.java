package com.example.maridodealuguel.controller;

import com.example.maridodealuguel.model.Atividade;
import com.example.maridodealuguel.repository.AtividadeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/atividades")
@CrossOrigin(origins = "*")
public class AtividadeController {

    private final AtividadeRepository repo;

    public AtividadeController(AtividadeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Atividade> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Atividade> buscar(@PathVariable Long id) {
        Optional<Atividade> a = repo.findById(id);
        return a.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Atividade criar(@RequestBody Atividade atividade) { return repo.save(atividade); }

    @PutMapping("/{id}")
    public ResponseEntity<Atividade> editar(@PathVariable Long id, @RequestBody Atividade dto) {
        return repo.findById(id).map(existing -> {
            existing.setNome(dto.getNome());
            existing.setDescricao(dto.getDescricao());
            repo.save(existing);
            return ResponseEntity.ok(existing);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagar(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
