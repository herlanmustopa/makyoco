# Makyoco - Component Library

Library komponen UI yang dibangun dengan **React**, **TypeScript**, **Tailwind CSS**, dan didokumentasikan menggunakan **Storybook**.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.x | UI Library |
| TypeScript | 5.6.x | Type Safety |
| Vite | 6.0.x | Build Tool & Dev Server |
| Tailwind CSS | 4.0.x | Utility-first CSS |
| Storybook | 8.5.x | Component Documentation & Testing |
| ESLint | 9.17.x | Code Linting |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# Clone repository
git clone https://github.com/herlanmustopa/makyoco.git
cd makyoco

# Install dependencies
npm install
```

### Running the Project

```bash
# Development server (Vite)
npm run dev
# Buka http://localhost:5173

# Storybook development server
npm run storybook
# Buka http://localhost:6006
```

### Build

```bash
# Build production
npm run build

# Build Storybook untuk deployment
npm run build-storybook
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
makyoco/
├── .storybook/              # Konfigurasi Storybook
│   ├── main.ts              # Addons, framework, stories pattern
│   └── preview.ts           # Global CSS, parameter controls
├── public/                  # Static assets
│   └── vite.svg
├── src/
│   ├── main.tsx             # Entry point aplikasi React
│   ├── App.tsx              # Root component
│   ├── App.css              # Styling App component
│   ├── index.css            # Global styles (Tailwind, Material Icons)
│   ├── vite-env.d.ts        # Type declarations Vite
│   ├── assets/
│   │   └── react.svg
│   └── stories/             # Komponen & Storybook stories
│       ├── Form.tsx          # Komponen utama: Dropdown/Select
│       ├── Form.stories.tsx  # Stories untuk Form component
│       ├── Button.tsx        # Button component
│       ├── Button.stories.ts
│       ├── Button.css
│       ├── Header.tsx        # Header component
│       ├── Header.stories.ts
│       ├── header.css
│       ├── Page.tsx          # Page component
│       ├── Page.stories.ts
│       ├── page.css
│       └── Configure.mdx     # Storybook MDX docs
├── index.html               # HTML entry point
├── package.json
├── vite.config.ts           # Konfigurasi Vite + Tailwind plugin
├── tsconfig.json            # TypeScript config (references)
├── tsconfig.app.json        # TypeScript config untuk app
├── tsconfig.node.json       # TypeScript config untuk build tools
└── eslint.config.js         # ESLint configuration
```

---

## Components

### Form (Dropdown/Select)

Komponen utama project ini. Dropdown select yang mendukung single select, multi-select, pencarian, dan beberapa style variant.

**File:** `src/stories/Form.tsx`

#### Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | - | Ya | Label teks yang ditampilkan di samping dropdown |
| `options` | `Option[]` | - | Ya | Array opsi `{ label: string, value: string }` |
| `multiple` | `boolean` | `false` | Tidak | Aktifkan mode multi-select |
| `onChange` | `function` | - | Tidak | Callback saat pilihan berubah. Menerima `Option[]`, `Option`, atau `null` |
| `withSearch` | `boolean` | `true` | Tidak | Tampilkan input pencarian di dalam dropdown |
| `outlined` | `boolean` | `false` | Tidak | Gunakan style outlined (background abu-abu) |
| `placeholder` | `string` | `"Select..."` | Tidak | Placeholder saat belum ada yang dipilih |

#### Type Definitions

```typescript
type Option = {
  label: string;
  value: string;
};

type FormProps = {
  label: string;
  options: Option[];
  multiple?: boolean;
  onChange?: (selected: Option[] | Option | null) => void;
  withSearch?: boolean;
  outlined?: boolean;
  placeholder?: string;
};
```

#### Usage Examples

**Single Select:**
```tsx
import { Form } from "./stories/Form";

<Form
  label="Country"
  options={[
    { label: "Indonesia", value: "id" },
    { label: "Malaysia", value: "my" },
    { label: "Singapore", value: "sg" },
  ]}
  onChange={(selected) => console.log(selected)}
/>
```

**Multi Select dengan Search:**
```tsx
<Form
  label="Select Fruits"
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ]}
  multiple={true}
  withSearch={true}
  onChange={(selected) => console.log(selected)}
/>
```

**Tanpa Search, Outlined:**
```tsx
<Form
  label="Category"
  options={[
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ]}
  withSearch={false}
  outlined={true}
  placeholder="Choose a category..."
/>
```

#### Features

- **Single Select** - Pilih satu opsi, dropdown otomatis tertutup
- **Multi Select** - Pilih banyak opsi, ditampilkan sebagai tag/chip
- **Search/Filter** - Cari opsi berdasarkan teks, dengan highlight pada teks yang cocok
- **Clear Selection** - Tombol clear untuk menghapus semua pilihan
- **Remove Tag** - Hapus pilihan individual pada mode multi-select
- **Click Outside** - Dropdown otomatis tertutup saat klik di luar
- **Keyboard Navigation** - Buka dengan Enter/Space, tutup dengan Escape
- **Accessibility** - ARIA attributes (`role`, `aria-expanded`, `aria-selected`, `aria-label`)
- **Outlined Variant** - Style alternatif dengan background abu-abu

---

### Button

Komponen tombol yang reusable dengan beberapa ukuran dan style.

**File:** `src/stories/Button.tsx`

| Prop | Type | Default | Description |
|---|---|---|---|
| `primary` | `boolean` | `false` | Gunakan style primary (biru) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Ukuran tombol |
| `backgroundColor` | `string` | - | Custom background color |
| `label` | `string` | - | Teks tombol |
| `onClick` | `function` | - | Click handler |

### Header

Komponen header dengan state login/logout.

**File:** `src/stories/Header.tsx`

### Page

Komponen halaman demo yang menunjukkan pattern penggunaan komponen lain.

**File:** `src/stories/Page.tsx`

---

## Storybook

### Menjalankan Storybook

```bash
npm run storybook
```

Buka di browser: [http://localhost:6006](http://localhost:6006)

### Available Stories

| Story | Description |
|---|---|
| **Components/Form/Default** | Single select dropdown default |
| **Components/Form/MultiSelect** | Multi-select dengan search |
| **Components/Form/WithoutSearch** | Dropdown tanpa fitur pencarian |
| **Components/Form/Outlined** | Variant outlined style |
| **Components/Form/MultiSelectOutlined** | Multi-select dengan outlined style |
| **Components/Form/CustomPlaceholder** | Custom placeholder text |
| **Components/Form/ManyOptions** | Dropdown dengan banyak opsi (scrollable) |

### Menggunakan Controls Panel

Di Storybook, gunakan panel **Controls** untuk mengubah props secara interaktif:

1. Buka story yang diinginkan di sidebar
2. Panel **Controls** ada di bagian bawah
3. Toggle `multiple`, `withSearch`, `outlined`
4. Edit `label` dan `placeholder` text
5. Perubahan langsung terlihat di preview

### Menambah Story Baru

Buat file `*.stories.tsx` di folder `src/stories/`:

```tsx
import type { Meta, StoryFn } from "@storybook/react";
import { Form } from "./Form";
import { action } from "@storybook/addon-actions";

const Template: StoryFn<typeof Form> = (args) => <Form {...args} />;

export const MyNewStory = Template.bind({});
MyNewStory.args = {
  label: "My Label",
  options: [
    { label: "Item A", value: "a" },
    { label: "Item B", value: "b" },
  ],
  multiple: false,
  withSearch: true,
  onChange: action("onChange"),
};
```

### Build Storybook untuk Deployment

```bash
npm run build-storybook
```

Output folder `storybook-static/` siap di-deploy ke hosting statis seperti **Vercel**, **Netlify**, atau **GitHub Pages**.

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Jalankan Vite development server |
| `build` | `npm run build` | TypeScript check + Vite production build |
| `lint` | `npm run lint` | Jalankan ESLint |
| `preview` | `npm run preview` | Preview production build |
| `storybook` | `npm run storybook` | Jalankan Storybook (port 6006) |
| `build-storybook` | `npm run build-storybook` | Build Storybook untuk deployment |

---

## Troubleshooting

| Problem | Solution |
|---|---|
| **Dependencies error** | Jalankan `npm install` ulang |
| **Storybook tidak berjalan** | Pastikan port 6006 tidak dipakai proses lain |
| **Component tidak render** | Pastikan file story bernama `*.stories.tsx` dan import benar |
| **Props tidak update di Controls** | Pastikan `argTypes` didefinisikan di story metadata |
| **Build error TypeScript** | Jalankan `npx tsc --noEmit` untuk cek error detail |
| **Material Icons tidak muncul** | Pastikan `index.css` di-import di entry point |

---

## Author

**Herlan Mustopa** - Makyo Co.
