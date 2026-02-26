export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', color: '#E1306C' },
  { id: 'tiktok', name: 'TikTok', color: '#010101' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
  { id: 'twitter', name: 'X / Twitter', color: '#1DA1F2' },
  { id: 'pinterest', name: 'Pinterest', color: '#E60023' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
];

export const INDUSTRIES = [
  { id: 'general', name: 'General / Mixed' },
  { id: 'retail', name: 'Retail / E-commerce' },
  { id: 'food', name: 'Food & Restaurant' },
  { id: 'fitness', name: 'Health & Fitness' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'professional', name: 'Professional Services / B2B' },
  { id: 'nonprofit', name: 'Non-Profit' },
  { id: 'beauty', name: 'Beauty & Fashion' },
  { id: 'tech', name: 'Tech / SaaS' },
  { id: 'travel', name: 'Travel & Hospitality' },
];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Hours 0-23 in local time
export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function formatHour(h) {
  if (h === 0) return '12am';
  if (h < 12) return `${h}am`;
  if (h === 12) return '12pm';
  return `${h - 12}pm`;
}

// Returns a score 0-4 for a given platform, industry, day (0=Mon), hour
// Data represents typical engagement patterns based on research
export function getScore(platformId, industryId, dayIndex, hour) {
  const base = getBaseScore(platformId, dayIndex, hour);
  const adj = getIndustryAdjustment(industryId, dayIndex, hour);
  return Math.max(0, Math.min(4, base + adj));
}

function getBaseScore(platformId, dayIndex, hour) {
  // dayIndex: 0=Mon, 6=Sun
  const isWeekday = dayIndex <= 4;
  const isWeekend = dayIndex >= 5;

  const scores = {
    instagram: {
      // Peak: Tue-Fri 9am-11am, 6pm-9pm; Avoid: 1am-5am
      score: (d, h) => {
        if (h >= 1 && h <= 5) return 0;
        if (isWeekend && h >= 1 && h <= 8) return 0;
        if ([1,2,3,4].includes(d) && h >= 9 && h <= 11) return 4;
        if (isWeekday && h >= 18 && h <= 20) return 4;
        if (isWeekday && h >= 11 && h <= 14) return 3;
        if (isWeekday && h === 8 || isWeekday && h === 21) return 3;
        if (isWeekend && h >= 10 && h <= 14) return 3;
        if (isWeekday && h >= 6 && h <= 8) return 2;
        return 1;
      }
    },
    tiktok: {
      score: (d, h) => {
        if (h >= 1 && h <= 5) return 0;
        if ([1,2,4].includes(d) && h >= 19 && h <= 21) return 4; // Tue, Wed, Fri evenings
        if (d === 3 && h >= 14 && h <= 16) return 4; // Thu afternoon
        if (isWeekend && h >= 11 && h <= 14) return 4;
        if (isWeekday && h >= 17 && h <= 21) return 3;
        if (isWeekday && h >= 9 && h <= 11) return 3;
        if (isWeekend && h >= 9 && h <= 16) return 3;
        return 1;
      }
    },
    linkedin: {
      score: (d, h) => {
        if (!isWeekday) return h >= 10 && h <= 14 ? 1 : 0;
        if (h >= 20 || h <= 5) return 0;
        if ([1,2,3].includes(d) && h >= 8 && h <= 10) return 4; // Tue-Thu morning
        if ([1,2,3].includes(d) && h >= 12 && h <= 13) return 4; // Tue-Thu lunch
        if (isWeekday && h >= 7 && h <= 9) return 3;
        if (isWeekday && h >= 17 && h <= 18) return 3;
        return 1;
      }
    },
    facebook: {
      score: (d, h) => {
        if (h >= 23 || h <= 5) return 0;
        if ([2,3,4].includes(d) && h >= 13 && h <= 16) return 4; // Wed-Fri afternoon
        if (isWeekday && h >= 9 && h <= 11) return 3;
        if (isWeekend && h >= 12 && h <= 15) return 3;
        if (isWeekday && h >= 11 && h <= 15) return 2;
        return 1;
      }
    },
    twitter: {
      score: (d, h) => {
        if (h >= 22 || h <= 5) return 0;
        if (isWeekday && h >= 8 && h <= 10) return 4;
        if ([1,2,3].includes(d) && h >= 12 && h <= 13) return 4;
        if (isWeekday && h >= 17 && h <= 19) return 3;
        if (isWeekend && h >= 9 && h <= 11) return 2;
        return 1;
      }
    },
    pinterest: {
      score: (d, h) => {
        if (h >= 23 || h <= 7) return 0;
        if (isWeekend && h >= 20 && h <= 22) return 4;
        if (isWeekend && h >= 14 && h <= 16) return 4;
        if (d === 5 && h >= 21 && h <= 22) return 4; // Fri night
        if (isWeekend && h >= 10 && h <= 14) return 3;
        if (isWeekday && h >= 14 && h <= 16) return 2;
        return 1;
      }
    },
    youtube: {
      score: (d, h) => {
        if (h >= 23 || h <= 7) return 0;
        if (isWeekend && h >= 9 && h <= 11) return 4;
        if ([2,3,4].includes(d) && h >= 14 && h <= 16) return 4;
        if (isWeekday && h >= 18 && h <= 21) return 3;
        if (isWeekend && h >= 15 && h <= 20) return 3;
        return 1;
      }
    },
  };

  const platform = scores[platformId];
  if (!platform) return 1;
  return platform.score(dayIndex, hour);
}

function getIndustryAdjustment(industryId, dayIndex, hour) {
  // Small adjustments (+1/-1) for specific industry patterns
  const isWeekday = dayIndex <= 4;
  const adjustments = {
    food: () => (hour >= 11 && hour <= 13) || (hour >= 17 && hour <= 19) ? 1 : 0,
    fitness: () => (hour >= 5 && hour <= 8) || (hour >= 17 && hour <= 20) ? 1 : 0,
    professional: () => !isWeekday ? -1 : (hour >= 8 && hour <= 10) ? 1 : 0,
    realestate: () => dayIndex === 5 || dayIndex === 6 ? 1 : 0, // Weekends
    beauty: () => (hour >= 19 && hour <= 22) ? 1 : 0,
    travel: () => dayIndex === 5 || dayIndex === 0 ? 1 : 0, // Fri + Mon
    general: () => 0,
    retail: () => 0,
    nonprofit: () => 0,
    tech: () => (isWeekday && hour >= 9 && hour <= 11) ? 1 : 0,
  };
  return (adjustments[industryId] || (() => 0))();
}

export function getTopSlots(platformId, industryId, count = 3) {
  const slots = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 6; h < 23; h++) {
      slots.push({ day: d, hour: h, score: getScore(platformId, industryId, d, h) });
    }
  }
  return slots
    .filter(s => s.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
