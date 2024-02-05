<template>
    <DataTable
        title="Text Snippets"
        create-new-action-route="/text-snippet/create"
        :thead="['admin.text_snippet.name', 'admin.text_snippet.key']"
        :data="textSnippets"
    />
</template>

<script lang="ts" setup>
const supabase = useSupabaseClient()

const fetchTextSnippets = async () => {
    const { data, error } = await supabase
        .from('text_snippet')
        .select('id, key, value')
        .eq('lang', 'de')

    if (error) {
        console.error(error)
    }

    if (!data) return

    const mappedData = data.map(item => ({
        value: {
            type: 'Link',
            route: `/admin/text-snippets/edit/${item.id}`,
            value: item.value
        },
        key: {
            type: 'Text',
            value: item.key
        }
    }));

    return mappedData;
}

const textSnippets = await fetchTextSnippets()
</script>
