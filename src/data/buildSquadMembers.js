/** Squad builder dataset — role/seniority tags drive sidebar filters. */
export const ROLE_FILTERS = [
  { id: 'engineering', label: 'Full-stack Engineering' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'devops', label: 'DevOps & Cloud' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'product', label: 'Product & Design' },
]

export const SENIORITY_FILTERS = [
  { id: 'mid', label: 'Mid-Level' },
  { id: 'senior', label: 'Senior' },
  { id: 'staff', label: 'Staff' },
  { id: 'principal', label: 'Principal' },
]

export const SQUAD_MEMBERS = [
  {
    id: 'm1',
    name: 'Elena Rostova',
    title: 'Staff ML Engineer',
    avatar: '/figma/engineer-2.png',
    monthlyRate: 22800,
    roles: ['ai', 'engineering'],
    seniority: 'staff',
    skills: { velocity: 0.92, security: 0.78, ai: 0.98, scale: 0.88 },
  },
  {
    id: 'm2',
    name: 'Marcus Webb',
    title: 'Principal Platform Engineer',
    avatar: '/figma/engineer-3.png',
    monthlyRate: 26500,
    roles: ['engineering', 'devops'],
    seniority: 'principal',
    skills: { velocity: 0.88, security: 0.95, ai: 0.72, scale: 0.96 },
  },
  {
    id: 'm3',
    name: 'Ari Voss',
    title: 'Senior AI Engineer',
    avatar: '/figma/engineer-1.png',
    monthlyRate: 19800,
    roles: ['ai', 'engineering'],
    seniority: 'senior',
    skills: { velocity: 0.9, security: 0.82, ai: 0.94, scale: 0.8 },
  },
  {
    id: 'm4',
    name: 'Noah Kim',
    title: 'Senior Mobile Engineer',
    avatar: '/figma/engineer-1.png',
    monthlyRate: 18600,
    roles: ['mobile', 'engineering'],
    seniority: 'senior',
    skills: { velocity: 0.93, security: 0.8, ai: 0.65, scale: 0.84 },
  },
  {
    id: 'm5',
    name: 'Mira Chen',
    title: 'Lead Product Designer',
    avatar: '/figma/engineer-2.png',
    monthlyRate: 15200,
    roles: ['product'],
    seniority: 'senior',
    skills: { velocity: 0.86, security: 0.7, ai: 0.75, scale: 0.72 },
  },
  {
    id: 'm6',
    name: 'James Okonkwo',
    title: 'Mid Full-stack Engineer',
    avatar: '/figma/engineer-3.png',
    monthlyRate: 12400,
    roles: ['engineering'],
    seniority: 'mid',
    skills: { velocity: 0.84, security: 0.74, ai: 0.68, scale: 0.76 },
  },
]

export const FORECAST_LABELS = [
  { key: 'velocity', label: 'Delivery velocity' },
  { key: 'security', label: 'Security posture' },
  { key: 'ai', label: 'AI integration depth' },
  { key: 'scale', label: 'Scale readiness' },
]
