import { useMemo, useState } from "react";
import { APP_NOME } from "../config/app";
import { OCORRENCIAS_INICIAIS } from "../data/ocorrenciasMock";
import { DISTRITOS, TIPOS_ALERTA, PRIORIDADES, STATUS } from "../data/constantes";
import CardKpi from "../components/CardKpi";
import ModalDetalhes from "../components/ModalDetalhes";

const CLASSE_PRIORIDADE = {
  Baixa: "baixa",
  Média: "media",
  Alta: "alta",
  Crítica: "critica",
};

const CLASSE_STATUS = {
  "Pendente (ACS)": "pendente",
  "Em Triagem (USF)": "triagem",
  "Resolvido (Distrito)": "resolvido",
};

function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function AdminPage() {
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_INICIAIS);
  const [filtroDistrito, setFiltroDistrito] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState("");
  const [selecionada, setSelecionada] = useState(null);

  const visiveis = useMemo(() => {
    return ocorrencias
      .filter((o) => !filtroDistrito || o.distrito === filtroDistrito)
      .filter((o) => !filtroTipo || o.tipoAlerta === filtroTipo)
      .filter((o) => !filtroPrioridade || o.prioridade === filtroPrioridade)
      .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
  }, [ocorrencias, filtroDistrito, filtroTipo, filtroPrioridade]);

  const total = visiveis.length;
  const criticos = visiveis.filter((o) => o.prioridade === "Crítica").length;
  const resolvidos = visiveis.filter((o) => o.status === "Resolvido (Distrito)").length;

  function alterarStatus(id, novoStatus) {
    setOcorrencias((anterior) =>
      anterior.map((o) => (o.id === id ? { ...o, status: novoStatus } : o))
    );
  }

  function limparFiltros() {
    setFiltroDistrito("");
    setFiltroTipo("");
    setFiltroPrioridade("");
  }

  return (
    <section>
      <p className="eyebrow">Inteligência territorial</p>
      <h1>{APP_NOME} - Painel Integrado dos Distritos Sanitários (DS I a DS VIII)</h1>
      <p className="subtitulo">
        Acompanhe os alertas de campo e organize a resposta em cada território.
      </p>

      <div className="filtros cartao">
        <div className="filtros-topo">
          <h2>Recorte territorial</h2>
          <button className="botao-secundario" onClick={limparFiltros}>
            Limpar filtros
          </button>
        </div>

        <div className="filtros-campos">
          <label className="campo">
            Distrito Sanitário
            <select value={filtroDistrito} onChange={(e) => setFiltroDistrito(e.target.value)}>
              <option value="">Todos</option>
              {DISTRITOS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="campo">
            Tipo de Alerta
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="">Todos</option>
              {TIPOS_ALERTA.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="campo">
            Prioridade
            <select
              value={filtroPrioridade}
              onChange={(e) => setFiltroPrioridade(e.target.value)}
            >
              <option value="">Todas</option>
              {PRIORIDADES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="kpis">
        <CardKpi titulo="Total de Registros" valor={total} legenda="Ocorrências no recorte selecionado" />
        <CardKpi
          titulo="Alertas de Prioridade Crítica"
          valor={criticos}
          legenda="Atenção prioritária no território"
          destaque="critico"
        />
        <CardKpi
          titulo="Demandas Resolvidas"
          valor={resolvidos}
          legenda="Resposta concluída pelo distrito"
          destaque="resolvido"
        />
      </div>

      <p className="eyebrow">Ocorrências territoriais</p>
      <div className="tabela-cabecalho">
        <h2>Fila de acompanhamento</h2>
        <span className="dica">{visiveis.length} alerta(s) · mais recentes primeiro</span>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Distrito / Bairro</th>
              <th>Alerta</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.length === 0 && (
              <tr>
                <td colSpan={6} className="vazio">
                  Nenhum alerta encontrado com esses filtros.
                </td>
              </tr>
            )}

            {visiveis.map((o) => (
              <tr key={o.id}>
                <td>{formatarData(o.dataCriacao)}</td>
                <td>
                  <strong>{o.distrito}</strong> · {o.bairro}
                </td>
                <td>{o.tipoAlerta}</td>
                <td>
                  <span className={`selo-badge prioridade-${CLASSE_PRIORIDADE[o.prioridade]}`}>
                    {o.prioridade}
                  </span>
                </td>
                <td>
                  <select
                    className="select-status"
                    value={o.status}
                    onChange={(e) => alterarStatus(o.id, e.target.value)}
                    aria-label={`Alterar status do alerta em ${o.bairro}`}
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <span className={`selo-badge status-${CLASSE_STATUS[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <button className="botao-secundario" onClick={() => setSelecionada(o)}>
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalDetalhes ocorrencia={selecionada} onFechar={() => setSelecionada(null)} />
    </section>
  );
}