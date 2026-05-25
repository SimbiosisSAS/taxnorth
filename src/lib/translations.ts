export type SupportedLanguage = 'en' | 'fr' | 'es' | 'zh' | 'ar' | 'pa' | 'ro' | 'uk' | 'ja' | 'ko' | 'fa' | 'tr'

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  zh: '中文',
  ar: 'العربية',
  pa: 'ਪੰਜਾਬੀ',
  ro: 'Română',
  uk: 'Українська',
  ja: '日本語',
  ko: '한국어',
  fa: 'دری',
  tr: 'Türkçe',
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
  },
  ro: {
    welcome: "Bună ziua, sunt TaxNorth.",
    welcomeSub: "Întreabă-mă orice despre taxele canadiene — în orice limbă.",
    placeholder: "Pune-ți întrebarea fiscală...",
    connectPro: "Contactează un profesionist",
    disclaimer: "Numai îndrumări educaționale — nu sfaturi fiscale profesionale",
    referralText: "Ai nevoie de un profesionist fiscal autorizat? Te putem conecta.",
    referralButton: "Conectează-mă →",
    newConversation: "Conversație nouă",
    suggestedQuestions: [
      "Trebuie să depun taxe în Canada?",
      "Ce este un formular T4?",
      "Sunt eligibil pentru credite fiscale?"
    ]
  },
  uk: {
    welcome: "Привіт, я TaxNorth.",
    welcomeSub: "Запитайте мене про канадські податки — будь-якою мовою.",
    placeholder: "Задайте своє податкове питання...",
    connectPro: "Зв'язатися з фахівцем",
    disclaimer: "Лише освітня інформація — не професійна податкова порада",
    referralText: "Потрібен ліцензований податковий фахівець? Ми можемо вас з'єднати.",
    referralButton: "З'єднати мене →",
    newConversation: "Нова розмова",
    suggestedQuestions: [
      "Чи потрібно мені подавати податки в Канаді?",
      "Що таке форма T4?",
      "Чи маю я право на податкові пільги?"
    ]
  },
  ja: {
    welcome: "こんにちは、TaxNorthです。",
    welcomeSub: "カナダの税金について何でも聞いてください。",
    placeholder: "税金の質問を入力してください...",
    connectPro: "専門家に接続",
    disclaimer: "教育的な情報のみ — 専門的な税務アドバイスではありません",
    referralText: "認定税務専門家が必要ですか？つなぎましょう。",
    referralButton: "つないでください →",
    newConversation: "新しい会話",
    suggestedQuestions: [
      "カナダで確定申告が必要ですか？",
      "T4フォームとは何ですか？",
      "税額控除の資格がありますか？"
    ]
  },
  ko: {
    welcome: "안녕하세요, 저는 TaxNorth입니다.",
    welcomeSub: "캐나다 세금에 대해 어떤 언어로든 질문하세요.",
    placeholder: "세금 질문을 입력하세요...",
    connectPro: "전문가와 연결",
    disclaimer: "교육 정보만 제공 — 전문적인 세금 조언이 아님",
    referralText: "공인 세금 전문가가 필요하신가요? 연결해 드릴게요.",
    referralButton: "연결해 주세요 →",
    newConversation: "새 대화",
    suggestedQuestions: [
      "캐나다에서 세금 신고를 해야 하나요?",
      "T4 양식이란 무엇인가요?",
      "세금 공제를 받을 자격이 있나요?"
    ]
  },
  fa: {
    welcome: "سلام، من TaxNorth هستم.",
    welcomeSub: "هر سوالی درباره مالیات کانادا بپرسید — به هر زبانی.",
    placeholder: "سوال مالیاتی خود را بنویسید...",
    connectPro: "ارتباط با متخصص",
    disclaimer: "فقط راهنمایی آموزشی — نه مشاوره مالیاتی حرفه‌ای",
    referralText: "آیا به متخصص مالیاتی مجاز نیاز دارید؟ می‌توانیم شما را متصل کنیم.",
    referralButton: "مرا متصل کنید →",
    newConversation: "مکالمه جدید",
    suggestedQuestions: [
      "آیا باید در کانادا اظهارنامه مالیاتی بدهم؟",
      "فرم T4 چیست؟",
      "آیا واجد شرایط اعتبارات مالیاتی هستم؟"
    ]
  },
  tr: {
    welcome: "Merhaba, ben TaxNorth.",
    welcomeSub: "Kanada vergileri hakkında herhangi bir dilde soru sorun.",
    placeholder: "Vergi sorunuzu yazın...",
    connectPro: "Uzmanla Bağlan",
    disclaimer: "Yalnızca eğitim rehberliği — profesyonel vergi tavsiyesi değil",
    referralText: "Lisanslı bir vergi uzmanına mı ihtiyacınız var? Sizi bağlayabiliriz.",
    referralButton: "Bağlan →",
    newConversation: "Yeni konuşma",
    suggestedQuestions: [
      "Kanada'da vergi beyannamesi vermem gerekiyor mu?",
      "T4 formu nedir?",
      "Vergi kredilerine hak kazanıyor muyum?"
    ]
  }
}