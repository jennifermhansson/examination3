<?php

$db = pg_connect("host=localhost port=5433 dbname=examdb user=jen password=jenjen");

if (!$db) {
    die("Connection failed");
}