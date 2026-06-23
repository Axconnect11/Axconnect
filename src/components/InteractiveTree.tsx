/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Users, Search, Network, Info, ArrowUp, ArrowRight, ShieldCheck, UserMinus, PlusSquare } from 'lucide-react';
import { TeamMember } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveTreeProps {
  teamMembers: TeamMember[];
  rootId: string;
  onSelectRoot: (id: string) => void;
  onJoinLeadClick?: () => void;
}

export const InteractiveTree: React.FC<InteractiveTreeProps> = ({
  teamMembers,
  rootId,
  onSelectRoot,
  onJoinLeadClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLegFilter, setSelectedLegFilter] = useState<'All' | 'Left' | 'Right'>('All');

  // Find the selected member
  const currentRoot = useMemo(() => {
    return teamMembers.find(m => m.id === rootId) || teamMembers[0];
  }, [teamMembers, rootId]);

  // Find descendants for downlines
  const memberMap = useMemo(() => {
    const map = new Map<string, TeamMember>();
    teamMembers.forEach(m => map.set(m.id, m));
    return map;
  }, [teamMembers]);

  // Resolve left and right immediate children
  const leftChild = currentRoot.leftLegId ? memberMap.get(currentRoot.leftLegId) : null;
  const rightChild = currentRoot.rightLegId ? memberMap.get(currentRoot.rightLegId) : null;

  // Resolve secondary tier left children
  const leftLeftChild = leftChild?.leftLegId ? memberMap.get(leftChild.leftLegId) : null;
  const leftRightChild = leftChild?.rightLegId ? memberMap.get(leftChild.rightLegId) : null;

  // Resolve secondary tier right children
  const rightLeftChild = rightChild?.leftLegId ? memberMap.get(rightChild.leftLegId) : null;
  const rightRightChild = rightChild?.rightLegId ? memberMap.get(rightChild.rightLegId) : null;

  // Navigate back to the very top (corporate root parent or true manager)
  const isTrueRoot = currentRoot.parentId === null;
  const handleNavigateUp = () => {
    if (currentRoot.parentId) {
      onSelectRoot(currentRoot.parentId);
    }
  };

  // Compile full list under the selected node (excluding self) to show members list
  const downlineMembersList = useMemo(() => {
    const list: { member: TeamMember; legPlaced: 'Left' | 'Right' }[] = [];

    const traverse = (nodeId: string | null, leg: 'Left' | 'Right') => {
      if (!nodeId) return;
      const child = memberMap.get(nodeId);
      if (child) {
        list.push({ member: child, legPlaced: leg });
        traverse(child.leftLegId, leg);
        traverse(child.rightLegId, leg);
      }
    };

    traverse(currentRoot.leftLegId, 'Left');
    traverse(currentRoot.rightLegId, 'Right');
    return list;
  }, [currentRoot, memberMap]);

  // Filter list by search term and selected leg
  const filteredDownlines = useMemo(() => {
    return downlineMembersList.filter(item => {
      const matchSearch =
        item.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.member.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchLeg = selectedLegFilter === 'All' || item.legPlaced === selectedLegFilter;
      return matchSearch && matchLeg;
    });
  }, [downlineMembersList, searchTerm, selectedLegFilter]);

  // Tree Node Renderer Component
  const renderNodeBox = (member: TeamMember | null | undefined, legIndicator: 'Left' | 'Right' | 'Root') => {
    if (!member) {
      return (
        <div className="flex flex-col items-center">
          <div className="w-32 h-16 rounded-xl border border-dashed border-white/10 bg-black/40 flex flex-col items-center justify-center p-2 text-slate-500">
            <span className="text-[10px] font-semibold text-slate-500 block">Empty Slot</span>
            <button
              onClick={onJoinLeadClick}
              className="text-[10px] text-amber-500 font-bold hover:underline mt-1 flex items-center gap-0.5 cursor-pointer"
            >
              <PlusSquare className="w-3 h-3" />
              Register
            </button>
          </div>
        </div>
      );
    }

    const isActive = member.status === 'Active';
    const isRoot = legIndicator === 'Root';

    return (
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          onClick={() => onSelectRoot(member.id)}
          className={`w-36 rounded-xl border p-2.5 text-center cursor-pointer transition-all ${
            isRoot
              ? 'bg-gradient-to-br from-amber-950/40 to-black border-amber-500 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/5'
              : 'bg-[#161618] border-white/5 shadow-md hover:border-amber-500/50'
          }`}
        >
          {/* Leg badge */}
          {!isRoot && (
            <span className="inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full mb-1 bg-white/5 border border-white/10 text-amber-500">
              {legIndicator} Leg
            </span>
          )}

          {isRoot && (
            <span className="inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full mb-1 bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Selected Focus
            </span>
          )}

          <h4 className="text-xs font-bold text-white truncate">{member.name}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">{member.id}</p>

          <div className="mt-1.5 flex items-center justify-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-[9px] font-medium text-slate-400 capitalize">{member.packagePurchased} Tier</span>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto px-4 py-4 font-sans">
      {/* Page Header */}
      <div className="bg-[#161618] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Network className="w-6 h-6 text-amber-500" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-sans">
                Joining Legs & Referral Downline
              </h2>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed font-sans">
                Analyze your binary team tree configuration recursively. Ensure balance between Left and Right downline legs for maximum team bonuses.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5 self-start md:self-auto shrink-0 text-xs text-left">
            <div className="flex flex-col pr-4 border-r border-white/5">
              <span className="text-slate-500 uppercase tracking-widest text-[9px] font-mono">Left Leg members</span>
              <span className="text-amber-500 font-bold text-base mt-0.5 font-mono">{currentRoot.teamStrength.left}</span>
            </div>
            <div className="flex flex-col px-4 border-r border-white/5">
              <span className="text-slate-500 uppercase tracking-widest text-[9px] font-mono">Right Leg members</span>
              <span className="text-amber-500 font-bold text-base mt-0.5 font-mono">{currentRoot.teamStrength.right}</span>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-slate-500 uppercase tracking-widest text-[9px] font-mono">Active Members</span>
              <span className="text-emerald-400 font-bold text-base mt-0.5 font-mono">{currentRoot.teamStrength.active}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Binary Tree Visualizer Container */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col items-center overflow-x-auto min-h-[420px] shadow-2xl relative">
        {/* Navigation Up */}
        {!isTrueRoot && (
          <button
            onClick={handleNavigateUp}
            className="absolute top-6 left-6 flex items-center gap-1 text-xs text-white bg-white/5 border border-white/10 hover:text-amber-500 hover:border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Parent Level
          </button>
        )}

        <div className="absolute top-6 right-6 flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <Info className="w-3.5 h-3.5 text-amber-500" />
          <span>Click on any member box to view their branching downlines!</span>
        </div>

        {/* Trees Branches (Custom Layout) */}
        <div className="min-w-[700px] flex flex-col items-center pt-8">
          {/* Level 1: Focus Root Node */}
          <div className="mb-8">
            {renderNodeBox(currentRoot, 'Root')}
          </div>

          {/* Connective Line Row 1 */}
          <div className="w-[320px] h-6 border-t-2 border-x-2 border-amber-500/30 rounded-t-lg relative">
            <div className="absolute left-1/2 top-[-24px] transform -translate-x-1/2 w-0.5 h-6 bg-amber-500/30"></div>
          </div>

          {/* Level 2: Left and Right Leg Childs */}
          <div className="flex justify-between w-[520px] mb-8">
            <div className="flex flex-col items-center">
              {renderNodeBox(leftChild, 'Left')}
              {/* Left Branch connectors */}
              {leftChild && (
                <div className="w-[140px] h-6 border-t-2 border-x-2 border-amber-500/20 rounded-t-lg mt-4 relative">
                  <div className="absolute left-1/2 top-[-16px] transform -translate-x-1/2 w-0.5 h-4 bg-amber-500/20"></div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              {renderNodeBox(rightChild, 'Right')}
              {/* Right Branch connectors */}
              {rightChild && (
                <div className="w-[140px] h-6 border-t-2 border-x-2 border-amber-500/20 rounded-t-lg mt-4 relative">
                  <div className="absolute left-1/2 top-[-16px] transform -translate-x-1/2 w-0.5 h-4 bg-amber-500/20"></div>
                </div>
              )}
            </div>
          </div>

          {/* Level 3: Dual branching grandchildren */}
          <div className="flex justify-between w-[588px]">
            {/* Left branch downlines */}
            <div className="flex justify-between w-[240px]">
              {renderNodeBox(leftChild ? leftLeftChild : null, 'Left')}
              {renderNodeBox(leftChild ? leftRightChild : null, 'Right')}
            </div>

            {/* Right branch downlines */}
            <div className="flex justify-between w-[240px]">
              {renderNodeBox(rightChild ? rightLeftChild : null, 'Left')}
              {renderNodeBox(rightChild ? rightRightChild : null, 'Right')}
            </div>
          </div>
        </div>
      </div>

      {/* Downline Members List Table */}
      <div className="bg-[#161618] border border-white/5 rounded-2xl shadow-xl p-6">
        <h3 className="text-md font-bold text-white mb-1.5 text-left font-sans">Direct & Indirect Active Downline Members</h3>
        <p className="text-slate-400 text-xs mb-6 text-left font-sans">List of all associated network referrals connected under {currentRoot.name}&apos;s organization legs.</p>

        {/* Filter and Search Bar controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by name, ID or rank role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 text-white text-sm pl-10 pr-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 transition-colors font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 font-mono">Leg filter:</span>
            <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex items-center gap-1 font-sans">
              {(['All', 'Left', 'Right'] as const).map(leg => (
                <button
                  key={leg}
                  onClick={() => setSelectedLegFilter(leg)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg cursor-pointer transition-all ${
                    selectedLegFilter === leg
                      ? 'bg-amber-500 text-black shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {leg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          {filteredDownlines.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <th className="pb-3.5 pl-4">Member Info</th>
                  <th className="pb-3.5">Leg Channel</th>
                  <th className="pb-3.5">Join Date</th>
                  <th className="pb-3.5">Package Bought</th>
                  <th className="pb-3.5">Sponsor Name</th>
                  <th className="pb-3.5">Status</th>
                  <th className="pb-3.5 text-right pr-4">Total Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                <AnimatePresence>
                  {filteredDownlines.map(({ member, legPlaced }, idx) => {
                    const active = member.status === 'Active';
                    return (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="py-3.5 pl-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 font-bold text-xs flex items-center justify-center font-mono">
                            {member.name.charAt(0)}
                          </div>
                          <div className="text-left font-sans">
                            <span
                              onClick={() => {
                                onSelectRoot(member.id);
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                              }}
                              className="font-bold text-white hover:text-amber-500 transition-colors cursor-pointer block text-xs"
                            >
                              {member.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono uppercase block">{member.id}</span>
                          </div>
                        </td>

                        <td className="py-3.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-500">
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            {legPlaced} Leg
                          </span>
                        </td>

                        <td className="py-3.5 text-xs text-slate-300 font-mono">{member.joinDate}</td>

                        <td className="py-3.5 text-xs">
                          <span className="font-semibold text-slate-200">{member.packagePurchased} Package</span>
                        </td>

                        <td className="py-3.5 text-xs text-slate-400 font-medium text-left">
                          {member.sponsorName}
                        </td>

                        <td className="py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-xl font-medium ${
                            active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                            {member.status}
                          </span>
                        </td>

                        <td className="py-3.5 text-right font-mono font-bold text-white pr-4">
                          ₹{member.earnings.total.toLocaleString('en-IN')}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 bg-black/40 border border-dashed border-white/10 rounded-xl my-4 text-slate-500 flex flex-col items-center animate-none">
              <UserMinus className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-sm font-semibold font-sans">No active downline members found matching your search query.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedLegFilter('All'); }}
                className="text-amber-500 hover:underline text-xs font-bold mt-1 cursor-pointer font-sans"
              >
                Clear all active filters & state
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
