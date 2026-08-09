import { useEffect, useState, useCallback, useMemo } from 'react';
import { apiClient } from '../../lib/apiClient';

const STATUS_CONFIG = {
  pendiente:     { label: 'Pendiente',      bg: 'bg-amber-100',  text: 'text-amber-800', bar: 'bg-amber-400' },
  contactado:    { label: 'Contactado',     bg: 'bg-green-100',  text: 'text-green-800', bar: 'bg-green-500' },
  no_interesado: { label: 'No interesado',  bg: 'bg-slate-100',  text: 'text-slate-600', bar: 'bg-slate-300' },
};

const DAY_MS = 24 * 60 * 60 * 1000;

function dateKey(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatShortDate(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
}

function compactNumber(n) {
  return n.toLocaleString('es-CO');
}

function buildStats(leads) {
  const total = leads.length;

  const byCurso = new Map();
  const byDate  = new Map();
  const byStatus = { pendiente: 0, contactado: 0, no_interesado: 0 };

  for (const lead of leads) {
    const cursoLabel = lead.curso_title || lead.curso || 'Sin especificar';
    byCurso.set(cursoLabel, (byCurso.get(cursoLabel) || 0) + 1);

    const key = dateKey(lead.created_at);
    byDate.set(key, (byDate.get(key) || 0) + 1);

    if (byStatus[lead.status] === undefined) byStatus[lead.status] = 0;
    byStatus[lead.status] += 1;
  }

  const cursoStats = [...byCurso.entries()]
    .map(([curso, count]) => ({ curso, count }))
    .sort((a, b) => b.count - a.count);

  const dateStats = [...byDate.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const peakDate = dateStats.reduce((best, d) => (!best || d.count > best.count ? d : best), null);
  const topCurso = cursoStats[0] ?? null;

  const now       = Date.now();
  const last7     = leads.filter((l) => now - new Date(l.created_at).getTime() <= 7 * DAY_MS).length;
  const prev7     = leads.filter((l) => {
    const age = now - new Date(l.created_at).getTime();
    return age > 7 * DAY_MS && age <= 14 * DAY_MS;
  }).length;
  const weekDelta = last7 - prev7;

  const contactRate = total ? Math.round((byStatus.contactado / total) * 100) : 0;

  return { total, cursoStats, dateStats, byStatus, peakDate, topCurso, last7, weekDelta, contactRate };
}

function StatTile({ label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
      <p className="text-sm text-ink-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}

function CursoBarChart({ data }) {
  const max = data.length ? Math.max(...data.map((d) => d.count)) : 0;
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
      <h2 className="text-sm font-semibold text-ink-900">Solicitudes por curso</h2>
      <div className="mt-4 space-y-3">
        {data.map(({ curso, count }) => (
          <div key={curso} className="flex items-center gap-3">
            <div className="w-32 shrink-0 truncate text-sm text-ink-600" title={curso}>{curso}</div>
            <div className="h-6 flex-1 rounded-full bg-ink-50">
              <div
                className="h-6 rounded-full bg-primary-600"
                style={{ width: `${max ? Math.max((count / max) * 100, 4) : 0}%` }}
              />
            </div>
            <div className="w-6 shrink-0 text-right text-sm font-semibold text-ink-900">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DateBarChart({ data, peakDate }) {
  const max = data.length ? Math.max(...data.map((d) => d.count)) : 0;
  const [hovered, setHovered] = useState(null);
  const labelEvery = data.length > 14 ? Math.ceil(data.length / 10) : 1;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-900">Solicitudes por fecha</h2>
        {peakDate && (
          <p className="text-xs text-ink-400">
            Pico: <span className="font-medium text-ink-600">{formatShortDate(peakDate.date)}</span> ({peakDate.count})
          </p>
        )}
      </div>

      <div className="mt-6 flex h-40 items-end gap-1">
        {data.map((d, i) => {
          const isPeak = peakDate && d.date === peakDate.date;
          const heightPct = max ? Math.max((d.count / max) * 100, 6) : 0;
          return (
            <div
              key={d.date}
              className="group relative flex-1 flex flex-col items-center justify-end h-full"
              onMouseEnter={() => setHovered(d)}
              onMouseLeave={() => setHovered((cur) => (cur === d ? null : cur))}
              onFocus={() => setHovered(d)}
              onBlur={() => setHovered((cur) => (cur === d ? null : cur))}
              tabIndex={0}
            >
              {isPeak && (
                <span className="mb-1 text-xs font-semibold text-primary-700">{d.count}</span>
              )}
              {hovered === d && !isPeak && (
                <span className="absolute -top-6 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 text-xs text-white z-10">
                  {formatShortDate(d.date)}: {d.count}
                </span>
              )}
              <div
                className={`w-full rounded-t-[4px] transition-colors ${isPeak ? 'bg-primary-700' : 'bg-primary-300 group-hover:bg-primary-500'}`}
                style={{ height: `${heightPct}%` }}
              />
              {i % labelEvery === 0 && (
                <span className="mt-1 text-[10px] text-ink-400 whitespace-nowrap">{formatShortDate(d.date)}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBreakdown({ byStatus, total }) {
  const entries = Object.entries(STATUS_CONFIG);
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
      <h2 className="text-sm font-semibold text-ink-900">Estado de las solicitudes</h2>

      <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-ink-50">
        {entries.map(([key, cfg], i) => {
          const count = byStatus[key] || 0;
          const pct   = total ? (count / total) * 100 : 0;
          if (!pct) return null;
          return (
            <div
              key={key}
              className={`${cfg.bar} h-full ${i > 0 ? 'ml-0.5' : ''}`}
              style={{ width: `${pct}%` }}
              title={`${cfg.label}: ${count}`}
            />
          );
        })}
      </div>

      <ul className="mt-4 space-y-2">
        {entries.map(([key, cfg]) => (
          <li key={key} className="flex items-center justify-between text-sm">
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
              {cfg.label}
            </span>
            <span className="font-semibold text-ink-900">{byStatus[key] || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TableView({ cursoStats, dateStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Curso</th>
              <th className="px-4 py-3 text-right">Solicitudes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {cursoStats.map(({ curso, count }) => (
              <tr key={curso}>
                <td className="px-4 py-2 text-ink-700">{curso}</td>
                <td className="px-4 py-2 text-right font-medium text-ink-900">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-medium uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Solicitudes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {dateStats.map(({ date, count }) => (
              <tr key={date}>
                <td className="px-4 py-2 text-ink-700">{formatShortDate(date)}</td>
                <td className="px-4 py-2 text-right font-medium text-ink-900">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LeadsAdmin() {
  const [leads, setLeads]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/leads?pageSize=500');
      setLeads(data.items);
      setLoadError(null);
    } catch (err) {
      setLoadError(err.message || 'No se pudieron cargar las solicitudes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const stats = useMemo(() => buildStats(leads), [leads]);

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
    a.href = url; a.download = `solicitudes-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Solicitudes — Estadísticas</h1>
          <p className="mt-1 text-sm text-ink-500">
            El seguimiento de cada solicitud se hace desde WhatsApp; aquí ves el panorama general.
          </p>
        </div>
        <div className="flex gap-2">
          {!loadError && !loading && leads.length > 0 && (
            <button
              onClick={() => setShowTable((v) => !v)}
              className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50"
            >
              {showTable ? 'Ver gráficos' : 'Ver tabla'}
            </button>
          )}
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 disabled:opacity-60"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
          <button
            onClick={exportCSV}
            disabled={!leads.length}
            className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 disabled:opacity-60"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {loadError ? (
        <div className="rounded-2xl bg-red-50 p-12 text-center shadow-sm ring-1 ring-red-100">
          <p className="text-4xl">⚠️</p>
          <p className="mt-3 text-red-700">{loadError}</p>
          <button
            onClick={fetchLeads}
            className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Reintentar
          </button>
        </div>
      ) : loading ? (
        <p className="text-sm text-ink-400">Cargando...</p>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-ink-100">
          <p className="text-4xl">📭</p>
          <p className="mt-3 text-ink-500">No hay solicitudes aún.</p>
        </div>
      ) : showTable ? (
        <TableView cursoStats={stats.cursoStats} dateStats={stats.dateStats} />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Total de solicitudes"
              value={compactNumber(stats.total)}
              hint={`${stats.last7} en los últimos 7 días (${stats.weekDelta >= 0 ? '+' : ''}${stats.weekDelta} vs. semana anterior)`}
            />
            <StatTile
              label="Pendientes por contactar"
              value={compactNumber(stats.byStatus.pendiente || 0)}
              hint="Estado inicial de cada solicitud"
            />
            <StatTile
              label="Curso más solicitado"
              value={stats.topCurso ? stats.topCurso.curso : '—'}
              hint={stats.topCurso ? `${stats.topCurso.count} solicitudes` : undefined}
            />
            <StatTile
              label="Tasa de contacto"
              value={`${stats.contactRate}%`}
              hint="Solicitudes marcadas como contactadas"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CursoBarChart data={stats.cursoStats} />
            </div>
            <StatusBreakdown byStatus={stats.byStatus} total={stats.total} />
          </div>

          <DateBarChart data={stats.dateStats} peakDate={stats.peakDate} />
        </div>
      )}
    </div>
  );
}
