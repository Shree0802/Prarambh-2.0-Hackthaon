import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { UserCheck, CheckCircle2, ShieldCheck, Award, FolderCheck, ExternalLink, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateDiscovery = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await apiFetch('/employer/candidates');
        setCandidates(res || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCandidates();
  }, []);

  const openCandidateDetail = async (cand) => {
    try {
      const res = await apiFetch(`/employer/candidates/${cand.studentId}`);
      setSelectedCandidate(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Candidate Discovery (Evidence-First)</h1>
        <p className="text-xs text-slate-400">Discover candidates ranked by verified role fit & code commit evidence rather than self-declared resumes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Cards Grid */}
        <div className="lg:col-span-2 space-y-4">
          {candidates.map((cand, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center text-lg border border-brand-500/30">
                    {cand.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cand.name}</h3>
                    <p className="text-xs text-slate-400">{cand.targetRole}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Role Fit Alignment</span>
                    <span className="text-xl font-black text-emerald-400">{cand.roleFitPercentage}%</span>
                  </div>
                  <button
                    onClick={() => openCandidateDetail(cand)}
                    className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center space-x-1.5 transition"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Inspect Evidence</span>
                  </button>
                </div>
              </div>

              {/* Verified Competencies */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {cand.skills?.map((s, k) => (
                  <span key={k} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 flex items-center space-x-1">
                    <span>{s.skillName}: {s.score}%</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </span>
                ))}
              </div>

              {/* Evidence Totals */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Verified Evidence: <strong className="text-white">{cand.verifiedProjectsCount} Projects</strong> • <strong className="text-white">{cand.verifiedAssessmentsCount} Assessments</strong> • <strong className="text-white">{cand.verifiedCertificatesCount} Certs</strong></span>
                <span className="text-emerald-400 font-bold">✓ GitHub Code Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Verified Profile View Drawer */}
        <div className="lg:col-span-1">
          {selectedCandidate ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-brand-500/40 shadow-2xl space-y-5 sticky top-20">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">Verified Candidate Dossier</span>
                <h3 className="text-xl font-black text-white">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-400">{selectedCandidate.targetRole} • {selectedCandidate.institution}</p>
              </div>

              {/* Role Fit */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Verified Role Alignment</span>
                  <div className="text-2xl font-black text-white">{selectedCandidate.roleFitPercentage}%</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                  ✓
                </div>
              </div>

              {/* Verified Projects List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Projects Code Evidence</h4>
                {selectedCandidate.projects?.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{p.title}</span>
                      <span className="text-emerald-400">{p.verificationScore}/100</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>Repo Checked ✓</span>
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-brand-400 hover:underline">View GitHub Repo</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Certifications */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Certifications</h4>
                {selectedCandidate.evidenceList?.filter(e => e.evidenceType === 'Certifications').map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{c.title}</span>
                      <span className="text-[10px] text-slate-400">{c.source}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Verified</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`Shortlisted ${selectedCandidate.name} for interview!`)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition"
                >
                  Shortlist Candidate for Interview
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
              Select a candidate card to inspect detailed verified project code and assessment evidence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
