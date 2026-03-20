<?php
// require "../db.php";

$id = $_GET['id'] ?? null;

if (!$id) {
    die("Inget id skickades med.");
}

$query = pg_query_params($db, "SELECT * FROM posts WHERE id = $1", [$id]);
$post = pg_fetch_assoc($query);

if (!$post) {
    die("Inlägget hittades inte.");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($post['title']) ?></title>
</head>
<body>
    <p><?= htmlspecialchars($post['created_at']) ?></p>
    <h1><?= htmlspecialchars($post['title']) ?></h1>
    <p><?= htmlspecialchars($post['content']) ?></p>
</body>
</html>