<?php

// require '../db.php';


$user_id = $_POST['user_id'];
$title = $_POST['title'];
$content = $_POST['content'];



pg_query_params($db, "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)", [$user_id, $title, $content]);

echo "<h3>Inlägget har postats!</h3>";
