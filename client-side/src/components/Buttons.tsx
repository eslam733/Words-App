export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  red?: boolean;
  green?: boolean;
  label: string;
  onClick?: any;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  red,
  green,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded bg-indigo-500 p-1 m-10 w-40 font-medium  ${
        red ? "text-red-500" : green ? "text-green-400" : "text-white"
      }`}
    >
      {label}
    </button>
  );
};
