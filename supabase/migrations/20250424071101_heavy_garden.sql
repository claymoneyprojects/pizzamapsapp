/*
  # Create request logs table for rate limiting

  1. New Tables
    - `request_logs`
      - `id` (uuid, primary key)
      - `ip_address` (text, unique)
      - `request_count` (integer)
      - `last_request` (timestamp)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `request_logs` table
    - Add policy for service role to manage logs
*/

CREATE TABLE IF NOT EXISTS request_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  request_count integer DEFAULT 1,
  last_request timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS request_logs_ip_address_idx ON request_logs(ip_address);

ALTER TABLE request_logs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'request_logs' 
    AND policyname = 'Service role can manage request logs'
  ) THEN
    CREATE POLICY "Service role can manage request logs"
      ON request_logs
      FOR ALL
      TO service_role
      USING (true);
  END IF;
END $$;