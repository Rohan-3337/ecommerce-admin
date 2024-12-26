import { useTheme } from "next-themes";

const DebugTheme = () => {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
    </div>
  );
};

export default DebugTheme;
