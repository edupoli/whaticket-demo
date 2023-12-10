// import React from "react";
// import { useTranslation } from "react-i18next";
// import * as FlagKit from "react-flag-kit";

// function LanguageSelector() {
//   const { t, i18n } = useTranslation();

//   const handleChangeLanguage = (language) => {
//     i18n.changeLanguage(language); // Altera o idioma usando react-i18next
//   };

//   return (
//     <div>
//       <h4>{t("SelectLanguage")}</h4>
//       <button onClick={() => handleChangeLanguage("pt")}>
//         <FlagKit code="BR" size={24} />
//         {t("Portuguese")}
//       </button>
//       <button onClick={() => handleChangeLanguage("en")}>
//         <FlagKit code="US" size={24} />
//         {t("English")}
//       </button>
//       <button onClick={() => handleChangeLanguage("es")}>
//         <FlagKit code="ES" size={24} />
//         {t("Spanish")}
//       </button>
//       {/* Adicione mais botões de idioma conforme necessário */}
//     </div>
//   );
// }

// export default LanguageSelector;

// LanguageSelector.js
// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('pt-BR')}>PT</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
      {/* Adicione mais botões conforme necessário */}
    </div>
  );
};

export default LanguageSelector;
