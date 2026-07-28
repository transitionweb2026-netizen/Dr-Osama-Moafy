import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

export function KnowledgeBar() {
  const t = useTranslations("Blog.knowledgeBar");

  return (
    <RevealSection as="section" className="relative py-xl">
      <div className="relative z-10 mx-auto max-w-screen-2xl px-margin-desktop">
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-xl md:flex md:items-center md:justify-between">
          <div className="w-full text-center">
            <h2 className="mb-base font-headline-md text-headline-md text-primary">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-[36rem] text-body-lg text-on-surface-variant">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
