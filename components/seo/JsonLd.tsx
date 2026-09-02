// Renders a JSON-LD structured-data <script> tag safely. `<` is escaped to
// < so a CMS-controlled string value (e.g. site name, phone, address)
// can never contain a literal "</script>" sequence — the HTML parser looks
// for that before any JSON/JS parsing happens, so an unescaped occurrence
// would terminate the script tag early and let the rest of its "content"
// render as real HTML. < decodes back to "<" for anything reading the
// structured data, so this doesn't change the emitted JSON-LD at all.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
