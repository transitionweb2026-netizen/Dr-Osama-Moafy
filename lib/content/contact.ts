import { unstable_cache } from "next/cache";
import { pickSection, type Locale } from "./shared";
import { getSections } from "./sections";
import type { ContactHeroContent } from "@/sections/contact/ContactHero";
import type { QuickContactStripContent } from "@/sections/contact/QuickContactStrip";
import type { ContactFormContent } from "@/sections/contact/ContactForm";
import type { ContactInfoPanelContent } from "@/sections/contact/ContactInfoPanel";
import type { DoctorMessageBarContent } from "@/sections/contact/DoctorMessageBar";

const getContactSectionsRaw = unstable_cache(() => getSections("contact"), ["contact-sections"], {
  tags: ["sections"],
  revalidate: false,
});

export async function getContactPageContent(locale: Locale) {
  const sections = await getContactSectionsRaw();
  return {
    hero: pickSection(sections, "hero", locale) as unknown as ContactHeroContent,
    quickStrip: pickSection(sections, "quickStrip", locale) as unknown as QuickContactStripContent,
    form: pickSection(sections, "form", locale) as unknown as ContactFormContent,
    infoPanel: pickSection(sections, "infoPanel", locale) as unknown as ContactInfoPanelContent,
    messageBar: pickSection(sections, "messageBar", locale) as unknown as DoctorMessageBarContent,
  };
}
