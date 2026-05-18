import { CONTACT_GROUPS } from "../data/contacts";
import { ActionLinks, formatPhone } from "./ActionLinks";

export function ContactsPanel() {
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
      </div>

      <div className="space-y-6">
        {CONTACT_GROUPS.map((g) => (
          <section key={g.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
              {g.title}
            </h3>
            <ul className="space-y-2">
              {g.contacts.map((c) => (
                <li
                  key={c.id}
                  className="rounded-xl border border-ink-200 bg-white p-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-ink-900">
                        {c.name}
                      </div>
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
                  {c.notes && (
                    <p className="mt-1 text-xs italic text-ink-500">{c.notes}</p>
                  )}
                  {(c.phone || c.altPhone || c.url || c.address) && (
                    <div className="mt-2">
                      <ActionLinks
                        phone={c.altPhone}
                        mapsQuery={c.address}
                        url={c.url}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
