import { useEffect, useRef, useState } from 'react';
import { formatShortcutBindingText } from '@plannotator/ui/shortcuts';
import { Modal } from './Updates';
import { Icon, type IconName } from '../icons';
import { superhumanActionShortcuts, superhumanNavigationShortcuts, superhumanSelectionShortcuts, superhumanMessageShortcuts } from '../shortcuts/superhuman.shortcuts';
import { inboxThreadShortcuts } from '../shortcuts/thread.shortcuts';

const entries = [...Object.entries(superhumanActionShortcuts.shortcuts), ...Object.entries(superhumanNavigationShortcuts.shortcuts), ...Object.entries(superhumanSelectionShortcuts.shortcuts).filter(([id])=>!['archiveSelected','extendNext','extendPrevious'].includes(id))].filter(([id]) => !['open','nextSplit','previousSplit'].includes(id));
const order = ['archive','star','read','reply','compose','search','unarchive','undo'];
const commandIcons: Record<string, IconName> = { archive:'checkCircle', star:'star', read:'check', reply:'reply', compose:'compose', search:'search', unarchive:'reply', undo:'reply', settings:'settings', shortcuts:'question', select:'check' };
const help = [superhumanNavigationShortcuts,superhumanActionShortcuts,superhumanSelectionShortcuts,superhumanMessageShortcuts,inboxThreadShortcuts];
export function SuperhumanCommands({ onClose, onAction, hasTarget, hasThread, canUndo }: { onClose: () => void; onAction: (id: string) => void; hasTarget: boolean; hasThread: boolean; canUndo: boolean }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [shortcuts, setShortcuts] = useState(false);
  const field = useRef<HTMLInputElement>(null);
  const commands = [...entries.map(([id,def]) => ({ id, label:def.description, key:formatShortcutBindingText(def.bindings[0]!) })), {id:'archive',label:'Mark Done',key:'E'}, {id:'undo',label:'Undo',key:'Z'}, {id:'shortcuts',label:'Keyboard shortcuts',key:''}, {id:'settings',label:'Settings',key:''}].sort((a,b)=>(order.includes(a.id)?order.indexOf(a.id):order.length)-(order.includes(b.id)?order.indexOf(b.id):order.length)).filter(c => c.label.toLowerCase().includes(query.trim().toLowerCase()));
  const unavailable = (id:string) => (id==='reply' && !hasThread) || (id==='undo' && !canUndo) || (['star','read','unarchive','archive','select','selectFrom','selectAll','clear'].includes(id) && !hasTarget);
  useEffect(() => { document.getElementById(`sh-command-${commands[active]?.id}`)?.scrollIntoView?.({block:"nearest"}); }, [active,query,shortcuts]);
  useEffect(() => { const frame=requestAnimationFrame(()=>field.current?.focus()); return ()=>cancelAnimationFrame(frame); }, [shortcuts]);
  const run = (id:string) => { if (unavailable(id)) return; if(id==='shortcuts') {setShortcuts(true); return;} onClose();onAction(id); };
  return <Modal label={shortcuts?'Keyboard shortcuts':'Superhuman Command'} testId="superhuman-command" onClose={onClose} ownKeys className="sh-command">
    {shortcuts ? <>
      <div className="sh-command-title"><h2>Keyboard shortcuts</h2><button type="button" title="Back to commands" onClick={()=>setShortcuts(false)}>Back</button></div>
      <p className="sh-command-note">Keys pause while typing, composing text, or using a dialog. Tab switches splits from the conversation list; Tab on controls keeps normal focus navigation.</p>
      <div className="sh-shortcuts">{help.map(scope=><section key={scope.id}><h3>{scope.title}</h3>{Object.values(scope.shortcuts).map(def=><div key={def.description}><span>{def.description}</span><kbd>{def.bindings.map(b=>formatShortcutBindingText(b)).join(' / ')}</kbd></div>)}</section>)}</div>
      <p className="sh-command-note">Plannotator keeps agent conversations and Board cards. Email-only calendar, snooze, spam and AI commands are outside this fork’s current backend.</p>
    </> : <>
      <div className="sh-command-input"><input ref={field} aria-label="Type a command" role="combobox" aria-expanded="true" aria-controls="sh-command-results" aria-activedescendant={commands[active]?`sh-command-${commands[active]!.id}`:undefined} placeholder="Superhuman Command" value={query} onChange={e=>{setQuery(e.target.value);setActive(0)}} onKeyDown={e=>{
        if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setActive(i=>Math.max(0,Math.min(commands.length-1,i+(e.key==='ArrowDown'?1:-1))));}
        if(e.key==='Enter'&&commands[active]){e.preventDefault();run(commands[active]!.id);}
      }}/><kbd>esc</kbd></div>
      <div id="sh-command-results" role="listbox" aria-label="Commands">{commands.map((c,i)=><button key={c.id} id={`sh-command-${c.id}`} type="button" role="option" disabled={unavailable(c.id)} aria-selected={i===active} onMouseEnter={()=>setActive(i)} onClick={()=>run(c.id)}><span className="sh-command-label"><Icon name={commandIcons[c.id] ?? 'folder'} size={19}/><span>{c.label}</span></span><kbd>{c.key}</kbd></button>)}{!commands.length&&<p role="status">No matching commands</p>}</div>
      <p className="sh-command-note">{commands[active]?.id === 'read' ? 'Marking read also closes unanswered Plannotator questions.' : '↑ ↓ to choose · Enter to run · Esc to close'}</p>
    </>}
  </Modal>;
}
