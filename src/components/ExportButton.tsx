import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { exportData, ExportType } from '../lib/export';

const EXPORT_TYPES = [
  { id: 'tasks', label: 'Aufgaben' },
  { id: 'coolers', label: 'Kühlhäuser' },
  { id: 'food', label: 'Lebensmittel' },
  { id: 'todos', label: 'Todo-Liste' }
] as const;

export function ExportButton() {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedType, setSelectedType] = useState<ExportType>('tasks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      setError('Bitte wählen Sie Start- und Enddatum aus');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const csv = await exportData(
        selectedType,
        new Date(startDate),
        new Date(endDate)
      );

      const typeLabel = EXPORT_TYPES.find(t => t.id === selectedType)?.label.toLowerCase();
      const fileName = `${typeLabel}_${startDate}_bis_${endDate}.csv`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
      setShowModal(false);
    } catch (err) {
      setError('Fehler beim Exportieren der Daten');
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-md hover:bg-gray-100"
      >
        <Download className="w-5 h-5" />
        <span>Export</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Daten exportieren</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Bereich auswählen
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as ExportType)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-900"
                >
                  {EXPORT_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Startdatum
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Enddatum
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-900"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleExport}
                  disabled={loading || !startDate || !endDate}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Exportiere...' : 'CSV herunterladen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}