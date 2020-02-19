// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, ScrollView } from 'react-native';

import Voice from 'react-native-voice';


class VoiceTest extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    previous: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    // eslint-disable-next-line
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    // eslint-disable-next-line
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
    // eslint-disable-next-line
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
      previous: this.state.previous + " " + this.state.partialResults
    });
  };

  onSpeechError = e => {
    // eslint-disable-next-line
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    // eslint-disable-next-line
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      // partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      previous: [],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Voice-to-Text Converter</Text>
        
        <View style={styles.inner_container}>
          <Text style={styles.instructions}>
            This App requires Wi-Fi to function. It will stop recording itself when it 
            stops recognizing any speech
          </Text>

          <View style={{width: '60%', alignSelf: 'center'}}>
            <Text style={styles.resultsHeading}>Recording Stats</Text>
            <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
            <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
            <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
            <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
            <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
          </View>

          <Text style={styles.resultsHeading}>Transcription</Text>
          
          <SafeAreaView style={styles.container2} >
            <ScrollView style={styles.scrollView}>
              <Text style ={styles.stat1}>
                {this.state.previous}
              </Text>              
            </ScrollView>
          </SafeAreaView>  

          <View style={{width: '100%', justifyContent: 'center',flexDirection: 'row'}}>
            <TouchableHighlight style={{marginRight: 20, borderRadius: 100, width: 50, height: 50, overflow: 'hidden', backgroundColor: '#3282b8', justifyContent: 'center', alignItems: 'center'}} onPress={this._startRecognizing}>
              <Image style={styles.button} source={require('./mic.png')} />
            </TouchableHighlight>

            <TouchableHighlight style={{marginRight: 20, borderRadius: 100, width: 50, height: 50, overflow: 'hidden', backgroundColor: '#3282b8', justifyContent: 'center', alignItems: 'center'}} onPress={this._stopRecognizing}>
              <Image style={styles.button} source={require('./pause.png')} />
            </TouchableHighlight>

            <TouchableHighlight style={{marginRight: 20, borderRadius: 100, width: 50, height: 50, overflow: 'hidden', backgroundColor: '#3282b8', justifyContent: 'center', alignItems: 'center'}} onPress={this._cancelRecognizing}>
              <Image style={{width: 25, height: 25}} source={require('./cancel.png')} />
            </TouchableHighlight>

            <TouchableHighlight style={{marginRight: 0,borderRadius: 100, width: 50, height: 50, overflow: 'hidden', backgroundColor: '#3282b8', justifyContent: 'center', alignItems: 'center'}} onPress={this._destroyRecognizer}>
              <Image style={styles.button} source={require('./destroy.png')} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1b272c',
  },
  inner_container: {
    justifyContent: 'center',
    height: '100%',
    width: '90%',
  },
  welcome: {
    fontFamily: 'sans-serif-medium',
    fontSize: 30,
    lineHeight: 80,
    textAlign: 'center',
    marginTop: -0,
    backgroundColor: '#141c20',
    color: '#3282b8',
    width: '100%',
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top: 40,
    // color: '#333333',
    // marginBottom: '30%',
  },
  stat: {
    color: '#3282b8',
    marginBottom: 1,
  },
  stat1: {
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    marginBottom: 1,
  },
  resultsHeading: {
    textAlign: 'center',
    color: '#3282b8',
    marginTop: 10,
    marginBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container2: {
    // flex: 1,
    height: 200,

  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
    height: 200,
    marginBottom: 60,
  },
});

export default VoiceTest;