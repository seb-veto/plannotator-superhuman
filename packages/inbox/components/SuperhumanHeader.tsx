import { useId } from 'react';
import type { InboxListSection } from '@plannotator/core/inbox-types';
import { splitRows, type MailView } from '../superhuman';
import type { PriorityMarks } from '../gmail-priority';
import { useSidebar } from '../shell/sidebar';
import { Icon } from '../icons';
import { Tip } from './Tip';
export function SuperhumanHeader({view,sections,marks,page,onView,onInbox,onBoard,onSearch,onCommand,onCompose,onSettings}:{view:MailView;sections:readonly InboxListSection[];marks:PriorityMarks;page:string;onView:(v:MailView)=>void;onInbox:()=>void;onBoard?:()=>void;onSearch:(e:HTMLElement)=>void;onCommand:()=>void;onCompose:(e:HTMLElement)=>void;onSettings:()=>void}) {
  const {toggleSidebar}=useSidebar();const help=useId();
  return <>
    <nav className="sh-rail" aria-label="Workspace">
      <Tip content="Open command menu"><button type="button" className="sh-brand" aria-label="Open command menu" aria-describedby={help} onClick={onCommand}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 2c0 6-3 9-8 10 5 1 8 4 8 10 0-6 3-9 8-10-5-1-8-4-8-10Z"/><path d="M4 11c0 3-1 4-3 5 2 1 3 2 3 5 0-3 1-4 3-5-2-1-3-2-3-5Z"/></svg></button></Tip>
      <div className="sh-rail-modes"><Tip content="Go to Inbox"><button type="button" className={page==='inbox'?'sh-active':''} aria-label="Go to Inbox" aria-current={page==='inbox'?'page':undefined} aria-describedby={help} onClick={onInbox}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg></button></Tip>
      {onBoard&&<Tip content="Open Board"><button type="button" className={page==='board'?'sh-active':''} aria-label="Open Board" aria-describedby={help} onClick={onBoard}><Icon name="board" size={22}/></button></Tip>}</div>
      <span className="sh-grow"/><Tip content="New message"><button type="button" aria-label="New message" aria-haspopup="dialog" aria-describedby={help} onClick={e=>onCompose(e.currentTarget)}><Icon name="compose" size={20}/></button></Tip>
      <Tip content="Open settings"><button type="button" aria-label="Settings" aria-describedby={help} onClick={onSettings}><Icon name="settings" size={20}/></button></Tip><span className="sh-avatar" title="Plannotator Superhuman version">P</span>
    </nav>
    <header className="sh-header">
      <Tip content="Toggle navigation"><button type="button" className="sh-icon" aria-label="Toggle navigation" aria-describedby={help} onClick={toggleSidebar}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></Tip>
      {page==='inbox'?<div className="sh-splits" role="tablist" aria-label="Split Inbox" aria-describedby={help}>
        {(['important','other'] as const).map((id,i)=><Tip key={id} content={`Show ${id}`}><button type="button" role="tab" aria-selected={view===id} tabIndex={view===id||(!['important','other'].includes(view)&&i===0)?0:-1} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'important':e.key==='End'?'other':id==='important'?'other':'important';onView(next);requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>(`[role=tab][data-split=${next}]`)?.focus());}}} data-split={id} onClick={()=>onView(id)}>{id==='important'?'Important':'Other'}<span>{splitRows(sections,marks,id).length||''}</span></button></Tip>)}
        {!['important','other','inbox'].includes(view)&&<span className="sh-view-label">{view==='all'?'All mail':view[0]!.toUpperCase()+view.slice(1)}</span>}
      </div>:<span className="sh-page-label">{page==='board'?'Board':page==='settings'?'Settings':page==='drafts'?'Drafts':'Plannotator'}</span>}
      <span className="sh-grow"/><Tip content="New message"><button type="button" className="sh-icon" aria-label="Compose a message" aria-describedby={help} onClick={e=>onCompose(e.currentTarget)}><Icon name="compose" size={20}/></button></Tip>
      <Tip content="Search conversations"><button type="button" className="sh-icon" aria-label="Search mail" aria-keyshortcuts="/" aria-describedby={help} onClick={e=>onSearch(e.currentTarget)}><Icon name="search" size={20}/></button></Tip>
    </header>
    <span id={help} className="ib-sr">Tab to controls, then Enter or Space. Left and right arrows switch Inbox tabs. Command-K opens actions. Slash opens Search. C starts Compose. Tab switches splits from a conversation row; Compose starts a message to an agent.</span>
  </>;
}
