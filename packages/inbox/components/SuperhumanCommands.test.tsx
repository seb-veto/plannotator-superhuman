import { afterEach, expect, test } from 'bun:test';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { useShortcutScope } from '@plannotator/ui/shortcuts';
import { SuperhumanCommands } from './SuperhumanCommands';
import { superhumanNavigationShortcuts, superhumanActionShortcuts, superhumanKeyAllowed } from '../shortcuts/superhuman.shortcuts';
let root: Root|null=null; let host: HTMLDivElement|null=null;
afterEach(()=>{if(root)act(()=>root!.unmount());host?.remove();root=null;host=null;});
const settle=async()=>act(async()=>{await new Promise(done=>setTimeout(done,25));});
function draw(node:React.ReactNode){host=document.createElement('div');document.body.append(host);root=createRoot(host);act(()=>root!.render(node));return host;}
test.skipIf(typeof document==='undefined')('G then S navigates before the single S star command, and typing owns the keys',async()=>{
 const actions:string[]=[];
 function Keys(){
  useShortcutScope({scope:superhumanNavigationShortcuts,target:'document',capture:true,handlers:{starred:{when:superhumanKeyAllowed,handle:()=>actions.push('starred')}}});
  useShortcutScope({scope:superhumanActionShortcuts,target:'document',handlers:{star:{when:superhumanKeyAllowed,handle:()=>actions.push('star')}}});
  return <input aria-label="Typing"/>;
 }
 const el=draw(<Keys/>);await settle();
 act(()=>{document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'g',bubbles:true,cancelable:true}));document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'s',bubbles:true,cancelable:true}));});
 expect(actions).toEqual(['starred']);
 const field=el.querySelector('input')!;field.focus();
 act(()=>{field.dispatchEvent(new KeyboardEvent('keydown',{key:'g',bubbles:true,cancelable:true}));field.dispatchEvent(new KeyboardEvent('keydown',{key:'s',bubbles:true,cancelable:true}));field.dispatchEvent(new KeyboardEvent('keydown',{key:'s',isComposing:true,bubbles:true,cancelable:true}));});
 expect(actions).toEqual(['starred']);
});
test.skipIf(typeof document==='undefined')('command filtering, Enter, disabled actions and Escape use the real dialog',async()=>{
 const actions:string[]=[];let closed=0;
 const el=draw(<SuperhumanCommands hasTarget={false} hasThread={false} canUndo={false} onAction={id=>actions.push(id)} onClose={()=>closed++}/>);await settle();
 expect((el.querySelector('[id="sh-command-star"]') as HTMLButtonElement).disabled).toBe(true);
 const input=el.querySelector('input')!;
 await act(async()=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value')!.set!.call(input,'Compose');input.dispatchEvent(new Event('input',{bubbles:true}));});
 expect(el.querySelectorAll('[role="option"]')).toHaveLength(1);
 act(()=>input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true})));
 expect(actions).toEqual(['compose']);expect(closed).toBe(1);
 act(()=>input.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
 expect(closed).toBe(2);
});

test.skipIf(typeof document==='undefined')('Command opens on Mark Done for a selected conversation, with E and Enter activation',async()=>{
 const actions:string[]=[];
 const el=draw(<SuperhumanCommands hasTarget hasThread={false} canUndo={false} onAction={id=>actions.push(id)} onClose={()=>{}}/>);await settle();
 const first=el.querySelector('[role="option"]')!;
 expect(first.textContent).toContain('Mark Done');expect(first.querySelector('kbd')?.textContent).toBe('E');
 act(()=>el.querySelector('input')!.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true})));
 expect(actions).toEqual(['archive']);
});
