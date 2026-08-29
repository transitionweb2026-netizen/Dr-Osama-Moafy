import { RevealSection } from "@/components/ui/RevealSection";
import { Avatar } from "@/components/icons/Avatar";

export interface TestimonialItem {
  initials: string;
  name: string;
  quote: string;
}

export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}

function Stars({ size = "text-3xl" }: { size?: string }) {
  return (
    <div className="flex gap-1.5 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`material-symbols-outlined icon-filled ${size}`}>
          star
        </span>
      ))}
    </div>
  );
}

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <RevealSection
      as="section"
      className="mx-auto max-w-[1440px] px-margin-mobile py-32 md:px-margin-desktop"
    >
      <div className="stagger-item mb-20 text-center">
        <h2 className="mb-6 font-headline-md text-headline-md text-on-surface">
          {content.title}
        </h2>
        <div className="flex justify-center">
          <Stars />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {content.items.map((item) => (
          <div
            key={item.name}
            className="stagger-item glass-card rounded-2xl border-t-4 border-t-primary p-8 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-container font-bold text-primary">
                <Avatar value={item.initials} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold">{item.name}</p>
                <Stars size="text-[10px]" />
              </div>
            </div>
            <p className="text-sm italic leading-relaxed text-on-surface-variant">
              &ldquo;{item.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
