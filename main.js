const quoteCon = document.getElementById('quote-Container');

const quoteText = document.getElementById('quote');

const authorName = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');



// Quote rt
// https://zenquotes.io/api/random

// twitter fun
// https://twitter.com/intent/tweet


let apiQuotes = []

//Show Loading
function Loading() {
  loader.hidden = false;
  quoteCon.hidden = true; 
}

//Hide Loading

function complete() {
    quoteCon.hidden = false; 
    loader.hidden = true;  
}

//Show New Quotes

function newQuote() {

    Loading();
   //Pick a random quote from apiQuotes array
   
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//    console.log(quote)

  //Check if Author Field is blank and replace it with "Unknown"

  if(!quote.author) {
    authorName.textContent = "Unknown";
  }else {
    authorName.textContent = quote.author;
  }

  //Check Quote length to determine styling (if the text is too much);

   if (quote.text.length > 50) {
     quoteText.classList.add("long-quote")
   }else {
    quoteText.classList.remove("long-quote")
   }

   //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes Fro m API

async function getQuotes() {
    const apiUrl ='https://type.fit/api/quotes';
    Loading()

    try{
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
    //    console.log(apiQuotes[12])

    newQuote();

    } catch(error) {
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorName.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes()
