const supabaseUrl = 'https://rzarmwfxbhasplpnyikg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YXJtd2Z4Ymhhc3BscG55aWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MDMwOTQsImV4cCI6MjA0Mzk3OTA5NH0.purSV-A3qcUtUdSHU4d4gVcTbDGwmr7x-zS0rwK663Y'

// When using the CDN, createClient is available through the global supabase object
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// Make it available globally
window.supabaseClient = supabaseClient
