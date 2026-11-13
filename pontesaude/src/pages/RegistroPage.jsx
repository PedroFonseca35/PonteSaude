import { useState } from "react";
import { APP_NOME } from "../config/app";
import { DISTRITOS, TIPOS_ALERTA, PRIORIDADES } from "../data/constantes";

const FORM_INICIAL = {
  distrito: "",
  bairro: "",
  tipoAlerta: "",
  prioridade: "",
  referencia: "",
  descricao: "",
};

export default function RegistroPage() {
  const [form, setForm] = useState(FORM_INICIAL);

  function atualizar(campo, valor) {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const ocorrencia = {
      ...form,
      status: "Pendente (ACS)",
      dataCriacao: new Date().toISOString(),
    };

    console.log("Ocorrência:", ocorrencia);

    alert("Alerta de campo registrado com sucesso!");
    setForm(FORM_INICIAL);
  }

  return (
    <section className="pagina-registro">
      <p className="eyebrow">Vigilância e cuidado no território</p>
      <h1>{APP_NOME} - Coleta de Campo (ACS)</h1>
      <p className="subtitulo">
        Um alerta de campo conecta a necessidade local à resposta do distrito.
      </p>

      <form className="cartao" onSubmit={handleSubmit}>
        <h2 className="secao-rotulo">01 / Identificação territorial</h2>

        <div className="linha">
          <label className="campo">
            Distrito Sanitário
            <select
              value={form.distrito}
              onChange={(e) => atualizar("distrito", e.target.value)}
              required
            >
              <option value="">Selecione o distrito</option>
              {DISTRITOS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="campo">
            Bairro
            <input
              type="text"
              placeholder="Nome do bairro"
              value={form.bairro}
              onChange={(e) => atualizar("bairro", e.target.value)}
              required
            />
          </label>
        </div>

        <div className="linha">
          <label className="campo">
            Tipo de Alerta
            <select
              value={form.tipoAlerta}
              onChange={(e) => atualizar("tipoAlerta", e.target.value)}
              required
            >
              <option value="">Selecione o tipo de alerta</option>
              {TIPOS_ALERTA.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="campo">
            Nível de Prioridade
            <select
              value={form.prioridade}
              onChange={(e) => atualizar("prioridade", e.target.value)}
              required
            >
              <option value="">Selecione a prioridade</option>
              {PRIORIDADES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="campo">
          Ponto de referência / Microárea
          <input
            type="text"
            placeholder="Ex.: próximo à unidade de saúde, microárea 03"
            value={form.referencia}
            onChange={(e) => atualizar("referencia", e.target.value)}
          />
        </label>

        <h2 className="secao-rotulo">02 / Relato de campo</h2>

        <label className="campo">
          Descrição da Ocorrência
          <textarea
            rows={6}
            placeholder="Descreva a situação, o local e a necessidade identificada. Evite dados pessoais de pacientes."
            value={form.descricao}
            onChange={(e) => atualizar("descricao", e.target.value)}
            required
          />
        </label>

        <p className="dica">
          Registre apenas informações necessárias à gestão do território. Não inclua nome,
          CPF ou diagnóstico individual.
        </p>

        <button type="submit" className="botao-enviar">
          Enviar Alerta de Campo
        </button>
      </form>
    </section>
  );
}