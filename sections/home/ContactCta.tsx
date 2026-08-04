import { RevealSection } from "@/components/ui/RevealSection";
import { Link } from "@/i18n/navigation";

export interface HomeContactCtaContent {
  titleLine1: string;
  titleLine2: string;
  description: string;
  bookAppointment: string;
  whatsapp: string;
  fastResponse: string;
  expertConsultation: string;
  clinicDetails: string;
  phoneLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  addressLabel: string;
  bookNow: string;
}

export function ContactCta({
  content,
  phone,
  whatsapp,
  whatsappNumber,
  email,
  addressLine,
}: {
  content: HomeContactCtaContent;
  phone: string;
  whatsapp: string;
  whatsappNumber: string;
  email: string;
  addressLine: string;
}) {
  return (
    <RevealSection
      as="section"
      className="relative overflow-hidden bg-surface-container-high px-margin-mobile py-xl md:px-xl"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container-lowest to-surface-container-high" />
        <div className="glow-breathe absolute -start-20 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div
          className="glow-breathe absolute -end-20 bottom-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="stagger-item font-headline-lg text-5xl uppercase leading-tight tracking-tighter text-on-surface md:text-7xl">
              {content.titleLine1} <br />
              <span className="text-primary">{content.titleLine2}</span>
            </h2>
            <p className="stagger-item delay-100 max-w-[32rem] text-body-lg font-medium leading-relaxed text-on-surface-variant/80">
              {content.description}
            </p>
          </div>
          <div className="stagger-item delay-200 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-2xl bg-primary px-8 py-4 font-headline-md text-xl text-on-primary shadow-lg transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
            >
              {content.bookAppointment}
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              className="flex items-center gap-2 rounded-2xl border border-outline-variant bg-white px-8 py-4 font-headline-md text-xl text-primary shadow-sm transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary/5 hover:shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              {content.whatsapp}
            </a>
          </div>
          <div className="stagger-item delay-300 flex flex-wrap gap-8 border-t border-outline-variant pt-8">
            <div className="flex items-center gap-3">
              <span className="reveal-scale-0 material-symbols-outlined text-xl text-primary" aria-hidden="true">
                bolt
              </span>
              <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
                {content.fastResponse}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="reveal-scale-0 delay-100 material-symbols-outlined text-xl text-primary" aria-hidden="true">
                verified_user
              </span>
              <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
                {content.expertConsultation}
              </span>
            </div>
          </div>
        </div>

        <RevealSection variant="reveal-right" className="relative">
          <div className="relative z-10 rounded-[40px] border border-outline-variant bg-white p-10 shadow-2xl">
            <h3 className="mb-8 font-headline-md text-2xl text-on-surface">
              {content.clinicDetails}
            </h3>
            <div className="space-y-6">
              <div className="stagger-item delay-100 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all duration-300 ease-out group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    call
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {content.phoneLabel}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">{phone}</p>
                </div>
              </div>
              <div className="stagger-item delay-200 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all duration-300 ease-out group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    chat
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {content.whatsappLabel}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">{whatsapp}</p>
                </div>
              </div>
              <div className="stagger-item delay-300 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all duration-300 ease-out group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    mail
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {content.emailLabel}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">{email}</p>
                </div>
              </div>
              <div className="stagger-item delay-400 group flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-all duration-300 ease-out group-hover:rotate-[5deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-secondary">
                    {content.addressLabel}
                  </p>
                  <p className="font-headline-md text-lg text-on-surface">{addressLine}</p>
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-10 block w-full rounded-2xl bg-primary py-4 text-center font-headline-md text-lg text-on-primary shadow-md transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-container hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
            >
              {content.bookNow}
            </Link>
          </div>
          <div className="absolute -inset-4 -z-10 rounded-[48px] bg-primary/5 blur-3xl" />
        </RevealSection>
      </div>
    </RevealSection>
  );
}
