<template>
    <div>
        <h2>{{ t('step.faq.heading') }}</h2>
        <div class="mt-6">
            <div v-for="item in questionsWithAnswers" class="mb-5">
                <strong>{{ item.question }}</strong>
                <p class="text-tertiary">{{ item.answer }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const questionsWithAnswers = [
    {
        question: t('step.faqs.question1'),
        answer: t('step.faqs.answer1')
    },
    {
        question: t('step.faqs.question2'),
        answer: t('step.faqs.answer2')
    },
    {
        question: t('step.faqs.question3'),
        answer: t('step.faqs.answer3')
    },
]
</script>
