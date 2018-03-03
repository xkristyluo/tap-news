import './NewsPanel.css';

import NewsCard from '../NewsCard/NewsCard';
import React from 'react';
import _ from 'lodash'; // debounce 

class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = {news : null}; // list of NewsCard 
  }
  
  componentDidMount() {
    this.loadMoreNews();
    // Debounce, call loadMoreNews() once per second
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
    // Load more news as clients scroll down
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  // // Load more news from server as clients scroll down the page 
  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      console.log('handleScroll');
      this.loadMoreNews();
    }
  }
  
  // Load news from back-end
  loadMoreNews() {
    console.log('Loading more news');
    /*
    // mock news list for front-end testing 
    const mock_news = [
        {
            source: "The Wall Street Journal", 
            title: "Here's How Much Bitcoin Elon Musk Owns", 
            description: "Tesla CEO Elon Musk revealed this week on Twitter how much Bitcoin he owns—and it’s not much.",
            url: "http://fortune.com/2018/02/23/bitcoin-elon-musk-value/",
            urlToImage: "https://fortunedotcom.files.wordpress.com/2016/10/456967704.jpg",
            publishedAt: "2018-02-24T18:42:00Z",
            digest: "3RjuEomJo2601syZbU70HA==\n", 
            reason: "Recommend"
        }
    ]; 

    this.setState({news: mock_news}); 
    */
    
    // HTTP GET news list 
    const news_url = 'http://' + window.location.hostname + ':3000' + '/news';
    const request = new Request(news_url, {method: 'GET'});

    fetch(request)
      .then(res => res.json())
      .then(fetched_news_list => {
        // Update UI to show more news
        this.setState({
            news: this.state.news ? this.state.news.concat(fetched_news_list) : fetched_news_list,
        });
      });
  }

  // Render a dynamic news list
  renderNews() {
    const news_card_list = this.state.news.map(one_news => {
      return(
        // With key attribute, the virtual DOM can identify and only re-render the modified components in the list 
        <a className='list-group-item' key={one_news.digest} href="#">
          <NewsCard news={one_news} />
        </a>
      );
    });

    return(
      <div className="container-fluid">
        <div className='list-group'>
          {news_card_list}
        </div>
      </div>
    )
  }
  
  render() {
    if (this.state.news) {
      return(
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return(
        <div id='msg-app-loading'>
          Loading...
        </div>
      );
    }
  }
}

export default NewsPanel;
