import { useMemo, useState } from "react";
import { CONTACT_GROUPS, type Contact } from "../data/contacts";
import { ActionLinks, formatPhone } from "./ActionLinks";

interface Props {
  /** Today's ISO date while the trip is active — pins that day's contacts. */
  today?: string;
}

export function ContactsPanel({ today }: Props) {
  const [query, setQuery] = useState("");

  const todays = useMemo(() => {
    if (!today) return [];
    return CONTACT_GROUPS.flatMap((g) =>
      g.contacts.filter((c) => c.datesISO?.includes(today)),
    );
  }, [today]);

  const q = query.trim().toLowerCase();
  const matches = (c: Contact) =>
    !q ||
    [c.name, c.role, c.notes, c.address]
      .filter(Boolean)
      .some((s) => s!.toLowerCase().includes(q));

  return (
    <div className="scroll-soft h-full overflow-y-auto px-6 py-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-ink-900">
          Contacts
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Tap any phone number to call. Anchorage Police, fire, and medical
          emergencies: <a href="tel:911" className="font-medium text-accent-700 underline">911</a>.
        </p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, role, or notes…"
          type="search"
          className="mt-3 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm placeholder:text-ink-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-200"
        />
      </div>

      <div className="space-y-6">
        {!q && todays.length > 0 && (
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-700">
              Today
            </h3>
            <ul className="space-y-2">
              {todays.map((c) => (
                <ContactCard key={`today-${c.id}`} c={c} highlight />
              ))}
            </ul>
          </section>
        )}

        {CONTACT_GROUPS.map((g) => {
          const visible = g.contacts.filter(matches);
          if (visible.length === 0) return null;
          return (
            <section key={g.title}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                {g.title}
              </h3>
              <ul className="space-y-2">
                {visible.map((c) => (
                  <ContactCard key={c.id} c={c} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ContactCard({ c, highlight }: { c: Contact; highlight?: boolean }) {
  return (
    <li
      className={
        "rounded-xl border bg-white p-3 " +
        (highlight ? "border-accent-200 ring-1 ring-accent-100" : "border-ink-200")
      }
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-ink-900">{c.name}</div>
          <div className="text-xs text-ink-500">{c.role}</div>
        </div>
        {c.phone && (
          <a
            href={`tel:${c.phone}`}
            className="shrink-0 font-mono text-xs tabular-nums text-accent-700 hover:underline"
          >
            {formatPhone(c.phone)}
          </a>
        )}
      </div>
      {c.address && (
        <div className="mt-1 text-xs text-ink-500">{c.address}</div>
      )}
      {c.notes && <p className="mt-1 text-xs italic text-ink-500">{c.notes}</p>}
      {(c.phone || c.altPhone || c.url || c.address) && (
        <div className="mt-2">
          <ActionLinks phone={c.altPhone} mapsQuery={c.address} url={c.url} />
        </div>
      )}
    </li>
  );
}
