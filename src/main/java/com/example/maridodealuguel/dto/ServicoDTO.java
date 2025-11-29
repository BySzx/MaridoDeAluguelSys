package com.example.maridodealuguel.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class ServicoDTO {
    public Integer idCliente;
    public Integer idFuncionario;
    public LocalDate dataServico;
    public LocalTime horaInicio;
    public LocalTime horaFim;
    public String observacao;
    public List<String> atividades;
}
