import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '../../lib/apiClient';
import { useToast } from '../components/ToastProvider';

const STATUS_CONFIG = {
  pendiente:     { label: 'Pendiente',      bg: 'bg-amber-100',  text: 'text-amber-800' },
  contactado:    { label: 'Contactado',     bg: 'bg-green-100',  text: 'text-green-800' },
  no_interesado: { label: 'No interesado',  bg: 'bg-slate-100',  text: 'text-slate-600' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pendiente;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

function DetailModal({ lead, onClose, onStatusChange }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes]   = useState(lead.notes ?? '');
  const [saving, setSaving] = useState(false);
  const { addToast }        = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await apiClient.put(`/leads/${lead.id}`, { status, notes });
      onStatusChange(updated);
      addToast('Lead actualizado.');
      onClose();
    } catch {
      addToast('No se pudo guardar.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-ink-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">{lead.nombre}</h2>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-600 text-xl leading-none">×</button>
        </div>

        <div className="px-6 py-5 space-y-3 text-sm text-ink-700">
          <div className="grid grid-cols-2 gap-3">
            <div><span className="font-medium text-ink-500">Correo</span><p className="mt-0.5">{lead.email}</p></div>
            <div><span className="font-medium text-ink-500">Teléfono</span><p className="mt-0.5">{lead.telefono}</p></div>
            <div><span className="font-medium text-ink-500">Curso</span><p className="mt-0.5">{lead.curso_title || lead.curso}</p></div>
            <div><span className="font-medium text-ink-500">Fecha</span><p className="mt-0.5">{new Date(lead.created_at).toLocaleString('es-CO')}</p></div>
          </div>

          <div>
            <span className="font-medium text-ink-500">Mensaje</span>
            <p className="mt-0.5 rounded-xl bg-ink-50 px-4 py-3 whitespace-pre-wrap">{lead.mensaje}</p>
          </div>

          <div>
            <label className="font-medium text-ink-500 block mb-1">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-ink-100 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
            >
              {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                <option key={val} value={val}>{cfg.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-ink-500 block mb-1">Notas internas</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Ej: Llamé el lunes, interesado en el curso de Python..."
              className="w-full rounded-xl border border-ink-100 px-3 py-2 text-sm focus:outline-none focus:border-primary-400 resize-none"
            />
          </div>
        </div>

        <div className="border-t border-ink-100 px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-ink-200 px-4 py-2 text-sm text-ink-600 hover:bg-ink-50">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LeadsAdmin() {
  const [leads, setLeads]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ pageSize: 200 });
      if (filterStatus) params.set('status', filterStatus);
      const data = await apiClient.get(`/leads?${params}`);
      setLeads(data.items);
      setTotal(data.total);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusChange = (updated) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  };

  const exportCSV = () => {
    const headers = ['ID', 'Fecha', 'Nombre', 'Correo', 'Teléfono', 'Curso', 'Mensaje', 'Estado', 'Notas'];
    const rows    = leads.map((l) => [
      l.id,
      new Date(l.created_at).toLocaleString('es-CO'),
      l.nombre,
      l.email,
      l.telefono,
      l.curso_title || l.curso,
      `"${l.mensaje.replace(/"/g, '""')}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csv  = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const counts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc; }, {});

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Leads / Solicitudes</h1>
          <p className="mt-1 text-sm text-ink-500">
            {total} en total ·{' '}
            <span className="text-amber-600">{counts.pendiente || 0} pendientes</span> ·{' '}
            <span className="text-green-600">{counts.contactado || 0} contactados</span>
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
          >
            <option value="">Todos los estados</option>
            {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
              <option key={val} value={val}>{cfg.label}</option>
            ))}
          </select>
          <button
            onClick={exportCSV}
            className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-ink-400">Cargando...</p>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-ink-100">
          <p className="text-4xl">📭</p>
          <p className="mt-3 text-ink-500">No hay solicitudes aún.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400">
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3 hidden sm:table-cell">Correo / Tel.</th>
                <th className="px-4 py-3 hidden md:table-cell">Curso</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className="cursor-pointer hover:bg-ink-50 transition-colors"
                >
                  <td className="px-4 py-3 text-ink-500 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-900">{lead.nombre}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-ink-500">
                    <div>{lead.email}</div>
                    <div className="text-xs">{lead.telefono}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-ink-600">
                    {lead.curso_title || lead.curso}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <DetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(updated) => { handleStatusChange(updated); setSelected(updated); }}
        />
      )}
    </div>
  );
}
