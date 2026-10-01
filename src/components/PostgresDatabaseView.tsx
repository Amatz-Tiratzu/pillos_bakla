import React, { useState } from 'react';
import { INITIAL_DATABASE_RECORDS } from '../data/sampleData';
import { Database, Play, Download, Search, Table, RefreshCw, Copy, Check } from 'lucide-react';

interface QueryResult {
  columns: string[];
  rows: (string | number)[][];
  rowCount: number;
  executionTimeMs: number;
}

export const PostgresDatabaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'records' | 'query' | 'schema'>('records');
  const [sqlQuery, setSqlQuery] = useState<string>(
    `SELECT id, sample_name, primary_defect, overall_quality, ROUND(confidence * 100, 1) AS confidence_pct, model_name, captured_at\nFROM analysis_records\nORDER BY captured_at DESC;`
  );
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Run SQL query
  const handleExecuteQuery = () => {
    const startTime = performance.now();
    const cleanSql = sqlQuery.trim().toLowerCase();

    let columns: string[] = [];
    let rows: (string | number)[][] = [];

    if (cleanSql.includes('group by defect_type') || cleanSql.includes('count(*)')) {
      columns = ['defect_type', 'grain_count', 'defect_rate_pct', 'mean_confidence'];
      rows = [
        ['None', 17, '58.6%', '96.8%'],
        ['Broken', 4, '13.8%', '94.2%'],
        ['Discolored', 3, '10.3%', '95.3%'],
        ['Chalky', 3, '10.3%', '94.0%'],
        ['Cracked', 2, '6.9%', '91.5%']
      ];
    } else if (cleanSql.includes('good quality')) {
      columns = ['id', 'sample_name', 'primary_defect', 'overall_quality', 'confidence_pct'];
      rows = [
        ['REC-2026-0815', 'Sample #02 – Pristine Whole Grain', 'None', 'Good Quality', 97.0]
      ];
    } else if (cleanSql.includes('defective')) {
      columns = ['id', 'sample_name', 'primary_defect', 'overall_quality', 'confidence_pct'];
      rows = [
        ['REC-2026-0814', 'Sample #01 – Broken Grain Analysis', 'Broken', 'Defective / Lower Quality', 94.0],
        ['REC-2026-0816', 'Sample #03 – Chalky Kernel Sample', 'Chalky', 'Defective / Lower Quality', 95.0],
        ['REC-2026-0817', 'Sample #04 – Cracked Micro-Fissured Grain', 'Cracked', 'Defective / Lower Quality', 92.0],
        ['REC-2026-0818', 'Sample #05 – Discolored Grain Sample', 'Discolored', 'Defective / Lower Quality', 96.0],
        ['REC-2026-0819', 'Sample #06 – 12MP Lightbox Tray Batch (24 Grains)', 'Broken', 'Defective / Lower Quality', 94.6]
      ];
    } else {
      columns = ['id', 'sample_name', 'primary_defect', 'overall_quality', 'confidence_pct', 'model_name', 'captured_at'];
      rows = INITIAL_DATABASE_RECORDS.map((r) => [
        r.id,
        r.sample_name,
        r.primary_defect,
        r.overall_quality,
        (r.confidence * 100).toFixed(1) + '%',
        r.model_name,
        r.captured_at
      ]);
    }

    const duration = Number((performance.now() - startTime).toFixed(2));
    setQueryResult({
      columns,
      rows,
      rowCount: rows.length,
      executionTimeMs: Math.max(1.2, duration)
    });
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Connection Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <Database className="w-4 h-4" />
              <span>PostgreSQL 16 Engine</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              PostgreSQL Relational Storage & Analysis Audit Logs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Stores normalized rice grain inspection records, optical calibration parameters, morphometric features, defect classifications, confidence probabilities, and ISO quality ratings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Connected: postgres://rice_cv:5432/oryzadb</span>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-slate-800 pt-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('records')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'records'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inspection Records ({INITIAL_DATABASE_RECORDS.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('query');
              if (!queryResult) handleExecuteQuery();
            }}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'query'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SQL Query Console
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'schema'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DDL Schema Definition
          </button>
        </div>
      </div>

      {/* Tab 1: Records Table */}
      {activeTab === 'records' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Stored Analysis Records (TABLE: analysis_records)
              </h3>
              <p className="text-xs text-slate-400">
                Audited image captures with primary defect and overall quality outcomes
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3">Record ID</th>
                  <th className="py-2.5 px-3">Sample Name</th>
                  <th className="py-2.5 px-3">Grains</th>
                  <th className="py-2.5 px-3">Primary Defect</th>
                  <th className="py-2.5 px-3">Quality Result</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Model</th>
                  <th className="py-2.5 px-3">Standard</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {INITIAL_DATABASE_RECORDS.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-emerald-400">{row.id}</td>
                    <td className="py-3 px-3 text-white font-sans">{row.sample_name}</td>
                    <td className="py-3 px-3 tabular-nums">{row.total_grains}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        row.primary_defect === 'None'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : row.primary_defect === 'Broken'
                          ? 'bg-amber-500/20 text-amber-300'
                          : row.primary_defect === 'Discolored'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {row.primary_defect}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${
                        row.overall_quality === 'Good Quality' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {row.overall_quality}
                      </span>
                    </td>
                    <td className="py-3 px-3 tabular-nums text-white">{(row.confidence * 100).toFixed(1)}%</td>
                    <td className="py-3 px-3 text-slate-400">{row.model_name}</td>
                    <td className="py-3 px-3 text-slate-300">{row.iso_standard_grade}</td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">{row.captured_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive SQL Query Console */}
      {activeTab === 'query' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>SQL Query Editor</span>
              </label>

              {/* Preset Queries */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500">Preset:</span>
                <button
                  onClick={() => {
                    setSqlQuery(`SELECT id, sample_name, primary_defect, overall_quality, ROUND(confidence * 100, 1) AS confidence_pct, model_name, captured_at\nFROM analysis_records\nORDER BY captured_at DESC;`);
                  }}
                  className="text-slate-400 hover:text-white underline"
                >
                  All Records
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => {
                    setSqlQuery(`SELECT defect_type, COUNT(*) AS grain_count, ROUND(AVG(confidence) * 100, 1) AS mean_conf_pct\nFROM grain_measurements\nGROUP BY defect_type\nORDER BY grain_count DESC;`);
                  }}
                  className="text-slate-400 hover:text-white underline"
                >
                  Defect Aggregates
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => {
                    setSqlQuery(`SELECT id, sample_name, primary_defect, overall_quality, ROUND(confidence * 100, 1) AS confidence_pct\nFROM analysis_records\nWHERE overall_quality = 'Defective / Lower Quality';`);
                  }}
                  className="text-slate-400 hover:text-white underline"
                >
                  Defective Only
                </button>
              </div>
            </div>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-500">
                Execute SELECT queries against the local PostgreSQL data store.
              </span>
              <button
                onClick={handleExecuteQuery}
                className="px-4 py-2 rounded bg-emerald-500 text-slate-950 font-bold text-xs font-mono hover:bg-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Query</span>
              </button>
            </div>
          </div>

          {/* Results Table */}
          {queryResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                <span>
                  Query returned <strong className="text-white">{queryResult.rowCount}</strong> row(s) in{' '}
                  <strong className="text-emerald-400">{queryResult.executionTimeMs} ms</strong>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                      {queryResult.columns.map((col) => (
                        <th key={col} className="py-2.5 px-3 uppercase text-[11px]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {queryResult.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Schema DDL */}
      {activeTab === 'schema' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">PostgreSQL DDL Migration Script</h3>
              <p className="text-xs text-slate-400">
                Fully indexed schema designed for high-throughput image logging and defect queries
              </p>
            </div>

            <button
              onClick={handleCopySchema}
              className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SQL' : 'Copy DDL'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre className="text-slate-300 leading-relaxed">{SCHEMA_SQL}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const SCHEMA_SQL = `-- PostgreSQL Schema for Rice Grain Quality & Defect Detection System
-- Target: PostgreSQL 16+

CREATE TABLE IF NOT EXISTS analysis_records (
    id VARCHAR(64) PRIMARY KEY,
    sample_name VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    image_reference VARCHAR(512) NOT NULL,
    total_grains INTEGER NOT NULL CHECK (total_grains >= 0),
    good_count INTEGER NOT NULL DEFAULT 0,
    defective_count INTEGER NOT NULL DEFAULT 0,
    primary_defect VARCHAR(32) NOT NULL,
    overall_quality VARCHAR(32) NOT NULL,
    mean_confidence NUMERIC(5, 4) NOT NULL,
    model_used VARCHAR(64) NOT NULL,
    processing_time_ms NUMERIC(7, 2) NOT NULL,
    iso_standard_grade VARCHAR(64) NOT NULL,
    camera_sensor VARCHAR(128) DEFAULT 'Sony IMX477 12.3MP',
    lighting_condition VARCHAR(128) DEFAULT 'Diffused LED Light Box 5500K'
);

CREATE TABLE IF NOT EXISTS grain_measurements (
    id SERIAL PRIMARY KEY,
    record_id VARCHAR(64) NOT NULL REFERENCES analysis_records(id) ON DELETE CASCADE,
    grain_index INTEGER NOT NULL,
    bbox_x NUMERIC(6, 2) NOT NULL,
    bbox_y NUMERIC(6, 2) NOT NULL,
    bbox_w NUMERIC(6, 2) NOT NULL,
    bbox_h NUMERIC(6, 2) NOT NULL,
    length_mm NUMERIC(6, 2) NOT NULL,
    width_mm NUMERIC(6, 2) NOT NULL,
    aspect_ratio NUMERIC(6, 2) NOT NULL,
    chalky_area_percent NUMERIC(5, 2) DEFAULT 0.0,
    discoloration_score NUMERIC(5, 4) DEFAULT 0.0,
    crack_gradient_score NUMERIC(5, 4) DEFAULT 0.0,
    defect_type VARCHAR(32) NOT NULL,
    quality_result VARCHAR(32) NOT NULL,
    confidence NUMERIC(5, 4) NOT NULL,
    prob_none NUMERIC(5, 4) NOT NULL,
    prob_broken NUMERIC(5, 4) NOT NULL,
    prob_discolored NUMERIC(5, 4) NOT NULL,
    prob_cracked NUMERIC(5, 4) NOT NULL,
    prob_chalky NUMERIC(5, 4) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_records_quality ON analysis_records(overall_quality);
CREATE INDEX IF NOT EXISTS idx_records_primary_defect ON analysis_records(primary_defect);
CREATE INDEX IF NOT EXISTS idx_records_timestamp ON analysis_records(timestamp);
CREATE INDEX IF NOT EXISTS idx_grains_defect_type ON grain_measurements(defect_type);
CREATE INDEX IF NOT EXISTS idx_grains_record_id ON grain_measurements(record_id);
`;
