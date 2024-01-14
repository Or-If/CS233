/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.

    There are 6 global variables that are used to keep track of the "state"
    of the application.
    -  imagePath - the folder where the cards are stored
    -  images - an array of 20 card file names
    -  firstPick - the 0 based index of the first card picked by the user
    -  secondPick - the 0 based index of the 2nd card picked by the user
    -  matches - the number of matches the user has removed from the board so far
    -  tries - the number of pairs of cards the user has selected so far

    The function handleClick is associated with the click event handler for each card.

    There are lots of  "helper" functions.  Comments in the code describe each of these functions.
    I've written more functions that I might have done to make each function as simple as possible.
*/

// start with these global variables
// the folder where your card images are stored
var imagePath = 'Cards/';
// an array that stores the images for each card
var images = Array(19).fill(null);
// the index of the first card picked by the user
var firstPick = -1;
// the index of the second card picked by the user
var secondPick = -1;
// statistics about this "round"
var matches = 0;
var tries = 0;

// --------------------------------- PART 1 --------------------------------------- //
// when the page loads, call the function init

Object.onload = init()

// this function initializes the page
function init()
{
    console.log("hello world");
    // fill the array of images by calling fillImages
    fillImages();
    // shuffle them by calling shuffle images
    shuffleImages();
    // show the number of matches on the page by calling showMatches
    showMatches();
    // enable all of the card elements on the page by calling enableRemainingCards
    enableAllRemainingCards();
    // show the backs of all of the cards by calling showAllBacks
    showAllBacks();

    //I think this one should be here as well
   //         enableAllCards();
}

// shows the number of matches and tries in the status element on the page
function showMatches() {
    // update the element on the page to display the variable matches and tries
}

// fills the array images with 10 pairs of card filenames
// card filenames follow this pattern:  cardvs.jpg where
// v is the first char of the value of the card and 
// s is the first char of the suit of the card
// example:  cardjh.jpg is the jack of hearts
function fillImages() {
    var values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    var suits = ['h', 's'];
    // create a variable called index and set it to 0
    let index = 0;
    
    // create a for loop that iterates through each value in the values array
    for (let i=0; i<values.length; i++) {
        // create a for loop that iterates through each suit in the suits array
        for (let j=0; j<suits.length; j++) {
            // set the element in the images array at index to a string that contains card + value + suit + .jpg
            images[index] = "card" + values[i] + suits[j] + ".jpg";
            // increment the index
            index++;
            // end for loop for the suits
        }
        // end for loop for the values
    }
}

// shuffles the elements in the images array
function shuffleImages() {
    // create a for loop that iterates through the images array
    for (let i=0; i<images.length; i++) {
        // set rndIndex to a random number between 0 and 19
        let rndIndex = Math.floor(Math.random() * 20);
        // set a variable called temp to the current image from the array
        let temp = images[i];
        // set current image from the array to the element in images at the rndIndex
        images[i] = images[rndIndex];
        // set the element at the rndIndex to temp
        images[rndIndex] = temp;
    }
    // end for loop
}

// assigns the handleclick function to the onclick event for all cards
// on the page.  All cards have the name attribute set to card.
// It also sets the cursor (part of the style) to 'pointer'
function enableAllCards() {
    console.log("hello world, from enableAllCards")
    // create a variable called cards and set it equal to the elements on the page with a name of card
    let cards = document.getElementsByName("card");
    // create a for loop that iterates through cards
    for (let i=0; i<cards.length; i++) {
        // set the onclick property for the current element in cards to handleClick
        cards[i].addEventListener("click", handleClick);
        // set the style.cursor to 'pointer' too
        cards[i].addEventListener("mouseover", function() {
            cards[i].style.cursor = "pointer";
        });
    }
        
    // end for loop
}

// enables (see enable all) only the cards whose backgroundImage
// style property is not 'none'
function enableAllRemainingCards() {
    // create a variable called cards and set it equal to the elements on the page with a name of card
    let cards = document.getElementsByName("card");
    // create a for loop that iterates through cards
    for (let i=0; i<cards.length; i++) {
        // if the style.backgroundImage of the current element in cards is not 'none'
        if (cards[i].style.backgroundImage != "none") {
            // set the onclick property for the current element in cards to handleClick
            cards[i].addEventListener("click", handleClick);
            // set the style.cursor to 'pointer' too
            cards[i].addEventListener("mouseover", function() {
                cards[i].style.cursor = "pointer";
            });
            // end if
        }
        // end for loop
    }    
    
}

// shows the back of one card based on it's index
// each card has an id attribute set to it's index in the html page
// the backgroundImage (style) is set to the url of the image
// for a card back to "show the back"
function showBack(index) {
    // create a variable card and set it equal to the ui element with an id of index
    let card = document.getElementById(index);
    // set the style.backgroundImage of card to the filename for the back of a card
    card.style.backgroundImage = "url('Cards/black_back.jpg')"
}
    

// shows the back for all cards
// calls showBack in the body of a for loop
function showAllBacks() {
    // create a loop that iterates through indices 0 to 19
    for (let i=0; i<20; i++) {
        // call the function showBack for the current index
        showBack(i);
    // end for loop
    }
}
// END PART 1 - TEST THIS FAR //

// --------------------------------- PART 2 --------------------------------------- //
// this is the function that fires when the user clicks on a card
function handleClick() {
    // declare the variable index and assign it to the current card's id attribute
    console.log(this.id)
    let index = this.id;
    // declare cardImage and assign it to the image for this card
    let cardImage = images[index];
    //console.log(cardImage);
    // set the backgroundImage to the url of the cardImage
    document.getElementById(index).style.backgroundImage = "url('" + imagePath + images[index] + "')"
    // disable the card 
    disableCard(index);
    //                  document.getElementById(index).setAttribute("disabled", "");
    //                  I am having troubles actually getting this to disable


    // if this is the first card picked
    
    if (firstPick===-1) {
        // assign firstPick to index
        firstPick = index;
        console.log("first pick =" + index)
        // else
    } else {
        // assign secondPick to index
        secondPick = index;
        // disable all of the cards
        // disableAllCards();
        // set a timer for 2 seconds.  Call checkCards when it fires.
        setTimeout(checkCards, 2000)
        // end if
    }
}

// disable one card based on it's index
function disableCard(index) {
    //   I am slightly confused as why this is here, this doesnt actually disable the card and you can still click on it.
    var card = document.getElementById(index);
    card.onclick = () => {}; 
    card.style.cursor = 'none';
}

// disable all of the cards
function disableAllCards() {
    //   Same confusion with disableCard
    for (let i=0; i<20; i++) {
        let card = document.getElementById(i);
        card.onclick = () => {}; 
        card.style.cursor = 'none';
    }
}
// END PART 2 - TEST TO HERE //

// --------------------------------- PART 3 --------------------------------------- //
// checks the 2 cards that have been picked for matches 
function checkCards() {

    // increment the number of tries
    tries++;
    let firstCardIndex = imageIndexSplit(firstPick)
    let secondCardIndex = imageIndexSplit(secondPick)
    if (firstCardIndex===secondCardIndex) {
        matches++
        removeCard();
    } else {
        showBack(firstPick);
        showBack(secondPick);
    };
    
    firstPick = -1;
    secondPick = -1;
    document.getElementById("status").innerHTML = "Matches: " + matches + " Tries: " + tries

}

function imageIndexSplit (index) {
    console.log(index);
    let splitIndex = images[index].split("")
    console.log(splitIndex[4])
    return splitIndex[4]
}


// determines if the images in firstPick and secondPick are a matches
// 2 cards are a match if they have the same value
// cardvs.jpg is the pattern for card file names
function isMatch() {
}

// removes one card from the board based on it's index
// set the backgroundImage to 'none' to remove the card
function removeCard(index) {
    document.getElementById(firstPick).style.backgroundImage = "none"
    document.getElementById(secondPick).style.backgroundImage = "none"
}
// END PART 3 - TEST THE ENTIRE APP //



