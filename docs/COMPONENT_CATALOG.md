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

## Admin Components

| Component | Purpose | Props | Slots | Events | Status | Docs |
|-----------|---------|-------|-------|--------|--------|------|
| Layout | Root admin shell with sidebar + navbar slots | 0 | sidebar, navbar | - | ✅ Stable | [→](components/admin/layout.md) |
| Page | Standard admin page wrapper with title, breadcrumb, and helper support | 4 | titlebar-subtitle, default | - | ✅ Stable | [→](components/admin/page.md) |
| Titlebar | Page title bar with action buttons and breadcrumb | 2 | titlebar-subtitle | - | ✅ Stable | [→](components/admin/titlebar.md) |
| Topbar | Top navigation bar with logo and actions | 3 | logo-mobile, topbar-actions | toggle, search, logout | ⚠️ Deprecated | [→](components/admin/topbar.md) |
| Sidebar | Navigation sidebar with collapsible menu items | 0 | logo, select-button, top-content, footer | onClickItem | ✅ Stable | [→](components/admin/sidebar.md) |
| SidebarHeader | Sidebar header with logo and collapse toggle | 4 | - | onClickCollapse, onClickButton | ✅ Stable | [→](components/admin/sidebar-header.md) |
| HomeBar | Full-width content banner with heading slot | 2 | content | - | ✅ Stable | [→](components/admin/home-bar.md) |
| Savebar | Sticky save/cancel bar for edit pages | 2 | - | onSave, onCancel | ✅ Stable | [→](components/admin/savebar.md) |
| CardActive | Toggle-active + delete card for list items | 2 | - | onActivate, onDeactivate, onDelete | ✅ Stable | [→](components/admin/card-active.md) |
| CardAnnotation | Card with annotation slot | 2 | annotation | - | ⚠️ Deprecated | [→](components/admin/card-annotation.md) |
| CardSeo | Collapsible card wrapping the SEO editor | 5 | - | onChange | ✅ Stable | [→](components/admin/card-seo.md) |
| MediaCard | Image/video preview card with optional overlay | 10 | - | - | ✅ Stable | [→](components/admin/media-card.md) |
| StatsGroup | Grid of stats items from data array | 1 | default | - | ⚠️ Deprecated | [→](components/admin/stats-group.md) |
| EmptyData | Empty-state placeholder with icon, title, and CTA | 7 | default, action | - | ✅ Stable | [→](components/admin/empty-data.md) |
| PanelSkeleton | Full-panel loading skeleton with fade-out delay | 3 | - | - | ✅ Stable | [→](components/admin/panel-skeleton.md) |
| PageHelper | Clickable "Precisa de ajuda?" banner | 0 | - | onClickLink | ✅ Stable | [→](components/admin/page-helper.md) |
| PageHelperArticles | PageHelper + aside drawer with article links | 2 | - | - | ✅ Stable | [→](components/admin/page-helper-articles.md) |
| PageHelperVideo | PageHelper + aside drawer with embedded YouTube video | 1 | - | - | ✅ Stable | [→](components/admin/page-helper-video.md) |
| PageMessageSupport | Inline "Saiba mais" support link message | 2 | - | - | ✅ Stable | [→](components/admin/page-message-support.md) |
| PageActions | Bottom action bar with primary + secondary buttons | 2 | - | - | ✅ Stable | [→](components/admin/page-actions.md) |
| FormRegister | Form wrapper integrating Savebar + FormValidation | 3 | default | save | ✅ Stable | [→](components/admin/form-register.md) |
| ButtonAction | Deprecated action button with remove/active/delete variants | 5 | - | onRemove, onActive, onDelete, onClickButton, onDelete2, update:active | ⚠️ Deprecated | [→](components/admin/button-action.md) |
| ButtonDarkmode | Deprecated dark-mode toggle button | 0 | default | changeSchemeColor | ⚠️ Deprecated | [→](components/admin/button-darkmode.md) |
| BrowserSelect | Modal browser for selecting items from a remote service | 8 | default | select, selectOne, remove, open | ✅ Stable | [→](components/admin/browser-select.md) |
| PlatformSelect | Tab-based platform picker | 2 | - | change:platform | ✅ Stable | [→](components/admin/platform-select.md) |
| QuickSearch | Modal quick-search form with configurable filters | 6 | default | onSubmit, onOpen, onClose | ✅ Stable | [→](components/admin/quick-search.md) |
| Table | Slot-based BEM div table with responsive wrapper | 2 | header, body | - | ✅ Stable | [→](components/admin/table.md) |
| TableList | Full-featured data table with pagination, search, and filters | 4 | default | - | ⚠️ Deprecated | [→](components/admin/table-list.md) |
| RowExclude | Inverse-selection row exclude control | 2 | - | update:modelValue, update | ✅ Stable | [→](components/admin/row-exclude.md) |
| Apexchart | ApexCharts wrapper for admin dashboards | 3 | - | - | ✅ Stable | [→](components/admin/apexchart.md) |
| Codemirror | CodeMirror 6 code editor wrapper | 2 | - | update:modelValue | ✅ Stable | [→](components/admin/codemirror.md) |
| Gmaps | Google Maps Static API image wrapper | 6 | - | - | ✅ Stable | [→](components/admin/gmaps.md) |
| Seo | Composite SEO editor with live Google preview | 12 | - | onChange | ✅ Stable | [→](components/admin/seo.md) |
| FrameAnnotation | Deprecated 4/8 column layout with annotation card | 2 | annotation | - | ⚠️ Deprecated | [→](components/admin/frame-annotation.md) |
| UserProfileCard | Dropdown user profile widget for nav bars | 5 | user-links | - | ✅ Stable | [→](components/admin/user-profile-card.md) |
| Content403 | 403 Forbidden error page | 1 | - | - | ✅ Stable | [→](components/admin/content-403.md) |
| Content404 | 404 Not Found error page | 0 | - | - | ✅ Stable | [→](components/admin/content-404.md) |

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
**Last Updated:** 2026-05-21
