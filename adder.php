<?php
$connCheck = new PDO('mysql:host=localhost;dbname=gamedb;charset=utf8', "root", "root");
$sqlCheck = "SELECT * FROM collection";
$collection = $connCheck->query($sqlCheck);
$collect = $collection->fetchAll(PDO::FETCH_ASSOC);
$rawGames = file_get_contents('php://input');
$games = json_decode($rawGames, true);
$i = 0;
$getArrLength = count($games);
while($i < $getArrLength) {
    $direction = true;
    $candidateGame = $games[$i];
    foreach ($collect as $item) {
        if ($item["name"] === htmlentities($candidateGame[0], ENT_QUOTES)) {
            $direction =false ;
            echo $item["name"] . ' ' . 'Эта игра уже есть в вашей библиотеке!' . '<br>';
            break;
        }
    }
    if($direction) {
        $name = htmlentities($candidateGame[0], ENT_QUOTES);
        $year = htmlentities($candidateGame[1], ENT_QUOTES);
        $platform = htmlentities($candidateGame[2], ENT_QUOTES);
        $genre = htmlentities($candidateGame[3], ENT_QUOTES);
        $score = htmlentities($candidateGame[4], ENT_QUOTES);
        if (is_null($score) === false){
            $score = 0;
        }
        try {
            $conn = new PDO('mysql:host=localhost;dbname=gamedb;charset=utf8', "root", "root");
            $sql = "INSERT INTO collection (name, year, platform, genre, score) VALUES ('$name','$year','$platform','$genre','$score')";
            $affectedRowsNumber = $conn->exec($sql);
            echo $candidateGame[0] . ' ' . 'Игра добавлена в библиотеку!' . '<br>';
            //$err = $conn -> errorInfo();
            //var_dump($err);
            if ($conn->connect_error) {
                die("Ошибка: " . $conn->connect_error);
            }
        } catch (PDOException $e) {
            echo "Что то пошло не по плану:" . $e->getMessage();
        }
}
$i++;
}