import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHh9ag9tHDT1XpTRcFbgo6xuoLablkLXH0CXciVR8tCSJCu3H4_Utvk4EdRSVi2WnG3T9SWZJVDyDWFDYvWjuzuTQ9_PzjpqPiaL5qRD9Tjudw8OwOHKQ1QAKCr0Y1BO5NvUZVidf4qlz4vW9WrgAUqM8dW4KU60omWIhPl4CQ9iAUE_TaITQ23ypaIwiSIdVnXhgJ9dbzIqky81bXLVAns49nFk9_UpOZe8OQ7YGlmA-fg-0pBzFoRENCB9EG8x-wZltCmN3WW3c",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCV70YVoOqy6ad38PZWKzT91Y8VHWYEDgyGABgFg6iT7NqmXTFa573tuKuG1M-fouUFvBBh22Dtb5W4O18jfet-k5XsFTQnaGUsKzvR49SxQR9XTlcEX2aX4sgJnphcFLCIcxuFyRJwxaomjoUCWk4jVLizRWjgqQFjeth3ZBAlefIPRdQSoqrQlLsxjw1zPL9f17MRiTyEX-20rowCBNboe9i-OjK7YlBvu8qEuAVCpzbjH_JUzc76AoG9gilVYNhxQShv_m1P7zg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC1P5WEPmvNq7rj_evoU7JDLx0H3KWZwkpMg1kQ1vbDEFbqz0gmbuEwRDEEa998CDVEaynMjP9NNxVVUifOdrgGcwbAe1OMYWkIrYgG1Gf584rJIq5RrWv6NO69FxBcvXLhDzTDWr0iEZ85R-6ff2MndwKnfUs-sLClsnItPOYPVAlRjGEy0WqCUEBLy9Itmg3zH5EcUzeVjsbuQuEiRNvRKS92zmyXDeYNWqpsaK97yqb1b8tRRFfkQ8h_pIHuqRpGdb5D2JKKSPA",
];

export function Specialties() {
  const t = useTranslations("Home.specialties");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <RevealSection
      as="section"
      className="bg-surface-container-low px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="mb-2 font-label-md text-secondary uppercase">
            {t("eyebrow")}
          </h3>
          <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
            {t("title")}
          </h2>
        </div>
        <Link
          href="/services"
          className="font-label-md uppercase tracking-widest text-primary transition-colors duration-[250ms] hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} group rounded-3xl border border-outline-variant bg-surface-container-lowest p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl`}
          >
            <div className="mb-6 h-64 overflow-hidden rounded-2xl">
              <Image
                src={images[index]}
                alt={item.title}
                width={480}
                height={320}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              />
            </div>
            <div className="px-6 pb-8">
              <h4 className="mb-3 font-headline-md text-2xl text-primary">
                {item.title}
              </h4>
              <p className="mb-6 font-body-md text-on-surface-variant">
                {item.description}
              </p>
              <Link
                href="/services"
                className="flex items-center gap-2 font-label-md text-secondary transition-all duration-300 group-hover:text-primary"
              >
                {t("learnMore")}
                <span
                  className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
