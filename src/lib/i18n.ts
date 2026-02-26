import i18next from "i18next";
import Cookies from "js-cookie";
import en_lang from "../../public/locales/en.json";
import ar_lang from "../../public/locales/ar.json";
import { initReactI18next } from "react-i18next";

// Language constants
export const firstLang = "first_lang"; // Arabic
export const english = "english"; // English
export const cookiesLang = "lang";

// Get the stored language or default to Arabic
const storedLang = Cookies.get(cookiesLang) || firstLang;
Cookies.set(cookiesLang, storedLang, { expires: 365 }); // Store in cookies

// Initialize i18next
i18next
  .use(initReactI18next) // Connect i18next with React
  .init({
    interpolation: { escapeValue: false },
    lng: storedLang,
    fallbackLng: english,
    resources: {
      first_lang: { mainInfo: ar_lang },
      english: { mainInfo: en_lang },
    },
  });

export default i18next;