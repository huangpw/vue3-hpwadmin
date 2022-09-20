import { createI18n } from "vue-i18n";
import EN from "./en"
import ZH from "./zh"

// 数据源
const messages = {
    en: {
        ...EN
    },
    zh: {
        ...ZH
    }
}

// 设置当前语言
const getCurrentLanguage = () => {
    const UAlang = localStorage.getItem("lang") || navigator.language // zh-CN
    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem("lang", langCode)
    return langCode
}

// 创建I18n
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: getCurrentLanguage() || 'zh',
    messages
})

export default i18n