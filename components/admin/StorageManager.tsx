'use client'

export default function StorageManager() {
  const clearAllData = () => {
    if (confirm('⚠️ Are you sure you want to clear ALL data? This cannot be undone!')) {
      localStorage.clear()
      alert('All data cleared! Please refresh the page.')
      window.location.reload()
    }
  }

  const getStorageSize = () => {
    let total = 0
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }
    return (total / 1024).toFixed(2) // KB
  }

  return (
    <div className="bg-black border border-hotpink/30 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">💾 Storage Management</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Storage Used:</span>
          <span className="text-white font-bold">{getStorageSize()} KB</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Storage Limit:</span>
          <span className="text-white font-bold">~5-10 MB</span>
        </div>
        <div className="border-t border-hotpink/30 pt-4 mt-4">
          <p className="text-sm text-gray-400 mb-4">
            If you're running out of space, clear all data to start fresh. All projects, gallery, events, publications, and awards will be deleted.
          </p>
          <button
            onClick={clearAllData}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
          >
            🗑️ Clear All Data
          </button>
        </div>
      </div>
    </div>
  )
}
