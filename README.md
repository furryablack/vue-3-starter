# vue 3 starter

Simple start

- git clone
- yarn install
- cp .env sample to env files && (optionally) change them
- yarn serve
- open browser

---

Stack:
- effector
- effector-root
- effector-logger
- effector-inspector
- sentry
- less
- babel alongside typescript
- stylelint with prettier (only styles)
- eslint with prettier (js and ts)

---

How write component

```
./component
-- ?component.ts
-- component.vue
-- ?component.less
-- index.ts
```

index.ts: reexport 'component.**vue**' default as named + ?defineAsyncComponent + ?webpack async import

```vue
<!-- view first -->
<template>
    // view
</template>

<!-- script second -->
<script src="./component.ts" lang="ts"/>

<!-- styles end -->
<style src="./component.less" lang="less"/>
```
