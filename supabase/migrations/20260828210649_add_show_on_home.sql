-- =========================================================
-- IRKOP: kontrol aplikasi yang tampil di Home
-- =========================================================

ALTER TABLE public.apps
ADD COLUMN IF NOT EXISTS show_on_home boolean NOT NULL DEFAULT true;

-- Aplikasi yang sudah ada tetap tampil di Home.
UPDATE public.apps
SET show_on_home = true
WHERE show_on_home IS NULL;

COMMENT ON COLUMN public.apps.show_on_home IS
'Tampilkan aplikasi pada Home/landing page';

CREATE INDEX IF NOT EXISTS idx_apps_home_visibility
ON public.apps (is_active, show_on_home);

-- Pastikan view statistik tidak terganggu.
-- Tidak mengubah is_active.
