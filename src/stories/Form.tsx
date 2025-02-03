import  { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type FormProps = {
  label: string;
  options: Option[];
  multiple?: boolean;
  onChange: (selected: Option[] | Option | null) => void;
  withSearch: boolean;
  outlined?: boolean;
};

export const Form = ({
    label,
    options,
    multiple = false,
    onChange,
    withSearch = true,
    outlined = false,
  }: FormProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState<Option[] | Option | null>(multiple ? [] : null);

    const handleOptionClick = (option: Option) => {
      if (multiple) {
        const currentSelected = Array.isArray(selected) ? selected : [];
        const isSelected = currentSelected.find((o) => o.value === option.value);
        const updatedSelection = isSelected
          ? currentSelected.filter((o) => o.value !== option.value)
          : [...currentSelected, option];
        setSelected(updatedSelection);
        onChange(updatedSelection);
      } else {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
      }
    };

    const handleRemoveOption = (option: Option) => {
      setSelected((prevSelected) =>
        (prevSelected as Option[]).filter((o) => o.value !== option.value)
      );
      onChange(
        (selected as Option[]).filter((o) => o.value !== option.value)
      );
    };

    const isSelected = (option: Option) => {
      if (multiple) {
        return Array.isArray(selected) && selected.some((o) => o.value === option.value);
      }
      return (selected as Option)?.value === option.value;
    };

    const highlightMatch = (text: string, query: string) => {
      if (!query) return text;

      const regex = new RegExp(`(${query})`, "gi");
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-green-700">
            {part}
          </span>
        ) : (
          part
        )
      );
    };

    return (
      <div className="flex  gap-4 w-full">
        <label className="text-sm font-medium text-gray-700 min-w-[100px]">
          {label}
        </label>

        <div className="relative flex-1">
          <div
            className={`border ${
              outlined ? "border-gray-300 bg-gray-100" : "border-gray-300 bg-white"
            } rounded px-3 py-2 flex items-center justify-between cursor-pointer text-black`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="flex flex-wrap gap-2 items-center w-full">
              {multiple && Array.isArray(selected)
                ? selected.map((option) => (
                    <span
                      key={option?.value}
                      className="flex items-center bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {option?.label}
                      <span
                        className="ml-2 text-gray-900 hover:text-gray-800 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOption(option);
                        }}
                      >
                        ✕
                      </span>
                    </span>
                  ))
                : (selected as Option | null)?.label || (
                    <span className="text-gray-600">Select...</span>
                  )}
            </div>
            <span className="material-icons text-gray-500">arrow_drop_down</span>
          </div>

          {isOpen && (
            <div className="absolute mt-2 border border-gray-300 bg-white rounded shadow-lg w-full max-h-60 overflow-y-auto z-20">
              {withSearch && (
                <div className="px-3 py-2 flex items-center border-b border-gray-100">
                  <span className="material-icons text-gray-500">search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full ml-3 px-2 py-1 text-sm text-gray-700 border-none focus:ring-0 focus:outline-none"
                    placeholder="Search..."
                  />
                  {searchTerm && (
                    <span
                      className="material-icons text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={() => setSearchTerm("")}
                    >
                      close
                    </span>
                  )}
                </div>
              )}
              <ul className="py-2">
                {options.length > 0 ? (
                  options.map((option) => (
                    <li
                      key={option.value}
                      className={`px-4 py-2 cursor-pointer text-sm hover:bg-green-50 ${
                        isSelected(option) ? "bg-green-100 text-black" : "text-gray-700"
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {highlightMatch(option.label, searchTerm)}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">No options found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
