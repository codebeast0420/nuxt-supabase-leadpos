// // api/text-snippets.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    try {
        const supabase = await serverSupabaseClient(event)

        const { data, error } = await supabase.from('text_snippet').select('*');
        if (error) {
            console.error(error)
        }

        return data;
    } catch (error) {
        console.error(error)
    }
})
