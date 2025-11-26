import i18n from "../i18n";

const LanguageSwitcher = () => {
    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    return (
        <select
            value={i18n.language}   // FIXED
            onChange={(e) => changeLang(e.target.value)}
            className="p-1.5 rounded-md bg-bg border border-gray-200 text-text"
        >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ma">मराठी</option>
            <option value="ra">राजस्थानी</option>
            <option value="te">తెలుగు</option>
        </select>
    );
}

export default LanguageSwitcher;
