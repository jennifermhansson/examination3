-- 1) Add column (start nullable if posts already contain data)
ALTER TABLE posts
ADD COLUMN user_id INTEGER;

-- 2) Create the FK constraint
ALTER TABLE posts
ADD CONSTRAINT posts_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE; -- or RESTRICT / SET NULL depending on your rules

-- 3) (Optional but recommended) index for faster joins/filtering
CREATE INDEX idx_posts_user_id ON posts(user_id);