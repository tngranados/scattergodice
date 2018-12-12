import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import Dice from './components/Dice'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TimerCountdown from 'react-native-timer-countdown';
import { Audio } from 'expo';

export default class App extends React.Component {
  tickSound = new Audio.Sound();
  ringSound = new Audio.Sound();

  initialState = {
    currentLetter: '',
    lettersLeft: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    lettersDone: [],
    reset: true,
  }

  constructor(props) {
    super(props);

    this.tickSound.loadAsync(require('./assets/tick.wav'));
    this.ringSound.loadAsync(require('./assets/ring.wav'));
    
    this.state = JSON.parse(JSON.stringify(this.initialState));
  }

  rollDice = () => {
    var lettersLeft = this.state.lettersLeft;
    if (lettersLeft.length > 0) {
      var lettersDone = this.state.lettersDone;
  
      const random = Math.floor(Math.random() * lettersLeft.length);
      const nextLetter = lettersLeft[random];
      
      if (this.state.currentLetter !== '' && this.state.currentLetter !== '-') {
        lettersDone.push(this.state.currentLetter);
      }
      lettersLeft.splice(lettersLeft.indexOf(nextLetter), 1);
  
      this.setState({
        currentLetter: nextLetter,
        lettersLeft: lettersLeft,
        lettersDone: lettersDone,
        reset: false,
      });
    } else {
      this.setState({
        currentLetter: '-',
      });
    }

    if (this.state.currentLetter === '-') {
      this.restart();
    }
  }

  restart = () => {
    this.setState(JSON.parse(JSON.stringify(this.initialState)));
  }

  timerView =
  <View style={[styles.timerCountdownView]}>
    <TimerCountdown
        initialSecondsRemaining={1000 * 90}
        onTick={secondsRemaining => 
          {
            if (secondsRemaining <= 1000 * 5) {
              this.tickSound.replayAsync()
            }
          }}
        onTimeElapsed={() =>
          {
            this.ringSound.replayAsync()
          }}
        allowFontScaling={true}
        style={styles.timerCountdownText}
    />
  </View>
  ;

  render() {
    return (
      <View style={styles.container}>
          <StatusBar barStyle='light-content' />
        <View style={styles.header}>
          <Text style={styles.titleText}>Scattergodice</Text>
        </View>
        <View style={styles.dice}>
          <Dice
            onPress={this.rollDice}/>
        </View>
        <View style={styles.currentLetterView}>
          <Text style={styles.currentLetterText}>
            {this.state.currentLetter}
          </Text>
        </View>
        {!this.state.reset && this.timerView}
        <View style={styles.lettersDoneView}>
          <Text style={styles.lettersDoneText}>
            {this.state.lettersDone}
          </Text>
        </View>
      </View>
    );
  }
}

const colors = {
  primary: '#dd7373',
  secondary: '#3b3561',
  light: '#d1d1d1',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    marginTop: hp('10%'),
  },
  dice: {
    marginTop: hp('5%'),
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
  },
  currentLetterView: {
    paddingTop: hp('2%'),
  },
  currentLetterText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: colors.light,
  },
  timerCountdownView: {
    marginTop: hp('5%'),
  },
  timerCountdownText: {
    fontSize: 22,
    color: colors.light,
  },
  lettersDoneView: {
    marginTop: hp('15%'),
    paddingHorizontal: wp('12%'),
  },
  lettersDoneText: {
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: wp('2%'),
    color: colors.light,
  },

});
