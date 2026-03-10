BEGIN;

WITH new_user AS (
  INSERT INTO users (auth0_id, email, name, role)
  VALUES (
    'auth0|mock-user-123',
    'anna@example.com',
    'Anna',
    'user'
  )
  RETURNING id
),
new_posts AS (
  INSERT INTO posts (user_id, title, content)
  SELECT id, 'Första påhittade inlägget', 'Det här är mitt första inlägg.'
  FROM new_user
  UNION ALL
  SELECT id, 'Andra inlägget, bara på låtsas', 'Här kommer ett till inlägg som inte är på riktigt'
  FROM new_user
  RETURNING id, user_id
)

INSERT INTO comments (post_id, user_id, comment)
SELECT
  (SELECT id FROM new_posts LIMIT 1),  -- första posten
  (SELECT id FROM new_user),
  'Det var en gång..'
UNION ALL
SELECT
  (SELECT id FROM new_posts LIMIT 1),
  (SELECT id FROM new_user),
  'Nu ska jag berätta nåt för er';

COMMIT;