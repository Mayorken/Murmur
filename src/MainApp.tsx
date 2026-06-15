import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createDefaultTitle,
  formatDuration,
  getAudioExtension,
  matchesMemo,
  normalizeTitle,
  sortMemosByNewest,
} from './memoUtils'
import { createBackupFile, createBackupFileName, readBackupFile } from './backup'
import { deleteMemo, getAllMemos, saveMemo, updateMemo } from './memoStore'
import Logo from './Logo'
import { supabase } from './supabaseClient'

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
      <OriginalRecorder />
    </div>
  )
}

function OriginalRecorder() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [memos, setMemos] = useState<any[]>([])

  useEffect(() => {
    getAllMemos().then(setMemos)
  }, [])

  return (
    <div>
      <Logo />
      <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>
        {memos.length === 0
          ? 'No recordings yet. Tap record to start.'
          : `${memos.length} recording${memos.length > 1 ? 's' : ''}`}
      </p>
    </div>
  )
}