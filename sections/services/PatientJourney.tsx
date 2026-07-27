import { useTranslations } from "next-intl";
import { RevealSection } from "@/components/ui/RevealSection";

const icons = [
  "event",
  "meeting_room",
  "stethoscope",
  "radiology",
  "assignment",
  "medical_information",
  "check_circle",
];

export function PatientJourney() {
  const t = useTranslations("Services.journey");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <RevealSection as="section" className="bg-background py-xl overflow-x-hidden">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop">
        <h2 className="stagger-item mb-xl text-center font-headline-md text-headline-md">
          {t("title")}
        </h2>
        <div className="relative py-xl">
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-outline-variant/30 lg:block" />
          <div className="relative grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-7">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="stagger-item flex flex-col items-center text-center"
              >
                <div
                  className={`z-10 mb-md flex h-16 w-16 items-center justify-center rounded-full shadow-lg ${
                    index === steps.length - 1
                      ? "border border-primary/30 bg-primary/20 text-primary"
                      : index === 0
                        ? "bg-primary text-on-primary"
                        : "border border-outline-variant bg-surface-container-highest text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {icons[index]}
                  </span>
                </div>
                <h4
                  className={`mb-xs font-bold ${
                    index === 0 || index === steps.length - 1
                      ? "text-primary"
                      : "text-on-surface"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-on-surface-variant">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
