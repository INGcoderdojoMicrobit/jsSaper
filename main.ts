// ඞ


let m = 0
let l = 0
let iPlayerX = 1 //startowe współrzędne sapera
let iPlayerY = 3 //startowe współrzędne sapera
const iWymiary = 7 //wymiary planszy
const iIleMin = 9 //ile min losować na planszy
let bCanPlay = false;

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
    info.setScore(0)
    
    RedrawPlayer()
    GenerateMines()
    CallculateMines()
    DisplayPlayerMap()
    bCanPlay = true;


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
    for (let n = 0; n <= iWymiary - 1; n++) { // wiersze
        for (let o = 0; o <= iWymiary - 1; o++) { //kolumny
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
    for (let p = 0; p <= iWymiary - 1; p++) { //wiersze
        for (let q = 0; q <= iWymiary - 1; q++) {//kolumny
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
            case 'B':
                tiles.setTileAt(tiles.getTileLocation(q, p),assets.tile`s9`)
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
    if (bCanPlay)
    {
        myMiner.setFlag(SpriteFlag.Invisible, true)
        DisplayMap()
    }
})

controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function() {
    if (bCanPlay)
    {
        DisplayPlayerMap()
        myMiner.setFlag(SpriteFlag.Invisible, false)
    }
})


function RedrawPlayer()
{
    tiles.getTileLocation(iPlayerX, iPlayerY).place(myMiner)
    music.playTone(Note.C, BeatFraction.Double)
}

controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function() {
    if (bCanPlay)
    {
        if (iPlayerY>0) iPlayerY--;
        RedrawPlayer()
    }
})

controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function() {
    if (bCanPlay)
    {
        if (iPlayerY<iWymiary-1) iPlayerY++;
        RedrawPlayer()
    }
})

controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function() {
    if (bCanPlay)
    {
        if (iPlayerX>0) iPlayerX--;
        RedrawPlayer()
    }
})

controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function() {
    if (bCanPlay)
    {
        if (iPlayerX<iWymiary-1) iPlayerX++;
        RedrawPlayer()
    }
})

controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function() {
    if (bCanPlay)
    {
        animation.runImageAnimation(myMiner, assets.animation`sSaperFlag`,100)
        basic.pause(400)
        animation.stopAnimation(animation.AnimationTypes.All,myMiner)
        myMiner.setImage(assets.image`sSaper1`)

        //tutaj możemy dodać akcję stawiania/zdejmowania flagi
        if (gracz[iPlayerY][iPlayerX] == "-") gracz[iPlayerY][iPlayerX] = "F"
        else if (gracz[iPlayerY][iPlayerX] == "F") gracz[iPlayerY][iPlayerX] = "-"
        DisplayPlayerMap()
    }
})



function CheckField(y: number, x: number)
{
        //1. sprawdzic czy nie weszlismy na minę
        if (tab[y][x] == 9) 
        {
            bCanPlay = false;
            gracz[y][x] = "9"
            myMiner.setFlag(SpriteFlag.Invisible, true)
            music.bigCrash.play()
            ValidateMap()
            tiles.setTileAt(tiles.getTileLocation(x, y),assets.tile`sExploded`)
            basic.pause(5500)
            game.over(false)
                
        }
        //2. jeśli jest pode mną cyfra > 0, to ją wyświetlamy
        else if (tab[y][x] > 0) 
        {
            gracz[y][x] = tab[y][x].toString()
            info.changeScoreBy(1)
            DisplayPlayerMap()
        }
        //3. jesli jest 0 -> wydeptujemy 8 pól wokół aby odrkyć kolejne "puste" pola, uważać aby nie wyjść poza plansze
        else if (tab[y][x] == 0) 
        {
            gracz[y][x]="0"
            info.changeScoreBy(1)
            
            let iLeft, iRight, iTop, iBottom;
            iLeft = x - 1
            iRight = x + 1
            iTop = y - 1
            iBottom = y + 1
            
            
            // lewy górny
            if (iLeft >= 0 && iTop >= 0 && (gracz[iTop][iLeft] == "-" || gracz[iTop][iLeft] == "F")) {
                CheckField(iTop, iLeft)
            }
            // górny
            if (iTop >= 0 && (gracz[iTop][x] == "-" || gracz[iTop][x] == "F")) {
                CheckField(iTop, x)
            }
            // prawy górny
            if (iRight < iWymiary && iTop >= 0 && (gracz[iTop][iRight] == "-" || gracz[iTop][iRight] == "F")) {
                CheckField(iTop, iRight)
            }
            // prawy
            if (iRight < iWymiary && (gracz[y][iRight] == "-" || gracz[y][iRight] == "F")) {
                CheckField(y, iRight)
            }
            // prawy dolny
            if (iRight < iWymiary && iBottom < iWymiary && (gracz[iBottom][iRight] == "-" || gracz[iBottom][iRight] == "F"))  {
                CheckField(iBottom, iRight)
            }
            // dolny
            if (iBottom < iWymiary && (gracz[iBottom][x] == "-" || gracz[iBottom][x] == "F")) {
                CheckField(iBottom, x)
            }
            // lewy dolny
            if (iLeft >= 0 && iBottom < iWymiary && (gracz[iBottom][iLeft] == "-" || gracz[iBottom][iLeft] == "F")) {
                CheckField(iBottom, iLeft)
            }
            // lewy
            if (iLeft >= 0 && (gracz[y][iLeft] == "-" || gracz[y][iLeft] == "F")) {
                CheckField(y, iLeft)
            }
            


        }    
}


controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function() {
    if (bCanPlay)
    {
        // klikamy:
        //0. jak jest postawiona flaga to nie pozwalamy deptać
        if (gracz[iPlayerY][iPlayerX] == "F") 
        {
            scene.cameraShake(4,200);
        }
        else
        {
            animation.runImageAnimation(myMiner, assets.animation`sSaperDig`,100)
            basic.pause(400)
            animation.stopAnimation(animation.AnimationTypes.All,myMiner)
            myMiner.setImage(assets.image`sSaper1`)

            // tutaj wstawiamy akcję deptania pola
            CheckField(iPlayerY, iPlayerX);
            DisplayPlayerMap()
            CheckIfWin()
        }
    }
})


function CheckIfWin()
{
    let bNotYet = false;
    let iAddScore = 0;
    for (let y = 0; y <= iWymiary - 1; y++) {
        for (let x = 0; x <= iWymiary - 1; x++) {
            switch (tab[x][y]) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                if (gracz[x][y]!=tab[x][y].toString())
                {
                    bNotYet = true;
                }
                break;
            case 9:
                if (gracz[x][y]!="F" && gracz[x][y]!="-")
                {
                    bNotYet = true;
                }
                if (gracz[x][y]=="F")
                {
                    iAddScore+=10; //dodatkowe 10pkt score za postawioną flagę
                }
                break;
            default:
                console.log(`Wrong. ${tab[x][y]}`);
            }
        }
        
    }
    if (bNotYet == false)
    {
        bCanPlay = false;
        info.changeScoreBy(iAddScore);
        game.over(true);
    }
}

function ValidateMap()
{
    for (let y = 0; y <= iWymiary - 1; y++) {
        for (let x = 0; x <= iWymiary - 1; x++) {
            switch (tab[x][y]) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                if (gracz[x][y]!=tab[x][y].toString())
                {
                    if (gracz[x][y]=="F") gracz[x][y]="W"
                    else gracz[x][y]=tab[x][y].toString()
                }
                break;
            case 9:
                if (gracz[x][y]=="-") gracz[x][y]="B"
                break;
            default:
                console.log(`Wrong. ${tab[x][y]}`);
            }
        }   
    }
    DisplayPlayerMap()
}