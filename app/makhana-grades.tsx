import Link from 'next/link';
import { gradeDrawMm, gradeSizeLabel, makhanaGradeNote, makhanaGrades } from '@/content/makhana-grades';
import { StickerHeading } from './sticker-heading';
import { Icon } from './visuals';

const tones = ['grade-lime', 'grade-pink', 'grade-purple', 'grade-teal'] as const;

/** Raw makhana grades (4, 5, 6, 7 sutta) with each kernel drawn to scale. */
export function MakhanaGrades() {
  const largest = Math.max(...makhanaGrades.map(gradeDrawMm));
  return (
    <section className="grades-section shell" id="makhana-grades" aria-labelledby="grades-title">
      <header className="section-header">
        <StickerHeading id="grades-title" kicker="4 · 5 · 6 · 7 Sutta"
          rows={[[{ text: 'Raw', tone: 'yellow' }, { text: 'Makhana', tone: 'pink' }], [{ text: 'Grades', tone: 'lime' }]]} />
      </header>

      <ul className="grades-grid">
        {makhanaGrades.map((grade, index) => (
          <li key={grade.id} className={`grade-card ${tones[index % tones.length]}`}>
            <div className="grade-visual" aria-hidden="true">
              <span className="grade-seed" style={{ width: `${(gradeDrawMm(grade) / largest) * 100}%` }} />
            </div>
            <p className="grade-sutta"><span>{grade.sutta}</span> Sutta</p>
            <h3>{grade.grade}</h3>
            <p className="grade-size">{gradeSizeLabel(grade)}</p>
            <p className="grade-use">{grade.use}</p>
          </li>
        ))}
      </ul>
      <p className="grades-note">{makhanaGradeNote}</p>

      <div className="grades-actions">
        <Link className="button primary" href="/products/raw-makhana">Enquire about raw makhana <Icon name="arrow" /></Link>
      </div>
    </section>
  );
}
