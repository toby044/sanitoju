# Doctypes

A doctype is a page type in the page tree. Each doctype gets **Content**, **SEO**, and **Settings** tabs by default. The Settings tab holds the auto-injected `parent` and `slug` fields from the page tree plugin.

## Adding a new doctype

**1. Create the file** `doctypes/myPage.ts`

```ts
import {defineField} from 'sanity'
import {defineDoctype} from '../utils/defineDoctype'

export const myPageType = defineDoctype({
  name: 'myPage',
  title: 'My Page',
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'blocks', type: 'array', group: 'content', of: [{type: 'heroBlock'}] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
})
```

**2. Register it** in `schemaTypes/index.ts`

```ts
import {myPageType} from './doctypes/myPage'
// add to schemaTypes array
```

**3. Add it to the page tree** in `pageTreeConfig.ts`

```ts
pageSchemaTypes: ['frontPage', 'contentPage', 'eventList', 'myPage'],
```

That's it — the page tree, URL resolution, and internal links all pick it up automatically.

---

## Extra tabs

Pass a third argument with additional groups. They slot in between Content and SEO.

```ts
export const myPageType = defineDoctype(
  {
    name: 'myPage',
    fields: [
      defineField({ name: 'title', type: 'string', group: 'content' }),
      defineField({ name: 'items', type: 'array', group: 'related', of: [...] }),
      defineField({ name: 'seo', type: 'seo', group: 'seo' }),
    ],
  },
  {},
  [{ name: 'related', title: 'Related' }],
)
```

Result: **Content → Related → SEO → Settings**

---

## Root page

Only one doctype can be root (the front page). Pass `{isRoot: true}` as the second argument.

```ts
export const frontPageType = defineDoctype({ ... }, { isRoot: true })
```

## Available blocks

| Block | Name |
|-------|------|
| Hero | `heroBlock` |
| Text (rich text) | `textBlock` |
| Media (image/video) | `mediaBlock` |
| Link List | `linkListBlock` |
| Media Gallery | `mediaGalleryBlock` |
