import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface VideosCtaBandContent {
  title: string;
  description: string;
  bookAppointment: string;
  contactUs: string;
}

export function CtaBand({ content }: { content: VideosCtaBandContent }) {
  return (
    <RevealSection as="section" className="mx-auto mb-24 max-w-screen-2xl px-margin-mobile md:px-margin-desktop">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary p-12 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="glow-breathe absolute -start-10 -top-10 h-48 w-48 rounded-full bg-white" />
          <div
            className="glow-breathe absolute -end-10 -bottom-10 h-64 w-64 rounded-full bg-white"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-start">
            <h2 className="mb-4 font-headline-md text-headline-md text-white">
              {content.title}
            </h2>
            <p className="font-body-md text-white/80">{content.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98]"
            >
              {content.bookAppointment}
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 font-bold text-white transition-all duration-[250ms] hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
            >
              {content.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
