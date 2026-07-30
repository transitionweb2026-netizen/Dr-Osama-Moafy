import { RevealSection } from "@/components/ui/RevealSection";

export interface JourneyStep {
  title: string;
  description: string;
  icon: string;
}

export interface PatientJourneyContent {
  title: string;
  steps: JourneyStep[];
}

export function PatientJourney({ content }: { content: PatientJourneyContent }) {
  return (
    <RevealSection as="section" className="bg-background py-xl overflow-x-hidden">
      <div className="mx-auto max-w-screen-2xl px-margin-desktop">
        <h2 className="stagger-item mb-xl text-center font-headline-md text-headline-md">
          {content.title}
        </h2>
        <div className="relative py-xl">
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-outline-variant/30 lg:block" />
          <div className="relative grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-7">
            {content.steps.map((step, index) => (
              <div
                key={step.title}
                className="stagger-item flex flex-col items-center text-center"
              >
                <div
                  className={`z-10 mb-md flex h-16 w-16 items-center justify-center rounded-full shadow-lg ${
                    index === content.steps.length - 1
                      ? "border border-primary/30 bg-primary/20 text-primary"
                      : index === 0
                        ? "bg-primary text-on-primary"
                        : "border border-outline-variant bg-surface-container-highest text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <h4
                  className={`mb-xs font-bold ${
                    index === 0 || index === content.steps.length - 1
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
