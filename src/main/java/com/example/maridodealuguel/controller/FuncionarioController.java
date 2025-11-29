package com.example.maridodealuguel.controller;

import com.example.maridodealuguel.model.Funcionario;
import com.example.maridodealuguel.repository.FuncionarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {

    private final FuncionarioRepository repo;

    public FuncionarioController(FuncionarioRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Funcionario> listar() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscar(@PathVariable Long id) {
        Optional<Funcionario> f = repo.findById(id);
        return f.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Funcionario criar(@RequestBody Funcionario funcionario) {
        return repo.save(funcionario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> editar(@PathVariable Long id, @RequestBody Funcionario dto) {
        return repo.findById(id).map(existing -> {
            existing.setNome(dto.getNome());
            existing.setTelefone(dto.getTelefone());
            existing.setEmail(dto.getEmail());
            existing.setCpf(dto.getCpf());
            existing.setEspecialidade(dto.getEspecialidade());
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
