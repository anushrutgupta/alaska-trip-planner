import { DAYS } from "../data/days";
import { BOOKINGS } from "../data/bookings";
import { CONTACT_GROUPS } from "../data/contacts";
import { PRETRIP } from "../data/pretrip";
import { PACKING } from "../data/packing";
import {
  ACTIVITIES,
  categoryTotal,
  GROUP_TOTAL,
  LOGISTICS,
  PER_PERSON_TOTAL,
} from "../data/budget";
import { TIDES } from "../data/tides";
import { formatPhone } from "./ActionLinks";

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/**
 * Self-contained, print-optimized trip packet. Rendered standalone when the URL
 * has `?print`. Cmd/Ctrl-P → Save as PDF. Hosted, so the URL itself is the
 * shareable 1-click PDF source.
 */
export function PrintView() {
  return (
    <div className="print-doc mx-auto max-w-[820px] bg-white px-10 py-8 text-ink-900">
      <div className="no-print mb-6 flex items-center justify-between rounded-lg bg-ink-900 px-4 py-3 text-white">
        <span className="text-sm">
          Trip packet — use your browser's Print → <b>Save as PDF</b>.
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-ink-900"
          >
            Print / Save PDF
          </button>
          <a
            href={window.location.pathname}
            className="rounded-md border border-white/40 px-3 py-1.5 text-sm"
          >
            Back to app
          </a>
        </div>
      </div>

      <header className="mb-6 border-b-2 border-ink-900 pb-3">
        <h1 className="text-2xl font-bold tracking-tight">Alaska 2026</h1>
        <p className="text-sm text-ink-600">
          Jun 25 – Jul 5, 2026 · 6 travelers · Anchorage → Homer → Seward →
          Talkeetna → Denali → Anchorage
        </p>
      </header>

      {/* Bookings */}
      <Section title="Bookings & confirmations">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-ink-300 text-left">
              <th className="py-1 pr-2">Item</th>
              <th className="py-1 pr-2">Date</th>
              <th className="py-1 pr-2">Conf</th>
              <th className="py-1 pr-2">Contact</th>
              <th className="py-1 pr-2 text-right">Paid</th>
              <th className="py-1 text-right">Due</th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b) => (
              <tr key={b.id} className="border-b border-ink-100 align-top">
                <td className="py-1 pr-2 font-medium">
                  {b.name}
                  {b.confirmed === false && (
                    <span className="ml-1 text-rose-600">(to book)</span>
                  )}
                </td>
                <td className="py-1 pr-2">{b.date}</td>
                <td className="py-1 pr-2 font-mono">{b.confRef ?? "—"}</td>
                <td className="py-1 pr-2">
                  {b.contact}
                  {b.phone && <div>{formatPhone(b.phone)}</div>}
                </td>
                <td className="py-1 pr-2 text-right tabular-nums">
                  {b.paid ?? "—"}
                </td>
                <td className="py-1 text-right tabular-nums text-rose-700">
                  {b.balanceDue ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Day by day */}
      <Section title="Day by day">
        {DAYS.map((d) => {
          const tides = TIDES[d.dateISO];
          return (
            <div key={d.dateISO} className="break-inside-avoid pb-3">
              <h3 className="mt-3 text-sm font-bold">
                {d.label} · {d.date} — {d.theme}
              </h3>
              <p className="text-[10px] text-ink-500">
                ☀ {d.sunrise} · ☾ {d.sunset} · Overnight: {d.overnight}
                {d.driveMiles ? ` · Drive ${d.driveMiles} mi (${d.driveTime})` : ""}
              </p>
              {tides && (
                <p className="text-[10px] text-sky-700">
                  Homer tides:{" "}
                  {tides
                    .map(
                      (t) =>
                        `${t.type} ${t.time} ${t.ft > 0 ? "+" : ""}${t.ft}ft`,
                    )
                    .join(" · ")}
                </p>
              )}
              <ul className="mt-1">
                {d.events.map((e) => {
                  const booking = e.bookingId
                    ? BOOKINGS.find((b) => b.id === e.bookingId)
                    : undefined;
                  return (
                    <li key={e.id} className="flex gap-2 py-0.5 text-[11px]">
                      <span className="w-12 shrink-0 font-mono tabular-nums text-ink-500">
                        {e.time}
                      </span>
                      <span>
                        <span className="font-medium">{e.title}</span>
                        {booking?.confRef && (
                          <span className="ml-1 font-mono text-emerald-700">
                            [{booking.confRef}]
                          </span>
                        )}
                        {e.detail && (
                          <span className="text-ink-600"> — {e.detail}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </Section>

      {/* Contacts */}
      <Section title="Contacts">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[11px]">
          {CONTACT_GROUPS.map((g) => (
            <div key={g.title} className="break-inside-avoid">
              <div className="font-bold uppercase tracking-wide text-ink-500">
                {g.title}
              </div>
              {g.contacts.map((c) => (
                <div key={c.id} className="mt-0.5">
                  <span className="font-medium">{c.name}</span>
                  {c.phone && (
                    <span className="font-mono"> · {formatPhone(c.phone)}</span>
                  )}
                  {c.address && (
                    <div className="text-ink-500">{c.address}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Checklists + budget */}
      <Section title="Pre-trip · Packing · Budget">
        <div className="grid grid-cols-3 gap-6 text-[11px]">
          <div className="break-inside-avoid">
            <div className="font-bold uppercase tracking-wide text-ink-500">
              Pre-trip
            </div>
            {PRETRIP.map((p) => (
              <div key={p.id}>☐ {p.label}</div>
            ))}
          </div>
          <div className="break-inside-avoid">
            <div className="font-bold uppercase tracking-wide text-ink-500">
              Packing
            </div>
            {PACKING.map((p) => (
              <div key={p.id}>☐ {p.label}</div>
            ))}
          </div>
          <div className="break-inside-avoid">
            <div className="font-bold uppercase tracking-wide text-ink-500">
              Budget / person
            </div>
            <div className="mt-0.5">
              {ACTIVITIES.title}: {fmt(categoryTotal(ACTIVITIES))}
            </div>
            <div>
              {LOGISTICS.title}: {fmt(categoryTotal(LOGISTICS))}
            </div>
            <div className="mt-1 font-bold">
              Per person: {fmt(PER_PERSON_TOTAL)}
            </div>
            <div className="font-bold">Group: {fmt(GROUP_TOTAL)}</div>
            <div className="mt-1 text-ink-500">Excludes flights.</div>
          </div>
        </div>
      </Section>

      <p className="mt-6 border-t border-ink-200 pt-2 text-[10px] text-ink-400">
        Generated from the Alaska 2026 planner. Times are local targets — bear
        viewing and flightseeing slide with weather and tides.
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5 break-inside-avoid-page">
      <h2 className="mb-1.5 text-sm font-bold uppercase tracking-wide text-accent-700">
        {title}
      </h2>
      {children}
    </section>
  );
}
