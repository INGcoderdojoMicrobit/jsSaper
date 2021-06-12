// ඞ


let m = 0
let l = 0
let iPlayerX = 3 //startowe współrzędne sapera
let iPlayerY = 3 //startowe współrzędne sapera
const iWymiary = 7 //wymiary planszy
const iIleMin = 9 //ile min losować na planszy

// deklarujemy tablice dwuwymiarowe
let tab = [[1, 2, 3], [1, 2, 3], [1, 2, 3]] //tablica pole minowe
let gracz = [["1", "2", "3"], ["1", "2", "3"], ["1", "2", "3"]] //tablica co widzi gracz

//wypełniamy pustymi tablicami
for (let i = 0; i <= iWymiary - 1; i++) {
    tab[i] = [] 
    gracz[i] = [] 
}

// wypełniamy dwywymiarową tablicę zerami (puste) a drugą "pustymi -"
for (let j = 0; j <= iWymiary - 1; j++) {
    for (let k = 0; k <= iWymiary - 1; k++) {
        tab[j][k] = 0
        gracz[j][k] = "-"
    }
}
    // ustawiamy mapę
    tiles.setTilemap(tilemap`7x7`)

    //tworzymy sapera
    let myMiner = sprites.create(assets.image`sSaper1`)
    myMiner.setStayInScreen(true) //niech nie wyłazi poza ekran

    RedrawPlayer()
    GenerateMines()
    CallculateMines()
    DisplayPlayerMap()


function GenerateMines()
{
    let iPozostaleMiny = iIleMin
    // generujemy miny i wkladamy je do tablicy
    while (iPozostaleMiny > 0) {
        l = Math.floor(Math.random() * iWymiary)
        m = Math.floor(Math.random() * iWymiary)
        if (tab[l][m] == 9) {
            // juz jest mina w tym miejscu
            continue;
        }
        tab[l][m] = 9 // 9 - oznacza minę
        iPozostaleMiny += -1
    }  
}


function CallculateMines()
{
    // wyliczamy ile jest min w okolicy naszego pola
    for (let n = 0; n <= iWymiary - 1; n++) {
        // wiersze
        for (let o = 0; o <= iWymiary - 1; o++) {
            let iLeft, iRight, iTop, iBottom;
            iLeft = o - 1
            iRight = o + 1
            iTop = n - 1
            iBottom = n + 1
            let iCount = 0
            if (tab[n][o] == 9) { //jak jest bomba to nie liczymy
                continue;
            }
            // lewy górny
            if (iLeft >= 0 && iTop >= 0 && tab[iTop][iLeft] == 9) {
                iCount += 1
            }
            // górny
            if (iTop >= 0 && tab[iTop][o] == 9) {
                iCount += 1
            }
            // prawy górny
            if (iRight < iWymiary && iTop >= 0 && tab[iTop][iRight] == 9) {
                iCount += 1
            }
            // prawy
            if (iRight < iWymiary && tab[n][iRight] == 9) {
                iCount += 1
            }
            // prawy dolny
            if (iRight < iWymiary && iBottom < iWymiary && tab[iBottom][iRight] == 9) {
                iCount += 1
            }
            // dolny
            if (iBottom < iWymiary && tab[iBottom][o] == 9) {
                iCount += 1
            }
            // lewy dolny
            if (iLeft >= 0 && iBottom < iWymiary && tab[iBottom][iLeft] == 9) {
                iCount += 1
            }
            // lewy
            if (iLeft >= 0 && tab[n][iLeft] == 9) {
                iCount += 1
            }
            // w zmiennej iCount jest ilość min wokół nas
            // w zmiennej iCount jest ilość min wokół nas
            tab[n][o] = iCount
        }
    }
}

function DisplayMap()
{
    let sWiersz = ""
    let sWierszG = ""
    for (let p = 0; p <= iWymiary - 1; p++) {
        for (let q = 0; q <= iWymiary - 1; q++) {
            // wyświetlamy zawartość
            sWiersz = "" + sWiersz + tab[p][q] + " "
            sWierszG = "" + sWierszG + gracz[p][q] + " "
            switch (tab[p][q]) {
            case 0:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s0`)
                break;
            case 1:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s1`)
                break;
            case 2:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s2`)
                break;
            case 3:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s3`)
                break;
            case 4:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s4`)
                break;
            case 5:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s5`)
                break;
            case 6:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s6`)
                break;
            case 7:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s7`)
                break;
            case 8:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s8`)
                break;
            case 9:
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s9`)
                break;
            default:
                console.log(`Wrong. ${tab[p][q]}`);
            }
        }
        console.log(`${sWiersz}     ${sWierszG}`)
        sWiersz = ""
        sWierszG = ""
    }
}


function DisplayPlayerMap()
{
    let sWiersz = ""
    let sWierszG = ""
    for (let p = 0; p <= iWymiary - 1; p++) {
        for (let q = 0; q <= iWymiary - 1; q++) {
            // wyświetlamy zawartość
            sWiersz = "" + sWiersz + tab[p][q] + " "
            sWierszG = "" + sWierszG + gracz[p][q] + " "
            switch (gracz[p][q]) {
            case '0':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s0`)
                break;
            case '1':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s1`)
                break;
            case '2':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s2`)
                break;
            case '3':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s3`)
                break;
            case '4':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s4`)
                break;
            case '5':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s5`)
                break;
            case '6':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s6`)
                break;
            case '7':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s7`)
                break;
            case '8':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s8`)
                break;
            case '9':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`sExploded`)
                break;
            case '-':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`sHidden`)
                break;
            case 'F':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`sFlag`)
                break;
            case 'W':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`sWrongFlag`)
                break;
            default:
                console.log(`Wrong. ${gracz[p][q]}`);
            }
        }
        console.log(`${sWiersz}     ${sWierszG}`)
        sWiersz = ""
        sWierszG = ""
    }
}

controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function() {
    DisplayMap()
})

controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function() {
    DisplayPlayerMap()
})


function RedrawPlayer()
{
    tiles.getTileLocation(iPlayerX, iPlayerY).place(myMiner)
    music.playTone(Note.C, BeatFraction.Double)
}

controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function() {
    if (iPlayerY>0) iPlayerY--;
    RedrawPlayer()
})

controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function() {
    if (iPlayerY<iWymiary-1) iPlayerY++;
    RedrawPlayer()
})

controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function() {
    if (iPlayerX>0) iPlayerX--;
    RedrawPlayer()
})

controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function() {
    if (iPlayerX<iWymiary-1) iPlayerX++;
    RedrawPlayer()
})


controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function() {
    animation.runImageAnimation(myMiner, assets.animation`sSaperDig`,100)
    basic.pause(400)
    animation.stopAnimation(animation.AnimationTypes.All,myMiner)
    myMiner.setImage(assets.image`sSaper1`)

    // tutaj wstawiamy akcję deptania pola
   
    /**
    * klikamy:
    * 1. sprawdzic czy nie weszlismy na minę
    * 2. jeśli jest pode mną cyfra > 0, to ją wyświetlamy
    * 3. jesli jest 0 -> wydeptujemy 8 pól wokół aby odrkyć kolejne "puste" pola, uważać aby nie wyjść poza plansze
    */

})

controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function() {
    animation.runImageAnimation(myMiner, assets.animation`sSaperFlag`,100)
    basic.pause(400)
    animation.stopAnimation(animation.AnimationTypes.All,myMiner)
    myMiner.setImage(assets.image`sSaper1`)

    //tutaj możemy dodać akcję stawiania flagi

})
