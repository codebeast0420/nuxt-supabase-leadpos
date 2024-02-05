

import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from './supabase-generated.types'
import { PostgrestError } from '@supabase/supabase-js'

// documentation: https://supabase.com/docs/reference/javascript/typescript-support
export type Database = MergeDeep<
    DatabaseGenerated,
    {}
>

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError
