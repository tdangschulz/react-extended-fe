import { FC, ReactNode, createContext, useState } from "react";
import { locales } from "../locale";

type Props = {
  children: ReactNode;
};

type LocaleContextType = {
  switchLocale: () => void;
  locale: Record<string, string>;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: {},
  switchLocale: () => {},
});

export const LocaleProvider: FC<Props> = ({ children }) => {
  const [currentLocal, setCurrentLocale] = useState<"de" | "en">("de");

  const [locale, setLocale] = useState<Record<string, string>>(locales["de"]);

  const switchLocale = () => {
    let toSwitch: "de" | "en";
    if (currentLocal === "de") {
      toSwitch = "en";
    } else {
      toSwitch = "de";
    }

    setCurrentLocale(toSwitch);
    setLocale(locales[toSwitch]);
  };

  return (
    <LocaleContext.Provider value={{ switchLocale, locale }}>
      {children}
    </LocaleContext.Provider>
  );
};
