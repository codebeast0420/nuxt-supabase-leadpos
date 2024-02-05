<template>
<header ref="headerRef" class="px-6 py-2 border-b flex items-center justify-between sticky top-0 bg-white z-10">
    <HeaderPageHeading />
    <HeaderUserDropdown />
</header>
</template>

<script lang="ts" setup>
const headerRef = ref<HTMLElement | null>(null);
const headerHeight = useState('headerHeight')

onMounted(() => {
    if (headerRef.value) {
        headerHeight.value = headerRef.value.offsetHeight;
    }
});
</script>
