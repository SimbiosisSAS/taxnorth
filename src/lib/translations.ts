export type SupportedLanguage = 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'pa'

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  zh: '中文',
  ar: 'العربية',
  pa: 'ਪੰਜਾਬੀ',
}

export const translations: Record<SupportedLanguage, {
  welcome: string
  welcomeSub: string
  placeholder: string
  connectPro: string
  disclaimer: string
  referralText: string
  referralButton: string
  newConversation: string
  suggestedQuestions: string[]
}> = {
  en: {
    welcome: "Hi, I'm TaxNorth.",
    welcomeSub: "Ask me anything about Canadian taxes — in any language.",
    placeholder: "Ask your tax question...",
    connectPro: "Connect with a Pro",
    disclaimer: "Educational guidance only — not professional tax advice",
    referralText: "Need a licensed tax professional? We can connect you.",
    referralButton: "Connect me →",
    newConversation: "New conversation",
    suggestedQuestions: [
      "Do I need to file taxes in Canada?",
      "What is a T4 form?",
      "Am I eligible for any tax credits?"
    ]
  },
  fr: {
    welcome: "Bonjour, je suis TaxNorth.",
    welcomeSub: "Posez-moi n'importe quelle question sur les impôts canadiens.",
    placeholder: "Posez votre question fiscale...",
    connectPro: "Contacter un Pro",
    disclaimer: "Informations éducatives uniquement — pas de conseils fiscaux professionnels",
    referralText: "Besoin d'un professionnel fiscal agréé? Nous pouvons vous mettre en contact.",
    referralButton: "Me connecter →",
    newConversation: "Nouvelle conversation",
    suggestedQuestions: [
      "Dois-je produire une déclaration de revenus au Canada?",
      "Qu'est-ce qu'un feuillet T4?",
      "Ai-je droit à des crédits d'impôt?"
    ]
  },
  es: {
    welcome: "Hola, soy TaxNorth.",
    welcomeSub: "Pregúntame cualquier cosa sobre los impuestos canadienses.",
    placeholder: "Haz tu pregunta sobre impuestos...",
    connectPro: "Conectar con un Profesional",
    disclaimer: "Solo orientación educativa — no es asesoría fiscal profesional",
    referralText: "¿Necesitas un contador certificado? Podemos conectarte.",
    referralButton: "Conéctame →",
    newConversation: "Nueva conversación",
    suggestedQuestions: [
      "¿Necesito presentar impuestos en Canadá?",
      "¿Qué es un formulario T4?",
      "¿Tengo derecho a créditos fiscales?"
    ]
  },
  zh: {
    welcome: "你好，我是 TaxNorth。",
    welcomeSub: "用任何语言向我提问有关加拿大税务的问题。",
    placeholder: "提问您的税务问题...",
    connectPro: "联系专业人士",
    disclaimer: "仅供教育参考 — 不构成专业税务建议",
    referralText: "需要持牌税务专业人士？我们可以为您联系。",
    referralButton: "联系我 →",
    newConversation: "新对话",
    suggestedQuestions: [
      "我需要在加拿大报税吗？",
      "什么是T4表格？",
      "我是否有资格获得税收抵免？"
    ]
  },
  ar: {
    welcome: "مرحباً، أنا TaxNorth.",
    welcomeSub: "اسألني أي سؤال حول الضرائب الكندية — بأي لغة.",
    placeholder: "اطرح سؤالك الضريبي...",
    connectPro: "التواصل مع محترف",
    disclaimer: "إرشادات تعليمية فقط — ليست نصيحة ضريبية مهنية",
    referralText: "هل تحتاج إلى محترف ضرائب مرخص؟ يمكننا التواصل معك.",
    referralButton: "تواصل معي →",
    newConversation: "محادثة جديدة",
    suggestedQuestions: [
      "هل يجب أن أقدم إقرارًا ضريبيًا في كندا؟",
      "ما هو نموذج T4؟",
      "هل أنا مؤهل للحصول على الائتمانات الضريبية؟"
    ]
  },
  pa: {
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ TaxNorth ਹਾਂ।",
    welcomeSub: "ਕੈਨੇਡੀਅਨ ਟੈਕਸਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ — ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ।",
    placeholder: "ਆਪਣਾ ਟੈਕਸ ਸਵਾਲ ਪੁੱਛੋ...",
    connectPro: "ਪੇਸ਼ੇਵਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    disclaimer: "ਸਿਰਫ਼ ਵਿਦਿਅਕ ਮਾਰਗਦਰਸ਼ਨ — ਪੇਸ਼ੇਵਰ ਟੈਕਸ ਸਲਾਹ ਨਹੀਂ",
    referralText: "ਕੀ ਤੁਹਾਨੂੰ ਲਾਇਸੰਸਸ਼ੁਦਾ ਟੈਕਸ ਪੇਸ਼ੇਵਰ ਦੀ ਲੋੜ ਹੈ?",
    referralButton: "ਮੈਨੂੰ ਕਨੈਕਟ ਕਰੋ →",
    newConversation: "ਨਵੀਂ ਗੱਲਬਾਤ",
    suggestedQuestions: [
      "ਕੀ ਮੈਨੂੰ ਕੈਨੇਡਾ ਵਿੱਚ ਟੈਕਸ ਭਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
      "T4 ਫਾਰਮ ਕੀ ਹੈ?",
      "ਕੀ ਮੈਂ ਟੈਕਸ ਕ੍ਰੈਡਿਟ ਲਈ ਯੋਗ ਹਾਂ?"
    ]
  }
}