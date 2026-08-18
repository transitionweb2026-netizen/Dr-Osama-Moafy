import { isImageIconValue } from "@/lib/icons/isImageIconValue";

// Person avatars store either short initials text (e.g. "MK") or an
// uploaded photo's URL in the same plain-text column — this renders
// whichever one is present.
export function Avatar({
  value,
  alt = "",
  className,
}: {
  value?: string | null;
  alt?: string;
  className?: string;
}) {
  if (isImageIconValue(value)) {
    return <img src={value} alt={alt} className={className ?? "h-full w-full object-cover"} />;
  }
  return <>{value}</>;
}
