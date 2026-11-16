// Raw makhana grades. Updated by the client on 2026-11-16 (second list, adds 7 sutta and replaces the
// earlier 4/5/6 ranges): .agent/client/2026-11-16-makhana-flavours-grades.md. The earlier
// "comparison at a glance" table covered only 4/5/6, so it was removed rather than extended by guesswork.

export interface MakhanaGrade {
  id: string;
  sutta: number;
  grade: string;
  /** Approximate diameter range in mm; `null` upper bound means "above". */
  sizeMm: [number, number | null];
  use: string;
}

export const makhanaGrades: MakhanaGrade[] = [
  { id: '4-sutta', sutta: 4, grade: 'Small kernels', sizeMm: [12, 15], use: 'Compact structure, suitable for regular food processing and value-oriented applications.' },
  { id: '5-sutta', sutta: 5, grade: 'Medium kernels', sizeMm: [15, 18], use: 'Balanced size and rounded appearance for everyday snacking and retail packaging.' },
  { id: '6-sutta', sutta: 6, grade: 'Large kernels', sizeMm: [18, 21], use: 'Fuller appearance, suitable for premium snacking and retail applications.' },
  { id: '7-sutta', sutta: 7, grade: 'Extra-large kernels', sizeMm: [21, null], use: 'Prominent size and fuller structure, preferred for premium-grade requirements.' },
];

export const makhanaGradeNote = 'Approximate diameters; actual grading specifications may vary by lot.';

export function gradeSizeLabel(grade: MakhanaGrade): string {
  const [min, max] = grade.sizeMm;
  return max === null ? `Above ${min} mm` : `${min}–${max} mm`;
}

/** Diameter used to draw the kernel to scale (open-ended 7 sutta drawn at 23 mm). */
export function gradeDrawMm(grade: MakhanaGrade): number {
  return grade.sizeMm[1] ?? grade.sizeMm[0] + 2;
}
