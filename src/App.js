import React, {
  Component
} from 'react';
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
import getYoutubeSubtitles from '@joegesualdo/get-youtube-subtitles-node'
import SpeechRecognition from './components/speechRecognition'
import {
  getSubtitles
} from 'youtube-captions-scraper';

const YT_API = 'AIzaSyAbmxlTomU6l61ZBgF3pzXXaGzodxAqB5s';

/*getSubtitles({
  videoID: 'JueUvj6X3DA', // youtube video id
  lang: 'en' // default: `en`
}).then(captions => {
  console.log(captions);
});*/
let timeOuts = [];
let videoId = 'QRS8MkLhQmM'
getYoutubeSubtitles(videoId, {
    type: 'nonauto'
  })
  .then(subtitles => {
    console.log(subtitles);
  })
  .catch(err => {
    console.log(err)
  })

var axios = require('axios');

//var //ROOT_URL = 'https://www.googleapis.com/youtube/v3/captions/8yMV7mc691ajCze115cxb5goeKsI0BJn';
//var ROOT_URL = 'https://www.googleapis.com/youtube/v3/captions/TqXDnlamg84o4bX0q2oaHz4nfWZdyiZMOrcuWsSLyPc=';
var ROOT_URL = 'http://video.google.com/timedtext?lang=en&v=M7FIvfx5J10'
/*buildApiRequest('GET',
                '/youtube/v3/captions',
                {'part': 'snippet',
                 'videoId': 'M7FIvfx5J10',
                 'onBehalfOfContentOwner': ''});*/

var params = {
  part: 'snippet',
  key: 'AIzaSyAbmxlTomU6l61ZBgF3pzXXaGzodxAqB5s',
  q: 'cat',
  type: 'video',
  videoId: 'M7FIvfx5J10',
  videoCaption: 'closedCaption'
};

axios.get(ROOT_URL)
  .then(function (response) {
    console.log(response);
    console.log(xmlToJson(response.data))
    // if (callback) { callback(response.data.items); }
  })
  .catch(function (error) {
    console.error(error);
  });

console.log(translate.getAllEmojiForWord('👀'));
console.log(translate.translate("the house is on fire and the cat is eating the cake"));

fetch(`http://video.google.com/timedtext?lang=en&v=Fq2CvmgoO7I`)
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => console.log(data))


var convert = require('xml-js');
var xml =
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<note importance="high" logged="true">' +
  '    <title>Happy</title>' +
  '    <todo>Work</todo>' +
  '    <todo>Play</todo>' +
  '</note>';
var result1 = convert.xml2json(xml, {
  compact: true,
  spaces: 4
});
var result2 = convert.xml2json(xml, {
  compact: false,
  spaces: 4
});
//console.log(result1, '\n', result2);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: {
        id: {
          videoId: "Fq2CvmgoO7I"
        }
      },
      data: [],
      caption: '',
    };

    this.searchYoutube('');
  }

  videoSearch = _.debounce((term) => {
    this.searchYoutube(term)
  }, 300);

  searchYoutube(term) {
    YTSearch({
      key: YT_API,
      term: term,
    }, (videos) => {
      console.log(videos);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      //this.playCaptions();
    });
  }
  //videoId used previously Fq2CvmgoO7I

clicked = () => {
  console.log("hey!")
}

  playCaptions = () => {
    let data = ''
    let url = `http://video.google.com/timedtext?lang=en&v=${this.state.selectedVideo.id.videoId}`
    console.log(url);
    timeOuts.forEach(function (t) {
      clearTimeout(t);
    })
    timeOuts = [];
    fetch(url)
      .then(response => response.text())
      //.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        console.log(data)
        if (data.length < 1) {
          return
        }
        var elem = document.createElement('textarea');
        elem.innerHTML = data;
        data = elem.value;
        let j = JSON.parse(convert.xml2json(data, {
          compact: true,
          spaces: 4
        }));
        console.log(j);
        //const captions = j.transcript.text.map((caption)=>{caption._text})
        this.setState({
          data: j.transcript.text
        })
        j.transcript.text.map(caption => {
          console.log(caption);
          let timeOut =
            setTimeout(function () {
              console.log(caption._text);
              this.setState({
                "caption": caption._text
              });
            }.bind(this), Number(caption._attributes.start) * 1000)
          timeOuts.push(timeOut);
        })
      })
  };

  render() {
      return ( <
          div >
          <
          NavBar siteTitle = 'Lyrical' / >
          <
          div className = "container" >
          <
          li > {
            translate.translate(this.state.caption)
          } < /li> {
          /*this.state.data.map(caption => {
                    setTimeout(function(){
                      console.log('applebananaorange',caption._text);
                      return( <li>{

                        translate.translate(caption._text)
                      
                      }</li> 
                    )},Number(caption._attributes.start)*1000)
                    
                   }
                    )*/
        } {
          /*<
                  SpeechRecognition / >*/
        } <
        SearchBar onChange = {
          (searchTerm) => {
            this.videoSearch(searchTerm)
          }
        }
      />
       <
      VideoPlayer video = {
        this.state.selectedVideo
      }
      onClick={()=>{ alert('alert'); }}
      /><button id="workplease" onClick={()=>{ alert('alert'); }}>alert</button> {
      /*<VideoList
                  onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
                  videos={this.state.videos}
                />*/
    } <
    /div> < /div >
);
}

}


export default App;





function xmlToJson(xml) {

  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof (obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};