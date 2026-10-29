// Built by tools/build.py: this app's videos plus the ones it borrows.
const VIDEOS = [
 {
  "id": "equations",
  "title": "Solving Linear Equations",
  "subject": "eei",
  "label": "Equations",
  "desc": "Keep the balance: undo each step on both sides.",
  "practice": [
   "eei",
   "lineq",
   0
  ],
  "src": "videos/equations.mp4",
  "poster": "videos/equations.jpg",
  "secs": 55
 },
 {
  "id": "inequalities",
  "title": "Inequalities and the Flip",
  "subject": "eei",
  "label": "Inequalities",
  "desc": "Solve like an equation, graph on a number line, and know when the sign flips.",
  "practice": [
   "eei",
   "ineq",
   1
  ],
  "src": "videos/inequalities.mp4",
  "poster": "videos/inequalities.jpg",
  "secs": 58
 },
 {
  "id": "systems",
  "title": "Systems of Equations",
  "subject": "eei",
  "label": "Systems",
  "desc": "Where two lines meet, and solving by elimination.",
  "practice": [
   "eei",
   "systems",
   0
  ],
  "src": "videos/systems.mp4",
  "poster": "videos/systems.jpg",
  "secs": 52
 },
 {
  "id": "factoring",
  "title": "Multiplying and Factoring",
  "subject": "eei",
  "label": "Factoring",
  "desc": "The area model for multiplying binomials, and factoring it back.",
  "practice": [
   "eei",
   "factor",
   0
  ],
  "src": "videos/factoring.mp4",
  "poster": "videos/factoring.jpg",
  "secs": 63
 },
 {
  "id": "functions",
  "title": "What Is a Function?",
  "subject": "func",
  "label": "Functions",
  "desc": "Inputs, outputs, function notation, and the vertical line test.",
  "practice": [
   "func",
   "functions",
   0
  ],
  "src": "videos/functions.mp4",
  "poster": "videos/functions.jpg",
  "secs": 44
 },
 {
  "id": "slope",
  "title": "Slope and y = mx + b",
  "subject": "func",
  "label": "Lines",
  "desc": "Rise over run, the y-intercept, and graphing a line.",
  "practice": [
   "func",
   "linear",
   1
  ],
  "src": "videos/slope.mp4",
  "poster": "videos/slope.jpg",
  "secs": 46
 },
 {
  "id": "exponential",
  "title": "Linear vs. Exponential",
  "subject": "func",
  "label": "Exponential",
  "desc": "Adding the same amount versus multiplying by the same amount.",
  "practice": [
   "func",
   "expo",
   0
  ],
  "src": "videos/exponential.mp4",
  "poster": "videos/exponential.jpg",
  "secs": 53
 },
 {
  "id": "parabolas",
  "title": "Parabolas",
  "subject": "func",
  "label": "Quadratics",
  "desc": "The vertex, the zeros, and sliding a parabola around.",
  "practice": [
   "func",
   "quadfn",
   0
  ],
  "src": "videos/parabolas.mp4",
  "poster": "videos/parabolas.jpg",
  "secs": 54
 },
 {
  "id": "real-numbers",
  "title": "Rational, Irrational, and Properties",
  "subject": "real",
  "label": "Real numbers",
  "desc": "Which numbers are rational, where irrational numbers sit on the line, and the three properties.",
  "practice": [
   "real",
   "realnum",
   0
  ],
  "src": "videos/real-numbers.mp4",
  "poster": "videos/real-numbers.jpg",
  "secs": 92
 },
 {
  "id": "exponent-rules",
  "title": "Exponent Rules and Radicals",
  "subject": "real",
  "label": "Exponents",
  "desc": "Add, subtract, or multiply exponents; zero and negative exponents; simplifying square roots.",
  "practice": [
   "real",
   "exponents",
   0
  ],
  "src": "videos/exponent-rules.mp4",
  "poster": "videos/exponent-rules.jpg",
  "secs": 78
 },
 {
  "id": "units",
  "title": "Unit Rates and Converting Units",
  "subject": "real",
  "label": "Units",
  "desc": "Rates per one unit, converting with fractions equal to 1, and density.",
  "practice": [
   "real",
   "units",
   0
  ],
  "src": "videos/units.mp4",
  "poster": "videos/units.jpg",
  "secs": 72
 },
 {
  "id": "expressions",
  "title": "Expressions: Terms, Distributing, Combining",
  "subject": "eei",
  "label": "Expressions",
  "desc": "The parts of an expression, evaluating with negatives, distributing, combining like terms, and factoring out the GCF.",
  "practice": [
   "eei",
   "exprs",
   0
  ],
  "src": "videos/expressions.mp4",
  "poster": "videos/expressions.jpg",
  "secs": 96
 },
 {
  "id": "sequences",
  "title": "Arithmetic and Geometric Sequences",
  "subject": "func",
  "label": "Sequences",
  "desc": "Add the same amount or multiply by the same amount, and jump to any term with a formula.",
  "practice": [
   "func",
   "seq",
   0
  ],
  "src": "videos/sequences.mp4",
  "poster": "videos/sequences.jpg",
  "secs": 79
 },
 {
  "id": "statistics",
  "title": "Center, Spread, and Correlation",
  "subject": "func",
  "label": "Statistics",
  "desc": "Mean and median, IQR and outliers, scatter plots, lines of fit, and correlation versus causation.",
  "practice": [
   "stats",
   "data11",
   0
  ],
  "src": "videos/statistics.mp4",
  "poster": "videos/statistics.jpg",
  "secs": 74
 },
 {
  "id": "signed-numbers",
  "title": "Signed Numbers Review",
  "subject": "real",
  "label": "Signed numbers",
  "desc": "Adding and subtracting negatives on a number line, sign rules, and where the minus sign sits.",
  "practice": [
   "real",
   "signed",
   0
  ],
  "src": "videos/signed-numbers.mp4",
  "poster": "videos/signed-numbers.jpg",
  "secs": 84
 },
 {
  "id": "ratios-percents",
  "title": "Proportions and Percents",
  "subject": "real",
  "label": "Ratios & percents",
  "desc": "Scaling proportions, percent of a number, percent change, and several percent steps in a row.",
  "practice": [
   "real",
   "ratio",
   0
  ],
  "src": "videos/ratios-percents.mp4",
  "poster": "videos/ratios-percents.jpg",
  "secs": 86
 },
 {
  "id": "sci-notation",
  "title": "Roots and Scientific Notation",
  "subject": "real",
  "label": "Scientific notation",
  "desc": "Square and cube roots, writing numbers in scientific notation, and multiplying and comparing them.",
  "practice": [
   "real",
   "scinot",
   1
  ],
  "src": "videos/sci-notation.mp4",
  "poster": "videos/sci-notation.jpg",
  "secs": 78
 },
 {
  "id": "quad-forms",
  "title": "Square Roots and Completing the Square",
  "subject": "eei",
  "label": "Quadratic forms",
  "desc": "Solve by taking square roots, complete the square, and find the vertex of a thrown ball.",
  "practice": [
   "eei",
   "quadmore",
   0
  ],
  "src": "videos/quad-forms.mp4",
  "poster": "videos/quad-forms.jpg",
  "secs": 90
 },
 {
  "id": "constraints",
  "title": "Modeling with Constraints",
  "subject": "eei",
  "label": "Modeling",
  "desc": "At most and at least, two-equation stories, and points that satisfy every inequality.",
  "practice": [
   "eei",
   "modelx",
   0
  ],
  "src": "videos/constraints.mp4",
  "poster": "videos/constraints.jpg",
  "secs": 93
 },
 {
  "id": "rate-of-change",
  "title": "Rate of Change",
  "subject": "func",
  "label": "Rate of change",
  "desc": "Average rate of change from a table, rate and start in a linear model, and rate of change on a curve.",
  "practice": [
   "func",
   "rates",
   0
  ],
  "src": "videos/rate-of-change.mp4",
  "poster": "videos/rate-of-change.jpg",
  "secs": 83
 },
 {
  "id": "key-features",
  "title": "Key Features and Comparing Functions",
  "subject": "func",
  "label": "Key features",
  "desc": "Increasing and decreasing, comparing a formula with a table, and exponential versus linear growth.",
  "practice": [
   "func",
   "features",
   0
  ],
  "src": "videos/key-features.mp4",
  "poster": "videos/key-features.jpg",
  "secs": 77
 }
];
