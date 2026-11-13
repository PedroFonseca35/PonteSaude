export default function ModalDetalhes({ ocorrencia, onFechar }) {
  if (!ocorrencia) return null;

  const campos = [
    ["Data de registro", new Date(ocorrencia.dataCriacao).toLocaleString("pt-BR")],
    ["Distrito Sanitário", ocorrencia.distrito],
    ["Bairro", ocorrencia.bairro],
    ["Tipo de alerta", ocorrencia.tipoAlerta],
    ["Prioridade", ocorrencia.prioridade],
    ["Status", ocorrencia.status],
    ["Ponto de referência / Microárea", ocorrencia.referencia || "Não informado"],
    ["Descrição da ocorrência", ocorrencia.descricao],
  ];

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Detalhes da ocorrência</h2>

        {campos.map(([rotulo, valor]) => (
          <div className="modal-campo" key={rotulo}>
            <strong>{rotulo}</strong>
            <span>{valor}</span>
          </div>
        ))}

        <button className="botao-secundario" onClick={onFechar}>
          Fechar
        </button>
      </div>
    </div>
  );
}