<?php

$XML=simplexml_load_file("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");

$array = array();

foreach($XML->Cube->Cube->Cube as $entry) {
    
    $key = $entry['currency'];
    $value = $entry['rate'];
    
    // var_dump($key); tested it, it's a String
    // var_dump($value); tested it, it's a String

    //$array[(string)$key] = (string)$value; 

   $array[(string)$key]=array("rate" => (string)$value, "code" => (string)$key);
}
echo json_encode($array);