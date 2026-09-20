import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { GraduationCap, Award, CheckCircle2, BookOpen, Calculator, Sparkles } from 'lucide-react';

export const AcademicProfilePage = () => {
  const [academic, setAcademic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademic = async () => {
      try {
        const res = await apiFetch('/academic');
        setAcademic(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademic();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Academic Record & Subject-to-Skill Mapper</h1>
        <p className="text-xs text-slate-400">Academic performance is tracked separately from demonstrated practical competency so CGPA does not artificially skew industry readiness.</p>
      </div>

      {/* Overview Cards: Academic vs Practical */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Academic CGPA (Cumulative)</span>
          <div className="text-3xl font-black text-amber-400">{academic?.cgpa || 8.6} <span className="text-xs text-slate-500 font-normal">/ 10.0</span></div>
          <p className="text-xs text-slate-400">Degree: {academic?.degree}</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Current Progress</span>
          <div className="text-xl font-bold text-white">{academic?.currentYear}</div>
          <p className="text-xs text-slate-400">Semester {academic?.semester} • {academic?.branch}</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950 to-slate-900 border border-brand-500/30 shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-brand-400 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Separation Policy</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            CGPA reflects course coursework grades. Practical Competency (78%) is derived exclusively from verified code repos, MCQs, and live test runners.
          </p>
        </div>
      </div>

      {/* Subject to Skill Mapping Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-brand-400" />
          <span>Course Subject-to-Industry Skill Mapping Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Marks</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Mapped Industry Competencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {academic?.subjects?.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-850/50 transition">
                  <td className="py-3.5 px-4 font-mono text-brand-400 font-bold">{sub.code}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{sub.name}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-200">{sub.marks} / 100</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {sub.mappedSkills?.map((sk, k) => (
                        <span key={k} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
