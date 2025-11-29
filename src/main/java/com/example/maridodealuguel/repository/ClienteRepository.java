package com.example.maridodealuguel.repository;

import com.example.maridodealuguel.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
