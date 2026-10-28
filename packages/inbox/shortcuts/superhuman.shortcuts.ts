import { defineShortcutScope } from '@plannotator/ui/shortcuts';
import { inOverlay, isComposingKey, isEditableTarget, isRepeatKey, keyTarget, modalOpen } from './guards';

/** Superhuman's official Mac shortcut sheet, mapped to existing Plannotator actions. */
export const superhumanNavigationShortcuts = defineShortcutScope({
  id: 'inbox-superhuman-navigation', title: 'Superhuman navigation', shortcuts: {
    important: { description: 'Go to Important', bindings: ['G I'], section: 'Navigation', preventDefault: true },
    other: { description: 'Go to Other', bindings: ['G O'], section: 'Navigation', preventDefault: true },
    starred: { description: 'Go to Starred', bindings: ['G S'], section: 'Navigation', preventDefault: true },
    drafts: { description: 'Go to Drafts', bindings: ['G D'], section: 'Navigation', preventDefault: true },
    sent: { description: 'Go to Sent', bindings: ['G T'], section: 'Navigation', preventDefault: true },
    done: { description: 'Go to Done', bindings: ['G E'], section: 'Navigation', preventDefault: true },
    all: { description: 'Go to All mail', bindings: ['G A'], section: 'Navigation', preventDefault: true },
  },
});
export const superhumanActionShortcuts = defineShortcutScope({
  id: 'inbox-superhuman-actions', title: 'Superhuman actions', shortcuts: {
    search: { description: 'Search conversations', bindings: ['/'], section: 'Actions', preventDefault: true },
    compose: { description: 'Compose a message', bindings: ['C'], section: 'Actions', preventDefault: true },
    reply: { description: 'Reply', bindings: ['R', 'Enter'], section: 'Actions', preventDefault: true },
    star: { description: 'Star or unstar', bindings: ['S'], section: 'Actions', preventDefault: true },
    read: { description: 'Mark read or unread', bindings: ['U'], section: 'Actions', preventDefault: true },
    unarchive: { description: 'Mark not done', bindings: ['Shift+E'], section: 'Actions', preventDefault: true },
    unread: { description: 'Show unread', bindings: ['Shift+U'], section: 'Filters', preventDefault: true },
    filterStarred: { description: 'Show starred', bindings: ['Shift+S'], section: 'Filters', preventDefault: true },
    filterImportant: { description: 'Show important', bindings: ['Shift+I'], section: 'Filters', preventDefault: true },
    nextSplit: { description: 'Next split', bindings: ['Tab'], section: 'Navigation', preventDefault: true },
    previousSplit: { description: 'Previous split', bindings: ['Shift+Tab'], section: 'Navigation', preventDefault: true },
    folders: { description: 'Show folders', bindings: ['ArrowLeft'], section: 'Navigation', preventDefault: true },
    open: { description: 'Open conversation', bindings: ['Enter'], section: 'Navigation', preventDefault: true },
  },
});
export const superhumanSelectionShortcuts = defineShortcutScope({
  id: 'inbox-superhuman-selection', title: 'Superhuman selection', shortcuts: {
    select: { description: 'Select conversation', bindings: ['X'], section: 'Selection', preventDefault: true },
    extendNext: { description: 'Add next to selection', bindings: ['Shift+J'], section: 'Selection', preventDefault: true },
    extendPrevious: { description: 'Add previous to selection', bindings: ['Shift+K'], section: 'Selection', preventDefault: true },
    selectFrom: { description: 'Select all from here', bindings: ['Mod+A'], section: 'Selection', preventDefault: true },
    selectAll: { description: 'Select all', bindings: ['Mod+Shift+A'], section: 'Selection', preventDefault: true },
    clear: { description: 'Clear selection', bindings: ['Escape'], section: 'Selection', preventDefault: true },
    archiveSelected: { description: 'Mark selected done', bindings: ['E'], section: 'Selection', preventDefault: true },
  },
});
export const superhumanMessageShortcuts = defineShortcutScope({
  id: 'inbox-superhuman-messages', title: 'Messages', shortcuts: {
    nextMessage: { description: 'Next message', bindings: ['N'], section: 'Messages', preventDefault: true },
    previousMessage: { description: 'Previous message', bindings: ['P'], section: 'Messages', preventDefault: true },
  },
});
export function superhumanKeyAllowed(event: KeyboardEvent): boolean {
  return !event.defaultPrevented && !event.altKey && !isComposingKey(event) && !isRepeatKey(event) && !isEditableTarget(keyTarget(event)) && !inOverlay(keyTarget(event)) && !modalOpen();
}
