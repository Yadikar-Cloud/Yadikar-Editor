<?php
// Assume the string is passed as a GET parameter named 'q'
require_once('./unique.php');

$q = $_GET['keyword'];

// Initialize an empty array to store the matching results
$results = array();
$results = preg_grep("/^$q/i", $wordlist);

// Encode the results array as a json string and print it
echo json_encode($results,JSON_UNESCAPED_UNICODE);

?>
