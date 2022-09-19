<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Игры</title>
    <link rel="stylesheet" href="Css.css">
</head>
<body>
<form id="form" class="search-engine">
    <div class="search-engine__upper">
        <h1 class="search-engine__label">Найди свою игру</h1><br>
        <input class="search-engine__upper__input" placeholder="Введите название...">
        <div class="search-engine__upper__message" id="search-engine__upper__message"></div>
    </div>
    <div class="search-engine__lower">
        <button type="submit" class="search-engine__lower-search__starter">Искать</button>
        <button class="search-engine__lower-search__add" disabled>Добавить</button>
    </div>
</form>
<div class="container-discovered"></div>
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="script.js"></script>
</body>
</html>