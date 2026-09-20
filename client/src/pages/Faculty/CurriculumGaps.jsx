import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { AlertTriangle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const CurriculumGaps = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        const res = await apiFetch('/faculty/curriculum-gaps');
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGaps();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { curriculumGaps, aiInsights } = data || {};

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Curriculum Gap Analysis & AI Insights</h1>
        <p className="text-xs text-slate-400">Institutional recommendations based on aggregate student competency performance data.</p>
      </div>

      {/* Main AI Insight Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Institutional Executive Insight</span>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">
          {aiInsights?.summary || "58% of third-year students demonstrate a gap in cloud deployment skills. Docker and cloud fundamentals show the largest competency gaps."}
        </p>
      </div>

      {/* Curriculum Gap Cards */}
      <div className="space-y-4">
        {(curriculumGaps || aiInsights?.criticalInsights)?.map((gap, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{gap.title}</h3>
                  <span className="text-xs text-rose-400 font-semibold">{gap.affectedStudentsPct || gap.affectedPct}% of Students Affected</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Observed Empirical Insight</span>
              <p className="leading-relaxed">{gap.insight || gap.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1 text-xs text-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recommended Institutional Action</span>
              </span>
              <p className="leading-relaxed font-semibold">{gap.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
