"use client";

import { useState } from "react";

export interface FaqEntry {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="stagger-item overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between px-8 py-6 text-start transition-colors hover:bg-surface-container"
            >
              <span className="font-headline-md text-xl text-on-surface transition-colors group-hover:text-primary">
                {item.question}
              </span>
              <span
                className={`material-symbols-outlined shrink-0 text-3xl text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-outline-variant/30 px-8 pb-8 pt-6 font-body-md text-lg leading-relaxed text-on-surface-variant">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
