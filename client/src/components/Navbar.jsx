import { Link } from "react-router";

const Navbar = ({ menuIsOpen }) => {
  const items = [
    { name: "Início", to: "/" },
    { name: "Desafio", to: "/desafio" },
    { name: "Experiências", to: "/experiencias" },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-2 md:flex-row md:gap-6 md:px-0 md:py-0">
        {items.map((item) => (
          <li
            key={item.name}
            className={`transform transition-all delay-100 duration-300 md:translate-x-0 md:transform-none md:opacity-100 md:transition-none ${
              menuIsOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
          >
            <Link
              to={item.to}
              className="relative block rounded-lg text-white transition-all duration-200 before:absolute before:-bottom-1 before:left-1/2 before:h-[2px] before:w-0 before:-translate-x-1/2 before:rounded-full before:bg-white before:transition-all before:duration-300 hover:translate-x-2 hover:bg-white/10 hover:before:w-[80%] md:px-0 md:py-0 md:hover:translate-x-0 md:hover:bg-transparent"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
