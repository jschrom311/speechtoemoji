import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import translate from 'moji-translate';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer'
import NavBar from './components/NavBar'
import GetYoutubeSubtitles from '@joegesualdo/get-youtube-subtitles-node'
import SpeechRecognition from './components/speechRecognition'
import { getSubtitles } from 'youtube-captions-scraper';

const YT_API = 'AIzaSyAbmxlTomU6l61ZBgF3pzXXaGzodxAqB5s';

getSubtitles({
  videoID: 'JueUvj6X3DA', // youtube video id
  lang: 'en' // default: `en`
}).then(captions => {
  console.log(captions);
});

/*let videoId = 'q_q61B-DyPk'
 
getYoutubeSubtitles(videoId)
.then(subtitles => {
  console.log(subtitles)
})
.catch(err => {
  console.log(err)
})*/

console.log(translate.getAllEmojiForWord('👀'));
console.log(translate.translate("the house is on fire and the cat is eating the cake"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.searchYoutube('');
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term) }, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term}, (videos) => {
      console.log(videos);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar siteTitle='React Youtube App' />
        <div className="container">
          <SpeechRecognition />
          <SearchBar
            onChange={(searchTerm) => {this.videoSearch(searchTerm)}} />
          <VideoPlayer video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
            videos={this.state.videos}
            />
        </div>
      </div>
    );
  }

}


export default App;
