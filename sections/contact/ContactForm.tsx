"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/constants/site";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [condition, setCondition] = useState(t("conditionOptions.0"));
  const [message, setMessage] = useState("");
  const nameId = useId();
  const phoneId = useId();
  const conditionId = useId();
  const messageId = useId();

  const conditionOptions = t.raw("conditionOptions") as string[];

  function sendWhatsApp() {
    if (!name || !phone) {
      alert(t("validationAlert"));
      return;
    }

    const formattedMessage = `Hello ${siteConfig.doctorName} Clinic,%0A%0AI would like to inquire about a consultation.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Condition:* ${condition}%0A*Message:* ${message}`;
    const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${formattedMessage}`;
    window.open(waUrl, "_blank");
  }

  return (
    <section className="glass-card rounded-xl border-secondary/10 p-xl shadow-sm lg:col-span-7">
      <h2 className="mb-lg font-headline-md text-headline-md text-primary">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        <div className="space-y-xs">
          <label htmlFor={nameId} className="font-label-md text-label-md text-on-surface-variant">
            {t("nameLabel")}
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            required
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-xs">
          <label htmlFor={phoneId} className="font-label-md text-label-md text-on-surface-variant">
            {t("phoneLabel")}
          </label>
          <input
            id={phoneId}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("phonePlaceholder")}
            required
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-xs md:col-span-2">
          <label htmlFor={conditionId} className="font-label-md text-label-md text-on-surface-variant">
            {t("conditionLabel")}
          </label>
          <select
            id={conditionId}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
          >
            {conditionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-xs md:col-span-2">
          <label htmlFor={messageId} className="font-label-md text-label-md text-on-surface-variant">
            {t("messageLabel")}
          </label>
          <textarea
            id={messageId}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("messagePlaceholder")}
            rows={4}
            className="w-full rounded-lg border-outline-variant bg-surface-container p-md outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={sendWhatsApp}
            className="flex w-full items-center justify-center gap-sm rounded-lg bg-primary py-md font-label-md text-on-primary transition-all hover:brightness-110 active:scale-95"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              send
            </span>
            {t("submit")}
          </button>
        </div>
      </div>
    </section>
  );
}
