import {test,expect} from 'bun:test';
import type {InboxListRow,InboxListSection} from '@plannotator/core/inbox-types';
import {splitRows,projectColors} from './superhuman';
const row=(id:string,extra={}):InboxListRow=>({thread_id:id,section:'new',unseen:1,resolved_at:null,last_at:`2026-10-27T12:00:00Z`,last_author:'agent',...extra}) as InboxListRow;
const sections=(...threads:InboxListRow[]):InboxListSection[]=>[{id:'new',label:'New',threads}];
test('Important and Other partition live threads independently of read and star state',()=>{
 const source=sections(row('a',{section:'waiting',unseen:0}),row('b'),row('c',{resolved_at:'today'}),row('d',{resolved_at:'today',agent_after_archive:true}));
 const marks={b:{important:true,starred:true}};
 const important=splitRows(source,marks,'important').map(r=>r.thread_id),other=splitRows(source,marks,'other').map(r=>r.thread_id);
 expect(important).toEqual(['b','a']);expect(other).toEqual(['d']);expect(new Set([...important,...other]).size).toBe(3);expect(source[0]!.threads).toHaveLength(4);
});
test('explicit not-important overrides waiting work, unread never answers it, and All mail retains archive',()=>{
 const source=sections(row('a',{section:'waiting',unseen:0}),row('b',{resolved_at:'today'}));
 expect(splitRows(source,{a:{important:false}},'other').map(r=>r.thread_id)).toEqual(['a']);
 expect(splitRows(source,{},'unread')).toEqual([]);expect(splitRows(source,{},'all')).toHaveLength(2);
});

test('project tags keep the same color across reorderings, splits and reload-independent calls',()=>{
 const ids=['project-a','project-b','project-c'];const colors=new Map(ids.map(id=>[id,projectColors(id)]));
 for(const id of [...ids].reverse())expect(projectColors(id)).toEqual(colors.get(id)!);
 expect(new Set(ids.map(id=>projectColors(id)[0])).size).toBe(3);
});

test('Done contains archived conversations and excludes work resumed after archive',()=>{
 const source=sections(row('a',{resolved_at:'today'}),row('b',{resolved_at:'today',agent_after_archive:true}),row('c'));
 expect(splitRows(source,{},'done').map(r=>r.thread_id)).toEqual(['a']);
});
