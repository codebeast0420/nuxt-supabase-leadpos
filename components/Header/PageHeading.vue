<template>
    <div class="text-medium">
        <!-- Remove leading slash, replace remaining slashes with dots, and remove any ".<number>" occurrences for i18n key. -->
        {{ $t(`${$route.fullPath.replace(/^\//, '').replace(/\//g, '.').replace(/\.\d+/g, '')}.page_heading`) }}
    </div>
</template>

<script setup lang="ts"></script>
