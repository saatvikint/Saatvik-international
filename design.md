# Design System: Retro-Tactile Pop & B2B Trade

Saatvik International's signature aesthetic combines warm natural artisan tones (cream canvas, deep currant ink, and punchy sunny gold) with a tactile, retro-pop neo-brutalist interaction system.

---

## 1. Signature Rule: The "Tactile Drop Shadow"

Every interactive element (buttons, cards, pills, form fields, stickers) shares the same crisp dark border and solid offset drop shadow with realistic tactile push physics:

```css
/* Base resting state */
border: 2px solid var(--ink); /* #461025 */
box-shadow: 0 4px 0 var(--ink);
transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

/* Hover (Lifting up) */
transform: translateY(-2px);
box-shadow: 0 6px 0 var(--ink);

/* Active / Pressed down (Clicking) */
transform: translateY(2px);
box-shadow: 0 2px 0 var(--ink);
```

---

## 2. Color Tokens

| Variable | Hex / Value | Role |
| :--- | :--- | :--- |
| `--ink` | `#461025` | Deep currant border, solid drop shadows, primary dark buttons |
| `--yellow` | `#ffd747` | High-conversion B2B CTA buttons, active accents, badges |
| `--red` | `#7c172e` | Product accent, spicy flavour tags, alert states |
| `--cream` | `#fff6e8` | Main site background / natural canvas |
| `--paper` | `#fffaf2` | Product card surfaces, pure container backgrounds |
| `--footer-ink` | `#461025` | Heavy footer background text and borders |

---

## 3. Ready-to-Use Reusable Classes

### A. Buttons

#### 1. Primary Button (`.button.primary`)
Use for dark, authoritative actions (e.g. "Request Quote", "Chat on WhatsApp").
```html
<a href="#enquiry" class="button primary">
  <span>Request Quote</span>
  <svg class="icon"><use href="#arrow"/></svg>
</a>
```
- Background: `var(--ink)`
- Border: `2px solid var(--ink)`
- Shadow: `0 4px 0 #25040f`
- Hover: turns `var(--red)`, lifts `translateY(-2px)`, shadow `0 6px 0 #25040f`

#### 2. Yellow Button (`.button.yellow`)
Use for prominent B2B enquiry actions and primary conversions.
```html
<a href="#enquiry" class="button yellow">
  <span>Trade Enquiry</span>
  <svg class="icon"><use href="#arrow"/></svg>
</a>
```
- Background: `var(--yellow)`
- Border: `2px solid var(--ink)`
- Shadow: `0 4px 0 var(--ink)`
- Hover: turns `#ffe375`, lifts `translateY(-2px)`, shadow `0 6px 0 var(--ink)`

#### 3. Product "Enquire Now" Button (`.add-button`)
Use inside product grids to route directly into on-page RFQ.
```html
<button type="button" class="add-button">
  <span>Enquire Now</span>
  <span class="add-plus">→</span>
</button>
```

#### 4. Header Trade Enquiry Pill (`.header-enquiry-btn`)
Top-nav conversion pill replacing cart drawers.
```html
<a href="/#enquiry" class="header-enquiry-btn">
  <span>Trade Enquiry</span>
</a>
```

---

### B. Input Pills & Embedded Submit Arrows

Matches the newsletter & trade enquiry action design:

#### 1. Newsletter Pill Container (`.footer-newsletter-pill` or `.shadow-pill`)
```html
<form class="footer-newsletter-pill">
  <input type="email" placeholder="Enter your work email" required />
  <button type="submit" class="footer-submit-btn" aria-label="Submit">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  </button>
</form>
```

#### 2. Large Action Pill (`.trade-submit-pill`)
```html
<button type="submit" class="trade-submit-pill">
  <span>Submit Sourcing Enquiry</span>
  <span class="submit-circle-arrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  </span>
</button>
```

---

### C. Cards & Surface Containers

#### 1. Product Card (`.product-card`)
- Border: `2px solid var(--ink)`
- Border Radius: `24px`
- Shadow: `0 6px 0 var(--ink)`
- Hover: `transform: translateY(-4px); box-shadow: 0 10px 0 var(--ink);`

#### 2. Trade Enquiry Card (`.trade-enquiry-card`)
- Border: `3px solid var(--ink)`
- Border Radius: `36px`
- Shadow: `0 8px 0 var(--ink)`
- Inner Form: `.trade-enquiry-form` with `border: 2px solid var(--ink); box-shadow: 0 6px 0 var(--ink);`

#### 3. Direct Contact Item (`.trade-desk-item`)
- Border: `2px solid var(--ink)`
- Border Radius: `18px`
- Shadow: `0 4px 0 var(--ink)`
- Hover: `transform: translateY(-2px); box-shadow: 0 6px 0 var(--ink);`

#### 4. Perks Bar (`.perks`)
- Border: `2px solid var(--ink)`
- Border Radius: `100px`
- Shadow: `0 6px 0 var(--ink)`

---

### D. Form Inputs & Selects

```css
.trade-form-field input,
.trade-form-field select,
.trade-form-field textarea {
  background: #ffffff;
  border: 2px solid var(--ink);
  border-radius: 14px;
  box-shadow: 0 3px 0 var(--ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.trade-form-field input:focus,
.trade-form-field select:focus,
.trade-form-field textarea:focus {
  transform: translateY(-2px);
  box-shadow: 0 5px 0 var(--ink);
  outline: none;
}
```

---

### E. Badges & Stickers

```css
.sticker {
  display: inline-block;
  padding: 8px 16px 9px;
  border-radius: 40px;
  background: var(--yellow);
  color: var(--ink);
  font-weight: 700;
  transform: rotate(-5deg);
  border: 2px solid var(--ink);
  box-shadow: 0 3px 0 var(--ink);
}
```

---

## 4. B2B Flow & "Zero Side Cart" Rule

1. **No Slide-In Cart Drawers**: All "Enquire Now", "Request Quote", and trade links scroll smoothly to `#enquiry` on the page or navigate to the trade enquiry route.
2. **Auto-Populate Product**: Clicking "Enquire Now" on a flavour auto-selects that flavour in the enquiry form dropdown.
3. **Verified Contacts Only**: Phone/WhatsApp (`+91 9370012306`), Email (`saatvikinternational9@gmail.com`), Pune Office (The Grid Hub, Pune-411046), GSTIN (`27AFCFS6285E1ZR`).

