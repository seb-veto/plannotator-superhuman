import type { InboxListSection } from '@plannotator/core/inbox-types';
import { isImportant, type PriorityMarks } from './gmail-priority';
export { gmailUnreadCounts as unreadCounts } from './gmail-priority';
export type MailView = 'inbox' | 'important' | 'other' | 'starred' | 'unread' | 'sent' | 'all';
export const MAIL_VIEWS: {id:MailView;label:string}[] = [{id:'important',label:'Important'},{id:'other',label:'Other'},{id:'starred',label:'Starred'},{id:'unread',label:'Unread'},{id:'sent',label:'Sent'},{id:'all',label:'All mail'}];
export function splitRows(sections: readonly InboxListSection[], marks: PriorityMarks, view: MailView) {
  return sections.flatMap(s=>s.threads).filter(r=>(view==='all'||!r.resolved_at||r.agent_after_archive===true) && (view==='important'?isImportant(r,marks):view==='other'?!isImportant(r,marks):view==='starred'?marks[r.thread_id]?.starred:view==='unread'?r.unseen>0:view==='sent'?r.last_author==='person':true)).sort((a,b)=>b.last_at.localeCompare(a.last_at)||b.thread_id.localeCompare(a.thread_id));
}

/** Stable categorical tag colors: the same project keeps its color across splits and sort orders. */
export function projectColors(id: string): readonly [string,string] {
  const tones = [['#604552','#f4c8df'],['#504d37','#e8d996'],['#3f5352','#b3ded7']] as const;
  let tone = 0;
  for (const char of id) tone = (tone + char.charCodeAt(0)) % tones.length;
  return tones[tone]!;
}
