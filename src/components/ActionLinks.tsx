interface Props {
  phone?: string;
  mapsQuery?: string;
  url?: string;
  size?: "sm" | "md";
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function ActionLinks({ phone, mapsQuery, url, size = "sm" }: Props) {
  if (!phone && !mapsQuery && !url) return null;
  const base =
    size === "sm"
      ? "inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700"
      : "inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700";

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {phone && (
        <a href={`tel:${phone}`} className={base}>
          <PhoneIcon />
          <span>{formatPhone(phone)}</span>
        </a>
      )}
      {mapsQuery && (
        <a
          href={mapsUrl(mapsQuery)}
          target="_blank"
          rel="noreferrer"
          className={base}
        >
          <MapPinIcon />
          <span>Maps</span>
        </a>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={base}
        >
          <LinkIcon />
          <span>Open</span>
        </a>
      )}
    </div>
  );
}

export function formatPhone(p: string): string {
  // +19072747300 → (907) 274-7300
  const digits = p.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return p;
}

export function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 3h6v6M10 14L21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
