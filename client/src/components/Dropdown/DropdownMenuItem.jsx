export const DropdownMenuItem = ({ children, onClick, active = false }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
    className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-800 transition-colors duration-150 dark:text-zinc-200 ${active ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
    role="menuitem"
  >
    {children}
  </a>
);
