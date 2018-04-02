 <?php
 
 
 header('Content-Type = application/x-www-form-urlencoded');
$JS = json_decode(file_get_contents("php://input"), true);

$calc = $JS['total'];

function calculate_string( $mathString )    {
    $mathString = trim($mathString);     // trim white spaces
    $mathString = preg_replace ('[^0-9\+-\*\/\(\) ]', '', $mathString);    // remove any non-numbers chars; exception for math operators

    $compute = create_function("", "return (" . $mathString . ");" );
    return 0 + $compute();
}
 
$JS['total'] = calculate_string($calc); 

echo json_encode($JS);
exit;

?>