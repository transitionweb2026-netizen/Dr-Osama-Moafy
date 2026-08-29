"use client";

import { useId, useState } from "react";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export interface ContactFormContent {
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  conditionLabel: string;
  conditionOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  validationAlert: string;
  submitIcon?: string;
}

export function ContactForm({
  content,
  doctorName,
  whatsappNumber,
}: {
  content: ContactFormContent;
  doctorName: string;
  whatsappNumber: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [condition, setCondition] = useState(content.conditionOptions[0]);
  const [message, setMessage] = useState("");
  const nameId = useId();
  const phoneId = useId();
  const conditionId = useId();
  const messageId = useId();

  function sendWhatsApp() {
    if (!name || !phone) {
      alert(content.validationAlert);
      return;
    }

    const formattedMessage = `Hello ${doctorName} Clinic,%0A%0AI would like to inquire about a consultation.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Condition:* ${condition}%0A*Message:* ${message}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
    window.open(waUrl, "_blank");
  }

  return (
    <section className="glass-card rounded-xl border-secondary/10 p-xl shadow-sm lg:col-span-7">
      <h2 className="mb-lg font-headline-md text-headline-md text-primary">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        <div className="space-y-xs">
          <label htmlFor={nameId} className="font-label-md text-label-md text-on-surface-variant">
            {content.nameLabel}
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={content.namePlaceholder}
            required
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all duration-300 ease-out focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-xs">
          <label htmlFor={phoneId} className="font-label-md text-label-md text-on-surface-variant">
            {content.phoneLabel}
          </label>
          <input
            id={phoneId}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={content.phonePlaceholder}
            required
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all duration-300 ease-out focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-xs md:col-span-2">
          <label htmlFor={conditionId} className="font-label-md text-label-md text-on-surface-variant">
            {content.conditionLabel}
          </label>
          <select
            id={conditionId}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all duration-300 ease-out focus:border-transparent focus:ring-2 focus:ring-primary"
          >
            {content.conditionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-xs md:col-span-2">
          <label htmlFor={messageId} className="font-label-md text-label-md text-on-surface-variant">
            {content.messageLabel}
          </label>
          <textarea
            id={messageId}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={content.messagePlaceholder}
            rows={4}
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all duration-300 ease-out focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={sendWhatsApp}
            className="flex w-full items-center justify-center gap-sm rounded-lg bg-primary py-md font-label-md text-on-primary transition-all duration-[250ms] hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,102,107,0.4)] active:scale-[0.98]"
          >
            <DynamicIcon value={content.submitIcon} fallback="send" imgClassName="h-6 w-6 shrink-0 object-contain" />
            {content.submit}
          </button>
        </div>
      </div>
    </section>
  );
}
