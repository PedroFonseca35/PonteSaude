import { NavLink, Outlet } from "react-router-dom";
import { APP_NOME, APP_SUBTITULO } from "../config/app";

export default function Layout() {
  return (
    <>
      <header className="topbar">
        <span className="logo">{APP_NOME}</span>
        <nav>
          <NavLink to="/" end>
            Coleta de Campo
          </NavLink>
          <NavLink to="/admin">Painel Integrado</NavLink>
        </nav>
      </header>

      <main className="conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        {APP_NOME} | {APP_SUBTITULO}
      </footer>
    </>
  );
}