import { Link } from "react-router";

const Header = () => {
  return (
    <div className="fixed top-0 z-10 w-full px-5 sm:px-0">
      <header className="container mx-auto mt-3 flex items-center justify-between rounded-full bg-white/20 px-10 py-3 shadow-2xl backdrop-blur-md">
        <h1 className="font-bold text-white">HUMAN.EXE</h1>

        <nav>
          <ul className="flex gap-3 md:gap-5">
            <li>
              <Link to="/" className="text-white">
                Início
              </Link>
            </li>
            <li>
              <Link to="/desafio" className="text-white">
                Desafio
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
