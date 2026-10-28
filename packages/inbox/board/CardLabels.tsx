import { useEffect, useRef, useState } from 'react';
import { normalizeInboxCardLabels, type InboxCardWire } from '@plannotator/core/inbox-types';

export function CardLabelChips({ labels = [] }: { labels?: readonly string[] }) {
  return labels.length ? <span className="ib-card-labels" aria-label={`Labels: ${labels.join(', ')}`}>{labels.map(label => <span key={label} className="ib-card-label" dir="auto">{label}</span>)}</span> : null;
}

export function CardLabels({ card, onSave }: { card: InboxCardWire; onSave: (labels: string[]) => Promise<string | null> }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => { setEditing(false); requestAnimationFrame(() => trigger.current?.focus()); };
  useEffect(() => { if (editing) field.current?.focus(); }, [editing]);
  const help = `ib-label-help-${card.id}`;
  return <section className="ib-crdp-sec" aria-label="Labels" data-card-labels="">
    <h3>Labels</h3>
    {editing ? <form className="ib-crdp-notesform" onSubmit={async event => {
      event.preventDefault();
      const normalized = normalizeInboxCardLabels(text.split(/\r?\n/).filter(line => line.trim()));
      if ('error' in normalized) { setError(normalized.error); return; }
      setBusy(true);
      const failed = await onSave(normalized.labels);
      setBusy(false); setError(failed);
      if (!failed) close();
    }} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (!busy) close(); } }}>
      <label htmlFor={`ib-labels-${card.id}`}>Card labels</label>
      <textarea ref={field} id={`ib-labels-${card.id}`} value={text} rows={3} onChange={event => setText(event.target.value)} aria-describedby={help} disabled={busy} data-card-labels-field="" />
      <p id={help}>One label per line, up to 12 labels of 40 characters. Leave empty to clear. Tab to Save; Enter or Space saves. Escape cancels.</p>
      {error && <p role="alert" className="ib-error">{error}</p>}
      <div className="ib-crdp-notesacts">
        <button type="button" className="ib-btn ib-ghost ib-sm" disabled={busy} onClick={close} title="Cancel label changes">Cancel</button>
        <button type="submit" className="ib-btn ib-pri ib-sm" disabled={busy} title="Save card labels" data-card-labels-save="">Save labels</button>
      </div>
    </form> : <>
      <CardLabelChips labels={card.labels} />
      <button ref={trigger} type="button" className="ib-lnk" title="Edit card labels" aria-description="Edit this card’s labels. Press Enter or Space." data-card-labels-edit="" onClick={() => { setText((card.labels ?? []).join('\n')); setError(null); setEditing(true); }}>{card.labels?.length ? 'Edit labels' : 'Add labels'}</button>
    </>}
  </section>;
}
