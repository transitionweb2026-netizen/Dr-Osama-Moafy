import Image from "next/image";
import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6wvQUIlCF4PfLPaSmCyg_md-4yZwra5kVhehHu2rNazh9DrApEgjKpVUcKlr8QyEAXvOZDYQtVbsJl7i1KwcSlDTkMo4VO5Xdiu491P7WVG9yjnC_9lEeqmSW94WqA7YiXKvxMfslNbS8ALNCjXAs8FxHPJWphgafLpgPKyqJLk6qxXQOnGDmFYiGxSEoxDdp33OWQBKAh9ducNB1h99qPucvKtXrinh6CQ4StI0Yq2pVzAn8nXRIsBbCbwKxTI5KOs2oCVqL7HY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHh9ag9tHDT1XpTRcFbgo6xuoLablkLXH0CXciVR8tCSJCu3H4_Utvk4EdRSVi2WnG3T9SWZJVDyDWFDYvWjuzuTQ9_PzjpqPiaL5qRD9Tjudw8OwOHKQ1QAKCr0Y1BO5NvUZVidf4qlz4vW9WrgAUqM8dW4KU60omWIhPl4CQ9iAUE_TaITQ23ypaIwiSIdVnXhgJ9dbzIqky81bXLVAns49nFk9_UpOZe8OQ7YGlmA-fg-0pBzFoRENCB9EG8x-wZltCmN3WW3c",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCV70YVoOqy6ad38PZWKzT91Y8VHWYEDgyGABgFg6iT7NqmXTFa573tuKuG1M-fouUFvBBh22Dtb5W4O18jfet-k5XsFTQnaGUsKzvR49SxQR9XTlcEX2aX4sgJnphcFLCIcxuFyRJwxaomjoUCWk4jVLizRWjgqQFjeth3ZBAlefIPRdQSoqrQlLsxjw1zPL9f17MRiTyEX-20rowCBNboe9i-OjK7YlBvu8qEuAVCpzbjH_JUzc76AoG9gilVYNhxQShv_m1P7zg",
];

export function EducationalShorts() {
  const t = useTranslations("Home.educationalShorts");
  const items = t.raw("items") as {
    title: string;
    duration: string;
    category: string;
  }[];

  return (
    <RevealSection
      as="section"
      className="bg-surface-bright px-margin-mobile py-xl md:px-xl"
    >
      <div className="stagger-item mb-16 text-center">
        <h3 className="mb-2 font-label-md text-secondary uppercase tracking-[0.2em]">
          {t("eyebrow")}
        </h3>
        <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
          {t("title")}
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`stagger-item delay-${(index + 1) * 100} group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-3xl border border-outline-variant bg-surface-dim shadow-md transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl`}
          >
            <Image
              src={images[index]}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-8">
              <div className="play-pulse mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined icon-filled text-2xl" aria-hidden="true">
                  play_arrow
                </span>
              </div>
              <h4 className="font-headline-md text-xl text-on-primary">
                {item.title}
              </h4>
              <p className="mt-2 font-body-md text-xs text-on-primary/70">
                {item.duration} • {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="stagger-item mt-16 flex justify-center">
        <Link
          href="/videos"
          className="rounded-xl border border-outline px-10 py-4 font-headline-md text-xl uppercase tracking-widest text-primary transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/5 active:scale-[0.98]"
        >
          {t("viewAll")}
        </Link>
      </div>
    </RevealSection>
  );
}
