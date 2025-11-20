import React from 'react';

interface Section8BadgeProps {
  eligible?: boolean;
  compact?: boolean;
  tooltip?: string;
}

const Section8Badge: React.FC<Section8BadgeProps> = ({
  eligible = true,
  compact = false,
  tooltip
}) => {
  if (!eligible) return null;

  const badgeClasses = compact
    ? "bg-white/95 backdrop-blur text-brand-teal px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm border border-teal-100"
    : "bg-white/95 backdrop-blur text-brand-teal px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-bold text-sm border border-teal-100";

  const newTooltip = tooltip || "This home meets all Section 8 certification requirements and is ready for voucher assistance. Veterans get full access to quality housing regardless of income.";

  return (
    <div className={badgeClasses} title={newTooltip}>
      <span className="text-lg">🛡️</span>
      {compact ? "Ready" : "Voucher Ready & Approved"}
    </div>
  );
};

export default Section8Badge;
