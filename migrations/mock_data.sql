BEGIN;

WITH new_user AS (
  INSERT INTO users (auth0_id, email, name, role)
  VALUES (
    'auth0|mock-user-123',
    'mockuser@example.com',
    'Mock User',
    'user'
  )
  RETURNING id
),
new_posts AS (
  INSERT INTO posts (user_id, title, content)
  SELECT id, 'First Mock Post', 'This is the first mock post.'
  FROM new_user
  UNION ALL
  SELECT id, 'Second Mock Post', 'This is the second mock post.'
  FROM new_user
  RETURNING id, user_id
)

INSERT INTO comments (post_id, user_id, comment)
SELECT
  (SELECT id FROM new_posts LIMIT 1),  -- första posten
  (SELECT id FROM new_user),
  'This is a comment on the first post.'
UNION ALL
SELECT
  (SELECT id FROM new_posts LIMIT 1),
  (SELECT id FROM new_user),
  'Another comment on the first post.';

COMMIT;