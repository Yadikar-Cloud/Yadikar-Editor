<?php
// Assume the string is passed as a GET parameter named 'q'
require_once('./sortedwords.php');

$q = $_GET['keyword'];

// Initialize an empty array to store the matching results
$results = preg_match("/$q+[^ ]+/i", $wordlist, $matches);

// Encode the results array as a json string and print it
echo json_encode($matches,JSON_UNESCAPED_UNICODE);
?>