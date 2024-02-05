<template>
    <div class="flex justify-center border-b py-5 sticky top-0 bg-white z-10">
        <ul class="flex">
          <li v-for="(step, index) in steps" :key="step.key" class="flex items-center">
            <span
              class="text-tertiary text-sm "
              :class="{ '!text-body': step.key === activeStepKey }"
            >
              {{ step.title }}
            </span>

            <template v-if="index !== steps.length - 1">
              <IconRightArrow class="!w-3 !h-3 mx-4" filled />
            </template>
          </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { UserStepKey } from '@/types/user'
import IconRightArrow from '~/assets/icons/right-arrow.svg'

defineProps({
    activeStepKey: {
        type: String as PropType<UserStepKey>,
        required: true
    }
})

const { steps } = useSteps()
</script>

