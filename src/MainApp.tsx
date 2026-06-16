import { supabase } from './supabaseClient'
import FullRecorder from './FullRecorder'

export default function MainApp() {
  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleSignOut}
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          background: 'none',
          border: '1px solid #333',
          color: '#888',
          borderRadius: 8,
          padding: '0.4rem 0.8rem',
          fontSize: '0.8rem',
          cursor: 'pointer',
          zIndex: 9999,
        }}
      >
        Sign out
      </button>
      <FullRecorder />
    </div>
  )
}