CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form TEXT NOT NULL,
  created_at TEXT NOT NULL,
  data TEXT NOT NULL,
  ip TEXT,
  emailed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS submissions_form_created ON submissions (form, created_at);
