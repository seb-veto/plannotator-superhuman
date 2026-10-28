import { useId, useRef, useState } from 'react';
import type { InboxCardWire } from '@plannotator/core/inbox-types';
import type { ProjectFolder } from '../api';

/** Project membership is independent of a card's stage and its linked conversations. */
export function CardProject({ card, projects, onSave }: { card: InboxCardWire; projects: readonly ProjectFolder[]; onSave: (id: string) => Promise<string | null> }) {
  const id = useId();
  const field = useRef<HTMLSelectElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return <section className="ib-crdp-sec" data-card-project="">
    <label htmlFor={id}>Project</label>
    <select ref={field} id={id} value={card.project_id} disabled={busy} aria-describedby={`${id}-help`} data-card-project-field="" onChange={async event => {
      const target = event.target.value;
      if (target === card.project_id) return;
      setBusy(true);
      try { setError(await onSave(target)); }
      catch { setError('Project was not changed. Try again.'); }
      finally { setBusy(false); requestAnimationFrame(() => { if (document.activeElement === document.body) field.current?.focus(); }); }
    }}>
      {!projects.some(p => p.id === card.project_id) && <option value={card.project_id}>Current project</option>}
      {projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
    </select>
    <p id={`${id}-help`} className="ib-crdp-asknote">Choose a project. Keyboard: Space, arrows, Enter. Conversations stay where they are; changing projects does not start work.</p>
    {busy && <span role="status">Changing project…</span>}
    {error && <p className="ib-error" role="alert">{error}</p>}
  </section>;
}
