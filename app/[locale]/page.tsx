import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="px-margin-mobile py-xl md:px-margin-desktop">
      <h1 className="font-headline-lg text-headline-lg text-primary">
        Home page checkpoint
      </h1>
    </div>
  );
}
