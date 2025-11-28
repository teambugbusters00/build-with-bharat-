import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import hi from "./hi";
import ma from "./ma";
import ra from "./ra";
import te from "./te";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            hi: {
                translation: hi,
            },
            ma: {
                translation: ma,
            },
            ra: {
                translation: ra,
            },
            te: {
                translation: te,
            },
        },
        lng: localStorage.getItem("lang") || "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;