-- ============================================================================
-- Seed the "footer" settings row (SettingsMap.footer in types/database.ts had
-- no matching seed row — the /admin/footer editor needs one to exist).
-- Copy sourced from messages/en.json and messages/ar.json Footer keys.
-- ============================================================================
insert into settings (key, value) values
  ('footer', '{
    "blurbEn": "Dr. Osama Mowafy is dedicated to advancing the field of neurosurgery with technical precision and compassionate, patient-centered care.",
    "blurbAr": "يكرّس الدكتور أسامة موافي خبرته لتطوير جراحة المخ والأعصاب من خلال الدقة التقنية العالية والرعاية الإنسانية التي تضع المريض في المقام الأول.",
    "quickLinksLabelEn": "Quick Links",
    "quickLinksLabelAr": "روابط سريعة",
    "legalLabelEn": "Legal",
    "legalLabelAr": "الشؤون القانونية",
    "contactLabelEn": "Contact",
    "contactLabelAr": "التواصل",
    "privacyPolicyEn": "Privacy Policy",
    "privacyPolicyAr": "سياسة الخصوصية",
    "termsOfServiceEn": "Terms of Service",
    "termsOfServiceAr": "الشروط والأحكام",
    "copyrightEn": "©️ {year} NeuroPrecision. All rights reserved.",
    "copyrightAr": "©️ {year} نيوروبريجن. جميع الحقوق محفوظة."
  }')
on conflict (key) do nothing;
