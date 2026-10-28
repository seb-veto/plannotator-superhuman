import {afterEach,expect,test} from 'bun:test';
import {act,useState} from 'react';
import {createRoot,type Root} from 'react-dom/client';
import {TooltipProvider} from '@plannotator/ui/components/Tooltip';
import {SidebarProvider} from '../shell/sidebar';
import type {MailView} from '../superhuman';
import type {InboxListRow} from '@plannotator/core/inbox-types';
import {SuperhumanHeader} from './SuperhumanHeader';
let root:Root|null=null;let host:HTMLDivElement|null=null;
afterEach(()=>{if(root)act(()=>root!.unmount());host?.remove();root=null;host=null});
test.skipIf(typeof document==='undefined')('split tabs count conversations and arrow navigation updates selection without opening a thread',async()=>{
 const rows=[{thread_id:'a',section:'waiting',unseen:0,resolved_at:null,last_at:'today'},{thread_id:'b',section:'new',unseen:1,resolved_at:null,last_at:'today'}] as InboxListRow[];
 function Screen(){const[view,onView]=useState<MailView>('important');return <TooltipProvider><SidebarProvider><SuperhumanHeader view={view} sections={[{id:'new',label:'New',threads:rows}]} marks={{}} page="inbox" onView={onView} onInbox={()=>{}} onSearch={()=>{}} onCommand={()=>{}} onCompose={()=>{}} onSettings={()=>{}}/></SidebarProvider></TooltipProvider>}
 host=document.createElement('div');document.body.append(host);root=createRoot(host);act(()=>root!.render(<Screen/>));
 const first=host.querySelector('[data-split=important]') as HTMLButtonElement,other=host.querySelector('[data-split=other]') as HTMLButtonElement;
 expect(first.textContent).toBe('Important1');expect(other.textContent).toBe('Other1');expect(first.getAttribute('aria-selected')).toBe('true');expect(other.tabIndex).toBe(-1);
 act(()=>first.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true})));
 await act(async()=>{await new Promise(done=>setTimeout(done,30))});expect(other.getAttribute('aria-selected')).toBe('true');expect(first.tabIndex).toBe(-1);expect(document.activeElement===other).toBe(true);
});
