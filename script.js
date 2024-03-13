

//Arrow function method

const quoteCon = document.getElementById('quote-Container');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
const showLoading = () => {
  loader.hidden = false;
  quoteCon.hidden = true;
};

// Hide Loading
const hideLoading = () => {
  if (!loader.hidden) {
    quoteCon.hidden = false;
    loader.hidden = true;
  }
};

// Get Quote From API
const getQuote = async () => {
  showLoading();

  const apiUrl = 'https://api.quotable.io/random';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

    if (data.author === '') {
      authorName.innerText = 'Unknown';
    } else {
      authorName.innerText = data.author;
    }

    if (data.content.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.content;

    hideLoading();
  } catch (error) {
    console.error('Error fetching quote:', error);
    getQuote(); // Retry fetching quote
  }
};

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorName.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On initial load
getQuote();
