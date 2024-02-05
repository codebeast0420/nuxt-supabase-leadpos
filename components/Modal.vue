<template>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog as="div" class="relative z-10" @close="$emit('update:isOpen')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            :class="`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6 ${modalSize}`">
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500" @click="$emit('update:isOpen')">
                                <span class="sr-only">Close</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div>
                                <DialogTitle v-if="title" as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ title }}</DialogTitle>
                                <div class="mt-2">
                                    <slot></slot>
                                </div>
                            </div>
                            <div v-if="showOkButton || showCancelButton" class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <Button v-if="showOkButton" @click="$emit('ok')" :variant="buttonVariant" :is-loading="isLoading">
                                    {{ $t(okButtonLabel) }}
                                </Button>
                                <Button v-if="showCancelButton" variant="light" @click="$emit('update:isOpen')">
                                    {{ $t(cancelButtonLabel) }}
                                </Button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
const { t } = useI18n()

const emit = defineEmits(['update:isOpen', 'ok'])

type ModalVariant = 'default' | 'danger'

const { isOpen, variant, size } = defineProps({
    title: {
        type: String,
    },
    showCancelButton: {
        type: Boolean,
        default: false
    },
    showOkButton: {
        type: Boolean,
        default: false
    },
    // TODO: improve https://discord.com/channels/473401852243869706/1155725469371604992
    cancelButtonLabel: {
        type: String,
        default: 'modal.cancel.label'
    },
    okButtonLabel: {
        type: String,
        default: 'modal.ok.label'
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String as PropType<ModalVariant>,
        default: 'default'
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    size: {
        type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | 'fit-content'>,
        default: 'md'
    },
})

const buttonVariant = computed(() => {
    switch (variant) {
        case 'danger':
            return 'danger'
        default:
            return 'primary'
    }
})

const modalSize = computed(() => {
    switch (size) {
        case 'sm':
            return 'sm:max-w-lg'
        case 'md':
            return 'sm:max-w-xl'
        case 'lg':
            return 'sm:max-w-2xl'
        case 'xl':
            return 'sm:max-w-3xl'
        case 'fit-content':
            return 'sm:max-w-fit'
        default:
            return 'sm:max-w-2xl'
    }
})
</script>
