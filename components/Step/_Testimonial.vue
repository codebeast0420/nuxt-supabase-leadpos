<template>
    <div class="text-2xl font-semibold">
        {{ $t('step.testimonial.text') }}
    </div>
    <div class="flex min-w-0 gap-x-4 mt-8">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="$t('step.testimonial.person_image_url')" :alt="$t('step.testimonial.person_name')" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ $t('step.testimonial.person_name') }}</p>
            <p class="truncate text-xs leading-5 text-gray-500">{{ $t('step.testimonial.person_occupation') }}</p>
        </div>
    </div>
</template>

