// Algebra 1 Quest: one subject per goal area (the same three areas as the MAP Growth Algebra 1 course test).
[
  { id: 'real', name: 'Real Numbers', icon: '🔢', color: 'c1', blurb: 'Number types · Exponents & radicals · Units' },
  { id: 'eei', name: 'Expressions, Equations, and Inequalities', icon: '⚖️', color: 'c2', blurb: 'Expressions · Equations · Inequalities · Systems · Polynomials · Factoring' },
  { id: 'func', name: 'Patterns, Functions, and Graphing', icon: '📈', color: 'c3', blurb: 'Functions · Lines · Exponentials · Parabolas · Sequences · Statistics' },
].forEach((g) => addSubject({ ...g, skills: A1_SKILLS.filter((k) => k.goal === g.id) }));
