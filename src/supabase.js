import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!url || !key) console.warn('Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
export const supabase = createClient(url, key)
export const api = {
  restaurants: {
    all: async()=>unwrap(await supabase.from('restaurants').select('*').order('created_at',{ascending:false})),
    create: async(row)=>unwrapOne(await supabase.from('restaurants').insert(row).select().single()),
    remove: async(id)=>unwrap(await supabase.from('restaurants').delete().eq('id',id))
  },
  members: {
    all: async()=>unwrap(await supabase.from('members').select('*').order('created_at',{ascending:false})),
    create: async(row)=>unwrapOne(await supabase.from('members').insert(row).select().single()),
    remove: async(id)=>unwrap(await supabase.from('members').delete().eq('id',id))
  },
  votes: {
    all: async()=>unwrap(await supabase.from('votes').select('*,restaurant:restaurants(*)').order('created_at',{ascending:false})),
    create: async(row)=>unwrapOne(await supabase.from('votes').insert(row).select('*,restaurant:restaurants(*)').single()),
    remove: async(id)=>unwrap(await supabase.from('votes').delete().eq('id',id))
  }
}
function unwrap({data,error}){if(error)throw error;return data||[]}
function unwrapOne({data,error}){if(error)throw error;return data}
