<?php

require_once __DIR__ . "/db.php";

class PostController
{
    public function index()
    {
        global $db;

        $posts = pg_query($db, "SELECT * FROM posts ORDER BY id DESC");

        echo "<h1>Alla inlägg</h1>";

        echo '<form method="POST" action="/create-post">
                <input type="hidden" name="user_id" value="6">

                <label>Titel:</label>
                <input type="text" name="title" required>

                <label>Inlägg:</label>
                <input type="text" name="content" required>

                <button type="submit">Posta</button>
              </form>';

        echo "<ul>";

        while ($post = pg_fetch_assoc($posts)) {
            echo '<li>';
            echo '<a href="/post?id=' . $post["id"] . '">';
            echo htmlspecialchars($post["title"]);
            echo "</a>";
            echo "</li>";
        }

        echo "</ul>";
    }

    public function show()
    {
        global $db;

        $id = $_GET["id"] ?? null;

        if (!$id) {
            echo "Inget id skickades med.";
            return;
        }

        $query = pg_query_params($db, "SELECT * FROM posts WHERE id = $1", [$id]);
        $post = pg_fetch_assoc($query);

        if (!$post) {
            echo "Inlägget hittades inte.";
            return;
        }

        echo "<h1>" . htmlspecialchars($post["title"]) . "</h1>";
        echo "<p>" . htmlspecialchars($post["content"]) . "</p>";
        echo "<p>" . htmlspecialchars($post["created_at"]) . "</p>";
        echo '<a href="/">Tillbaka</a>';
    }

    public function store()
    {
        global $db;

        $user_id = $_POST["user_id"] ?? null;
        $title = $_POST["title"] ?? null;
        $content = $_POST["content"] ?? null;

        if (!$user_id || !$title || !$content) {
            echo "Alla fält måste fyllas i.";
            return;
        }

        pg_query_params(
            $db,
            "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)",
            [$user_id, $title, $content]
        );

        header("Location: /");
        exit;
    }
}