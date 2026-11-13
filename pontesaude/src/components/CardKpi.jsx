export default function CardKpi({ titulo, valor, legenda, destaque }) {
  return (
    <div className={destaque ? `kpi kpi-${destaque}` : "kpi"}>
      <span className="kpi-titulo">{titulo}</span>
      <strong className="kpi-valor">{valor}</strong>
      <span className="kpi-legenda">{legenda}</span>
    </div>
  );
}