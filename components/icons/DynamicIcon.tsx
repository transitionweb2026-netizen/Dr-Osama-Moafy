import { isImageIconValue } from "@/lib/icons/isImageIconValue";

// Renders a CMS-controlled icon field: a custom uploaded image if the admin
// picked one, otherwise the Material Symbols glyph (either their typed name
// or the fallback). `className` sizes/colors the Material Symbols case;
// pass an explicit width/height-bearing class for the image case too.
export function DynamicIcon({
  value,
  fallback = "star",
  className,
  imgClassName,
}: {
  value?: string | null;
  fallback?: string;
  className?: string;
  imgClassName?: string;
}) {
  if (isImageIconValue(value)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={value} alt="" aria-hidden="true" className={imgClassName ?? "h-full w-full object-contain"} />
    );
  }

  return (
    <span className={`material-symbols-outlined ${className ?? ""}`} aria-hidden="true">
      {value || fallback}
    </span>
  );
}
