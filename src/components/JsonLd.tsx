/**
 * Renders one or more schema.org JSON-LD blobs into the document.
 * Server-rendered so crawlers and answer engines see it in the initial HTML.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const blobs = Array.isArray(data) ? data : [data];
  return (
    <>
      {blobs.map((blob, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify drops `undefined` fields, so optional schema props vanish cleanly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blob) }}
        />
      ))}
    </>
  );
}
