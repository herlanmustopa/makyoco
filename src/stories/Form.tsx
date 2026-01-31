import { useState, useRef, useEffect, useCallback } from "react";

export type Option = {
  label: string;
  value: string;
};

export type FormProps = {
  /** Label teks yang ditampilkan di samping dropdown */
  label: string;
  /** Daftar opsi yang tersedia untuk dipilih */
  options: Option[];
  /** Aktifkan mode multi-select */
  multiple?: boolean;
  /** Callback ketika pilihan berubah */
  onChange?: (selected: Option[] | Option | null) => void;
  /** Tampilkan input pencarian di dalam dropdown */
  withSearch?: boolean;
  /** Gunakan style outlined (background abu-abu) */
  outlined?: boolean;
  /** Placeholder teks saat belum ada yang dipilih */
  placeholder?: string;
};

export const Form = ({
  label,
  options,
  multiple = false,
  onChange,
  withSearch = true,
  outlined = false,
  placeholder = "Select...",
}: FormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Option[] | Option | null>(
    multiple ? [] : null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchTerm("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && withSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, withSearch]);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: Option) => {
    if (multiple) {
      const currentSelected = Array.isArray(selected) ? selected : [];
      const isAlreadySelected = currentSelected.some(
        (o) => o.value === option.value
      );
      const updatedSelection = isAlreadySelected
        ? currentSelected.filter((o) => o.value !== option.value)
        : [...currentSelected, option];
      setSelected(updatedSelection);
      onChange?.(updatedSelection);
    } else {
      setSelected(option);
      onChange?.(option);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleRemoveOption = (option: Option) => {
    if (!multiple || !Array.isArray(selected)) return;
    const updatedSelection = selected.filter(
      (o) => o.value !== option.value
    );
    setSelected(updatedSelection);
    onChange?.(updatedSelection);
  };

  const handleClearAll = () => {
    if (multiple) {
      setSelected([]);
      onChange?.([]);
    } else {
      setSelected(null);
      onChange?.(null);
    }
  };

  const isOptionSelected = (option: Option) => {
    if (multiple) {
      return (
        Array.isArray(selected) &&
        selected.some((o) => o.value === option.value)
      );
    }
    return selected !== null && !Array.isArray(selected) && selected.value === option.value;
  };

  const hasSelection = multiple
    ? Array.isArray(selected) && selected.length > 0
    : selected !== null && !Array.isArray(selected);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 text-black font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    } else if (e.key === "Enter" || e.key === " ") {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="flex gap-4 w-full" ref={dropdownRef}>
      <label
        className="text-sm font-medium text-gray-700 min-w-[100px] pt-2"
        id={`${label}-label`}
      >
        {label}
      </label>

      <div className="relative flex-1">
        {/* Dropdown trigger */}
        <div
          className={`border ${
            outlined
              ? "border-gray-400 bg-gray-50"
              : "border-gray-300 bg-white"
          } rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer text-black
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            hover:border-gray-400 transition-colors`}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`${label}-label`}
          tabIndex={0}
        >
          <div className="flex flex-wrap gap-1.5 items-center w-full min-h-[24px]">
            {multiple && Array.isArray(selected) && selected.length > 0
              ? selected.map((option) => (
                  <span
                    key={option.value}
                    className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm border border-green-200"
                  >
                    {option.label}
                    <button
                      type="button"
                      className="ml-1.5 text-green-600 hover:text-green-900 cursor-pointer text-xs font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOption(option);
                      }}
                      aria-label={`Remove ${option.label}`}
                    >
                      ✕
                    </button>
                  </span>
                ))
              : !multiple && selected && !Array.isArray(selected)
              ? (
                <span className="text-gray-900">{selected.label}</span>
              )
              : (
                <span className="text-gray-400">{placeholder}</span>
              )}
          </div>

          <div className="flex items-center gap-1 ml-2 shrink-0">
            {hasSelection && (
              <button
                type="button"
                className="material-icons text-gray-400 hover:text-gray-600 cursor-pointer text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                aria-label="Clear selection"
              >
                close
              </button>
            )}
            <span
              className={`material-icons text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className="absolute mt-1 border border-gray-200 bg-white rounded-lg shadow-lg w-full max-h-60 overflow-hidden z-20"
            role="listbox"
            aria-labelledby={`${label}-label`}
          >
            {/* Search input */}
            {withSearch && (
              <div className="px-3 py-2 flex items-center border-b border-gray-100">
                <span className="material-icons text-gray-400 text-xl">
                  search
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full ml-2 px-2 py-1 text-sm text-gray-700 border-none focus:ring-0 focus:outline-none bg-transparent"
                  placeholder="Search..."
                  aria-label="Search options"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="material-icons text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    close
                  </button>
                )}
              </div>
            )}

            {/* Options list */}
            <ul className="py-1 max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer text-sm flex items-center justify-between
                      transition-colors hover:bg-green-50 ${
                        isOptionSelected(option)
                          ? "bg-green-50 text-green-800 font-medium"
                          : "text-gray-700"
                      }`}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isOptionSelected(option)}
                  >
                    <span>
                      {withSearch
                        ? highlightMatch(option.label, searchTerm)
                        : option.label}
                    </span>
                    {isOptionSelected(option) && (
                      <span className="material-icons text-green-600 text-lg">
                        check
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-400 text-sm text-center">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
