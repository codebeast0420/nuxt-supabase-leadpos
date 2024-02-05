<template>

    <div class="max-w-4xl mx-auto mb-8">
        <h1>Textbaustein bearbeiten</h1>
        <button @click="handleSubmit">Speichern</button>
    </div>

    <Card>
        <h1>Informationen:</h1>
      <div>
        <label for="text_snippet_key" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('admin.text_snippet.name') }}</label>
        <div class="mt-2">
          <input type="text" name="text_snippet_key" id="text_snippet_key" :value="textSnippetKey" disabled="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6 px-4" />
        </div>
      </div>
    </Card>

    <Card class="mt-16">
        <div v-for="(snippet, index) in textSnippets" :key="snippet.id">
            <h1>Textbaustein-Set: {{ snippet.lang }}</h1>
            <div>
                <label for="set-de-DE" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('admin.text_snippet.name') }}</label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="set-de-DE"
                    id="set-de-DE"
                    :value="editedTextSnippets[index].editedValue"
                    @input="handleSnippetInput(index, $event.target.value)"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()

const textSnippetKey = ref('')
const textSnippets = ref(null)
const editedTextSnippets = ref([]);

const handleSnippetInput = (index: number, value: string) => {
    editedTextSnippets.value[index].editedValue = value;
};

const getTextSnippetKeyById = async (id: string | number) => {
    const { data, error } = await supabase.from('text_snippet')
        .select('key')
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
    }

    if (!data) return

    return data.key
}


const getTextSnippets = async () => {
    const { data, error } = await supabase.from('text_snippet')
        .select('id, key, value, lang')
        .eq('key', textSnippetKey.value)

    if (error) {
        console.error(error)
    }

    if (!data) return

    return data;
}

textSnippetKey.value = await getTextSnippetKeyById(route.params.id)
textSnippets.value = await getTextSnippets()

const initializeEditedTextSnippets = () => {
    editedTextSnippets.value = textSnippets.value.map(snippet => {
        return {
            id: snippet.id,
            editedValue: snippet.value
        };
    });
};

// Initialisieren der bearbeiteten Textbausteine
initializeEditedTextSnippets();

const handleSubmit = async () => {
    for (const editedSnippet of editedTextSnippets.value) {
        const { data, error } = await supabase
            .from('text_snippet')
            .update({ value: editedSnippet.editedValue })
            .eq('id', editedSnippet.id);

        if (error) {
            console.error(error);
        }
    }

    alert('Änderungen gespeichert');
}
</script>
