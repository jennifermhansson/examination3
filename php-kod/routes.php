<?php

require_once "./controllers.php";

$method = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

$postController = new PostController();

if ($method === "GET" && $uri === "/") {
    $postController->index();
    exit;
}

if ($method === "GET" && $uri === "/post") {
    $postController->show();
    exit;
}

if ($method === "POST" && $uri === "/create-post") {
    $postController->store();
    exit;
}

http_response_code(404);
echo "Sidan hittades inte.";