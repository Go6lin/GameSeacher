$(document).ready(function () {
    $("#form").on("submit", function (e) {
        e.preventDefault();
        const inp = document.querySelector('.search-engine__upper__input').value;
        searchGame(inp);

        if (!searchGame(inp)) {
            $.post('result.php', JSON.serialize(), function(data, status){
                $("#search-engine__upper__message").html(data);
            });
        }
    });
});
function searchGame(title) {
    document.querySelector("#search-engine__upper__message").innerHTML = '';
    return fetch('https://api.rawg.io/api/games?search=' + title + '&key=e11420a5915546d5af11a090fe6b3b22', {method: 'GET'})
        .then(response => response.json())
        .then(response => {
            let totalResut = response.results;
            let i = 0;
            while (i < totalResut.length) {
                let plaeblePlatforms = totalResut[i].platforms;
                let platformsList = '';
                let y = 0;
                while (y < plaeblePlatforms.length) {
                    let pName = plaeblePlatforms[y].platform.name;
                    platformsList = platformsList + pName + '<br>';
                    y++;
                }
                let div = document.createElement('div');
                let radio = document.createElement('input');
                let radioClass = 'gameChackBox';
                let radioName = 'gameChackBox' + i;
                let divId = 'game' + i;
                div.className = 'game';
                div.id = divId;
                radio.className = radioClass;
                radio.name = radioName;
                radio.type = 'checkbox';
                radio.onchange = function (e) {
                    let checkBoxes = document.querySelectorAll('.gameChackBox')
                    let checkBoxChecked = false;
                    for (var i = 0; i < checkBoxes.length; i++) {
                        if (checkBoxes[i].checked === true) {
                            checkBoxChecked = true;
                        }
                    }
                    if (checkBoxChecked) {
                        document.querySelector('.search-engine__lower-search__add').removeAttribute('disabled');
                    } else {
                        document.querySelector('.search-engine__lower-search__add').disabled = 'disabled';
                    }
                }
                let addButton = document.querySelector('.search-engine__lower-search__add');
                addButton.onclick = function (e) {
                    let checkBoxes = document.querySelectorAll('.gameChackBox');
                    let markedGames = [];
                    for (var i = 0; i < checkBoxes.length; i++) {
                        if (checkBoxes[i].checked === true) {
                            let plaeblePlatformsRadio = totalResut[i].platforms;
                            let platformsListRadio = '';
                            let y = 0;
                            while (y < plaeblePlatformsRadio.length) {
                                let pName = plaeblePlatformsRadio[y].platform.name;
                                platformsListRadio = platformsListRadio + pName + ', ';
                                y++;
                            }
                            let markedGame = [
                                totalResut[i].name,
                                totalResut[i].released,
                                platformsListRadio,
                                totalResut[i].genres[0].name,
                                totalResut[i].metacritic
                            ]
                            e.preventDefault();
                            markedGames.push(markedGame);
                        }
                    }
                    $.post('adder.php', JSON.stringify(markedGames), function(data, status){
                        $("#search-engine__upper__message").html(data);}
                    );
                }
                let divTerminator = document.querySelector('#' + divId);
                if (divTerminator) {
                    divTerminator.remove();
                }
                let place = document.querySelector(".container-discovered");
                div.innerHTML =
                    totalResut[i].name + "<br>" +
                    totalResut[i].released + "<br>" + "<br>" +
                    platformsList + "<br>" +
                    "Genres:" + totalResut[i].genres[0].name + "     " + "Metacritic:" +
                    totalResut[i].metacritic
                place.append(div)
                div.prepend(radio)
                let back = divId;
                let backIMG = totalResut[i].background_image;
                let backIMGURL = "url(" + backIMG + ")";
                document.getElementById(back).style.background = backIMGURL;
                document.getElementById(back).style.backgroundSize = "cover";
                document.getElementById(back).style.backgroundRepeat = "no-repeat";
                i++
            }
        })
        .catch(
            err => {
                //сюда ошибки
                console.error(err);
                let errMessage = document.querySelector("#search-engine__upper__message");
                errMessage.innerHTML = "Точно правильно написал?";

            }
        );
}