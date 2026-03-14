-- =====================================================
-- Useful SQL Queries for Apsara & Associates
-- =====================================================
-- Common database queries for managing your CA firm website
-- =====================================================

-- =====================================================
-- USER MANAGEMENT
-- =====================================================

-- Make a user an admin
UPDATE profiles 
SET role = 'admin', full_name = 'Admin Name'
WHERE email = 'user@example.com';

-- Make a user a client
UPDATE profiles 
SET role = 'client'
WHERE email = 'user@example.com';

-- View all users
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.phone,
  p.role,
  p.created_at
FROM profiles p
ORDER BY p.created_at DESC;

-- View only admins
SELECT * FROM profiles 
WHERE role = 'admin'
ORDER BY created_at DESC;

-- View only clients
SELECT * FROM profiles 
WHERE role = 'client'
ORDER BY created_at DESC;

-- Count users by role
SELECT 
  role,
  COUNT(*) as user_count
FROM profiles
GROUP BY role;

-- Delete a user (this will cascade and delete all their data)
-- WARNING: This is permanent!
DELETE FROM auth.users 
WHERE email = 'user@example.com';

-- =====================================================
-- CLIENT REGISTRATION LINKS
-- =====================================================

-- View all active registration links
SELECT 
  id,
  client_name,
  registration_token,
  is_used,
  expires_at,
  created_at
FROM client_registration_links
WHERE is_used = FALSE 
  AND expires_at > NOW()
ORDER BY created_at DESC;

-- View all used registration links
SELECT 
  crl.id,
  crl.client_name,
  crl.registration_token,
  crl.used_at,
  p.email as used_by_email,
  p.full_name as used_by_name
FROM client_registration_links crl
LEFT JOIN profiles p ON crl.used_by = p.id
WHERE crl.is_used = TRUE
ORDER BY crl.used_at DESC;

-- View expired registration links
SELECT 
  id,
  client_name,
  registration_token,
  expires_at,
  created_at
FROM client_registration_links
WHERE is_used = FALSE 
  AND expires_at < NOW()
ORDER BY created_at DESC;

-- Delete expired and unused registration links
DELETE FROM client_registration_links
WHERE is_used = FALSE 
  AND expires_at < NOW();

-- =====================================================
-- DOCUMENTS
-- =====================================================

-- View all documents
SELECT 
  d.id,
  d.file_name,
  d.file_size,
  d.file_type,
  d.created_at,
  p.email as client_email,
  p.full_name as client_name
FROM documents d
JOIN profiles p ON d.client_id = p.id
ORDER BY d.created_at DESC;

-- View documents for specific client
SELECT 
  id,
  file_name,
  file_size,
  file_type,
  created_at
FROM documents
WHERE client_id = (
  SELECT id FROM profiles WHERE email = 'client@example.com'
)
ORDER BY created_at DESC;

-- Count documents by client
SELECT 
  p.email,
  p.full_name,
  COUNT(d.id) as document_count,
  SUM(d.file_size) as total_size_bytes
FROM profiles p
LEFT JOIN documents d ON p.id = d.client_id
WHERE p.role = 'client'
GROUP BY p.id, p.email, p.full_name
ORDER BY document_count DESC;

-- Find large documents (over 10MB)
SELECT 
  d.file_name,
  d.file_size / 1048576 as size_mb,
  p.email as client_email,
  d.created_at
FROM documents d
JOIN profiles p ON d.client_id = p.id
WHERE d.file_size > 10485760
ORDER BY d.file_size DESC;

-- Delete documents older than 1 year
-- WARNING: This is permanent!
DELETE FROM documents
WHERE created_at < NOW() - INTERVAL '1 year';

-- =====================================================
-- CONTACT SUBMISSIONS
-- =====================================================

-- View all new contact submissions
SELECT 
  id,
  name,
  email,
  phone,
  service,
  message,
  created_at
FROM contact_submissions
WHERE status = 'new'
ORDER BY created_at DESC;

-- View all contact submissions
SELECT 
  id,
  name,
  email,
  phone,
  service,
  status,
  created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 50;

-- Mark submission as read
UPDATE contact_submissions
SET status = 'read'
WHERE id = 'submission-id-here';

-- Mark submission as replied
UPDATE contact_submissions
SET status = 'replied'
WHERE id = 'submission-id-here';

-- Archive old submissions
UPDATE contact_submissions
SET status = 'archived'
WHERE created_at < NOW() - INTERVAL '6 months'
  AND status != 'new';

-- Count submissions by status
SELECT 
  status,
  COUNT(*) as count
FROM contact_submissions
GROUP BY status;

-- Delete archived submissions older than 1 year
-- WARNING: This is permanent!
DELETE FROM contact_submissions
WHERE status = 'archived'
  AND created_at < NOW() - INTERVAL '1 year';

-- =====================================================
-- SITE SETTINGS
-- =====================================================

-- View all site settings
SELECT 
  setting_key,
  setting_value,
  setting_type,
  updated_at
FROM site_settings
ORDER BY setting_key;

-- Update a site setting
UPDATE site_settings
SET setting_value = 'new-value-here'
WHERE setting_key = 'hero_image';

-- View when settings were last updated
SELECT 
  ss.setting_key,
  ss.updated_at,
  p.email as updated_by_email
FROM site_settings ss
LEFT JOIN profiles p ON ss.updated_by = p.id
ORDER BY ss.updated_at DESC;

-- =====================================================
-- OTP VERIFICATIONS
-- =====================================================

-- View recent OTP verifications
SELECT 
  email,
  phone,
  purpose,
  verified,
  expires_at,
  created_at
FROM otp_verifications
WHERE created_at > NOW() - INTERVAL '1 day'
ORDER BY created_at DESC;

-- Clean up expired OTPs
DELETE FROM otp_verifications
WHERE expires_at < NOW();

-- Clean up verified OTPs older than 1 day
DELETE FROM otp_verifications
WHERE verified = TRUE
  AND created_at < NOW() - INTERVAL '1 day';

-- Count OTPs by purpose
SELECT 
  purpose,
  COUNT(*) as count,
  SUM(CASE WHEN verified THEN 1 ELSE 0 END) as verified_count
FROM otp_verifications
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY purpose;

-- =====================================================
-- ANALYTICS & REPORTING
-- =====================================================

-- User registration over time (last 30 days)
SELECT 
  DATE(created_at) as registration_date,
  COUNT(*) as new_users
FROM profiles
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY registration_date DESC;

-- Document uploads over time (last 30 days)
SELECT 
  DATE(created_at) as upload_date,
  COUNT(*) as document_count,
  SUM(file_size) / 1048576 as total_size_mb
FROM documents
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY upload_date DESC;

-- Contact form submissions over time (last 30 days)
SELECT 
  DATE(created_at) as submission_date,
  COUNT(*) as submission_count
FROM contact_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY submission_date DESC;

-- Most requested services from contact form
SELECT 
  service,
  COUNT(*) as request_count
FROM contact_submissions
WHERE service IS NOT NULL
GROUP BY service
ORDER BY request_count DESC;

-- Active clients (have uploaded at least one document)
SELECT 
  p.email,
  p.full_name,
  COUNT(d.id) as document_count,
  MAX(d.created_at) as last_upload
FROM profiles p
JOIN documents d ON p.id = d.client_id
WHERE p.role = 'client'
GROUP BY p.id, p.email, p.full_name
HAVING COUNT(d.id) > 0
ORDER BY last_upload DESC;

-- Inactive clients (registered but never uploaded)
SELECT 
  p.email,
  p.full_name,
  p.created_at as registered_date
FROM profiles p
LEFT JOIN documents d ON p.id = d.client_id
WHERE p.role = 'client'
  AND d.id IS NULL
ORDER BY p.created_at DESC;

-- =====================================================
-- DATABASE MAINTENANCE
-- =====================================================

-- View database size
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- View table row counts
SELECT 
  schemaname,
  tablename,
  n_live_tup as row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

-- Vacuum analyze (optimize database performance)
-- Run this occasionally to maintain performance
VACUUM ANALYZE;

-- =====================================================
-- BACKUP QUERIES
-- =====================================================

-- Export all client emails (for backup/communication)
SELECT email, full_name, phone
FROM profiles
WHERE role = 'client'
ORDER BY full_name;

-- Export all contact submissions (for backup)
SELECT 
  name,
  email,
  phone,
  service,
  message,
  status,
  created_at
FROM contact_submissions
ORDER BY created_at DESC;

-- =====================================================
-- SECURITY CHECKS
-- =====================================================

-- Check for users without profiles
SELECT 
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- Check for duplicate emails
SELECT 
  email,
  COUNT(*) as count
FROM profiles
GROUP BY email
HAVING COUNT(*) > 1;

-- View users who haven't logged in recently
SELECT 
  p.email,
  p.full_name,
  au.last_sign_in_at
FROM profiles p
JOIN auth.users au ON p.id = au.id
WHERE au.last_sign_in_at < NOW() - INTERVAL '90 days'
  OR au.last_sign_in_at IS NULL
ORDER BY au.last_sign_in_at ASC NULLS FIRST;
