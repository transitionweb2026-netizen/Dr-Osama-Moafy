import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface BlogContactCtaContent {
  title: string;
  description: string;
  bookAppointment: string;
  contactUs: string;
}

export function ContactCta({ content }: { content: BlogContactCtaContent }) {
  return (
    <RevealSection as="section" className="bg-primary py-xl">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop text-center">
        <h2 className="mb-md font-headline-md text-headline-md text-on-primary">
          {content.title}
        </h2>
        <p className="mx-auto mb-xl max-w-2xl font-body-lg text-on-primary/80">
          {content.description}
        </p>
        <div className="flex flex-col justify-center gap-gutter sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-on-primary px-xl py-lg font-label-md text-primary transition-all hover:bg-secondary-fixed"
          >
            {content.bookAppointment}
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-on-primary bg-transparent px-xl py-lg font-label-md text-on-primary transition-all hover:bg-on-primary/10"
          >
            {content.contactUs}
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}
