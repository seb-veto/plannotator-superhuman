Reference lock: current dark desktop confirmed by Sebastian. Primary current-theme.png from official September 2026 announcement; split behavior from current official help; older Carbon screenshot is historical structure support only. Warm canvas #292827, selected #474543, accent #bea1f5, text warm white; 52px rail, 108px split header, 48px rows, no Gmail pills or group cards. Preserve actual agent workflows and separate storage. Pixel identity can only be asserted for visible measured reference regions, not unseen proprietary screens.

Sources inspected on 2026-10-27:
- Current theme: https://blog.superhuman.com/we-redesigned-superhuman-mail-for-ios-and-android/ and its September 2026 New-Theme-Headway image.
- Split counts and behavior: https://help.superhuman.com/hc/en-us/articles/46005619081101-Default-Split-Inbox
- Historical full Carbon desktop layout: https://blog.superhuman.com/why-do-people-use-dark-mode/ (the older blue-gray palette is superseded by the current warm sample).
- The main site's /llms.txt returned 404. Jam title/transcript search found no Superhuman reference in the connected account; the alternate connection needs reauthentication. No account or browser settings were changed.

Canvas RGB 41/40/39 and selected RGB 71/69/67 are sampled from the dark portion of the current official image; the focused edge sample is RGB 190/161/245. Header/rail/row sizes are reconstructed from the illustrated reference at a documented assumed display scale, not recovered proprietary CSS. No full current app screenshot or signed-in Superhuman access was provided, so exact pixel parity outside those visible sampled regions cannot be asserted.

## Precision and keyboard pass, 2026-10-27

Sebastian requested a deeper reference match including hotkeys. The primary visual lock remains the current official warm Carbon image; no palette averaging or change to the selected direction. The source image is `New-Theme-Headway@2x.png` at the URL above. In its illustrated desktop regions, the selection begins about 12 CSS pixels inside the content edge; the sender begins about 64px inside, with the label column about 232px later. This pass gives the row that inset, keeps the sender/label alignment, and refines its text and label dimensions. These are reconstructed at the previously assumed scale, not proprietary CSS measurements.

Primary behavioral sources inspected:
- https://download.superhuman.com/Superhuman%20Keyboard%20Shortcuts.pdf (v8 Mac edition, visually read pages 1 and 2)
- https://help.superhuman.com/hc/en-us/articles/46005701270541-Keyboard-Shortcuts-in-Superhuman-Mail
- https://help.superhuman.com/hc/en-us/articles/46005789591693-Speed-Up-With-Shortcuts
- https://help.superhuman.com/hc/en-us/articles/46005611576589-Mass-Archive

Decisions:
| Interaction | Source | Implementation |
| --- | --- | --- |
| Command-K opens actions; slash opens search | Current official help + shortcut sheet | A searchable command dialog with shortcut hints, keyboard selection and a Shortcuts reference. Real supported actions only. |
| J/K, then Enter | Shortcut sheet | J/K focuses conversations in the list; Enter opens. From an open reader J/K changes conversation. |
| Next/previous split | Shortcut sheet | Tab / Shift-Tab from the conversation list. Native controls retain their normal Tab navigation. |
| G then I/O/S/D/T/E/A | Shortcut sheet | Important, Other, Starred, Drafts, Sent, Done, All mail. A separate sequence scope takes precedence over S to star. |
| R / Enter | Shortcut sheet | Open the existing Plannotator reply route; its agent/question routing is preserved. |
| S, U, Shift-E | Shortcut sheet | Star toggle, read/unread, mark not done using existing APIs. Plannotator read semantics still close unanswered questions, disclosed in command help. |
| X, Shift-J/K, Command-A, Command-Shift-A, Escape | Shortcut sheet | Selection, extend selection, all from here/all, clear selection. E marks selected conversations done, with existing Undo. |
| N/P between messages | Shortcut sheet | Replaces the original Plannotator J/K message stepping in this fork. Typing, IME, repeats, files and dialogs keep their guards. |
| Board labels | Sebastian's request | Shared card API and editable labels merged from the card API branch. Persisted labels, no automatic agent message/start. |

The public app entry page is signed out, and the connected Jam CLI found no Superhuman walkthrough. No sign-in, account change, email export, proprietary font download, or private mailbox screenshot was performed. A full current reference is still needed to establish literal whole-app pixel identity. Calendar, email snooze/spam and provider AI have no Plannotator backend and are not simulated by inactive commands. The existing Command-period focus toggle remains as Sebastian's explicit customization.


### Walkthrough comparison

The official [Getting Started walkthrough](https://www.youtube.com/watch?v=a-gQqgBusrk), published 8 April 2026, now supplies full Inbox and Command frames captured through Aside at about 00:48 and 02:27. It shows a light Inbox and a dark Command menu, so the September Carbon illustration remains the color reference for the dark shell. The Command frame informs its 600 px scale, leading action icons, right-aligned keys, monospaced action text and Mark Done first, followed by Star/read and other supported actions. Unsupported calendar, snooze and AI actions remain outside this backend; they are not inert menu items.

Common Board changes are integrated: project assignment, labels and Icebox as do-later. Arrivals enter the Inbox automatically, preserving the selected thread and own-read settling. These common changes have a separate compiled standard-Inbox proof; candidate .5 now has its own full build and exact compiled Aside replay, with receipts in the delivery package.
