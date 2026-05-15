# Design System Component Catalog

Complete index of all Tray Design System components. Each component is documented individually in `components/<category>/<name>.md`.

**Quick Tips:**
- ✅ = Use in new projects
- ⚠️ = Avoid (deprecated, will be removed)
- 🔄 = In development
- Deprecated components list recommended replacements

---

## UI Primitives (Core Components)

| Component | Purpose | Props | Slots | Events | Status | Docs |
|-----------|---------|-------|-------|--------|--------|------|
| Button | Clickable action trigger with variants | 8 | default, icon | click, focus, blur | ✅ Stable | [→](components/ui/button.md) |
| Pagination | Multi-page navigation | 12 | prev, next | change, page-change | ✅ Stable | [→](components/ui/pagination.md) |
| Modal | Overlay dialog with header/footer | 6 | header, default, footer | open, close | ✅ Stable | [→](components/ui/modal.md) |
| Spinner | Loading indicator | 3 | - | - | ✅ Stable | [→](components/ui/spinner.md) |
| Tag | Categorical label with close action | 5 | default | close | ✅ Stable | [→](components/ui/tag.md) |
| Avatar | User image or initials | 7 | - | - | ✅ Stable | [→](components/ui/avatar.md) |
| Link | Text link with icon support | 6 | default | click | ✅ Stable | [→](components/ui/link.md) |
| IconButton | Icon-only button variant | 6 | icon | click | ✅ Stable | [→](components/ui/icon-button.md) |
| ButtonGroup | Multiple buttons in a group | 4 | default | select | ✅ Stable | [→](components/ui/button-group.md) |
| Divider | Visual separator line | 3 | - | - | ✅ Stable | [→](components/ui/divider.md) |
| Dropdown | Contextual menu | 8 | trigger, default | select, open, close | ✅ Stable | [→](components/ui/dropdown.md) |
| Tab | Tabbed interface | 7 | default | change | ✅ Stable | [→](components/ui/tab.md) |
| Skeleton | Placeholder during loading | 4 | - | - | ✅ Stable | [→](components/ui/skeleton.md) |
| SkeletonList | List skeleton loader | 5 | - | - | ✅ Stable | [→](components/ui/skeleton-list.md) |
| SkeletonTable | Table skeleton loader | 6 | - | - | ✅ Stable | [→](components/ui/skeleton-table.md) |
| Image | Optimized image with fallback | 8 | - | load, error | ✅ Stable | [→](components/ui/image.md) |
| Aside | Sidebar/aside panel | 5 | default | toggle | ✅ Stable | [→](components/ui/aside.md) |
| DescriptionList | Key-value pair list | 4 | default | - | ✅ Stable | [→](components/ui/description-list.md) |
| IndexTable | Indexed data table | 12 | header, row, footer | select, sort | ✅ Stable | [→](components/ui/index-table.md) |
| NewsIndicator | Badge for new items | 3 | - | - | ✅ Stable | [→](components/ui/news-indicator.md) |
| TextStyle | Typography/text formatting | 6 | default | - | ✅ Stable | [→](components/ui/text-style.md) |
| CustomScroll | Custom scrollbar | 5 | default | scroll | ✅ Stable | [→](components/ui/custom-scroll.md) |
| InfiniteScroll | Infinite scroll trigger | 7 | default | load-more | ✅ Stable | [→](components/ui/infinite-scroll.md) |
| DropFiles | File drag-and-drop zone | 6 | default | drop, change | ✅ Stable | [→](components/ui/drop-files.md) |
| FormWrapper | Form container | 4 | default | submit | ✅ Stable | [→](components/ui/form-wrapper.md) |
| FormValidation | Validation error display | 5 | default | - | ✅ Stable | [→](components/ui/form-validation.md) |
| FormColorpicker | Color selection input | 6 | - | change | ✅ Stable | [→](components/ui/form-colorpicker.md) |
| FormTags | Tag input field | 8 | - | change, add, remove | ✅ Stable | [→](components/ui/form-tags.md) |
| FormSpinbutton | Number spinner input | 7 | - | change | ✅ Stable | [→](components/ui/form-spinbutton.md) |

---

## How to Use This Catalog

1. **Find by name:** Search `Ctrl+F` for component name (e.g., "Button")
2. **Find by category:** Scroll to section (UI Primitives, Forms, Admin)
3. **Check status:** ✅ = safe, ⚠️ = avoid, 🔄 = experimental
4. **Read details:** Click the [→] link to open detailed component doc

---

**Component Docs Location:** `components/<category>/<name>.md`  
**Storybook (for humans):** Run `npm run storybook`  
**Version:** v3.1.29  
**Last Updated:** 2026-05-15
