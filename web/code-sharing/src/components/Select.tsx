interface SelectProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const Select = ({ language, setLanguage }: SelectProps) => {
  const languagesOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "html", label: "HTML" },
    { value: "python", label: "Python" },
    { value: "typescript", label: "TypeScript" },
    { value: "sql", label: "SQL" },
    { value: "css", label: "CSS" },
    { value: "go", label: "Go" },
    { value: "php", label: "PHP" },
  ];

  return (
    <select
      className="text-white border-2 border-white text-sm rounded-xl px-1"
      id="language"
      name="language"
      onChange={(e) => setLanguage(e.target.value)}
      value={language}
    >
      {languagesOptions.map((lang) => (
        <option value={lang.value}>{lang.label}</option>
      ))}
    </select>
  );
};
