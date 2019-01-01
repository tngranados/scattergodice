import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Picker, Modal } from 'react-native';
import Dice from './components/Dice'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TimerCountdown from 'react-native-timer-countdown';
import { Audio } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class App extends React.Component {
  tickSound = new Audio.Sound();
  ringSound = new Audio.Sound()
  sixty = [...Array(60).keys()];

  initialState = {
    currentLetter: ' ‏‏‎ ',
    lettersLeft: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    lettersDone: [],
    isPickerVisible: false,
    reset: true,
  }

  constructor(props) {
    super(props);

    this.tickSound.loadAsync(require('./assets/tick.wav'));
    this.ringSound.loadAsync(require('./assets/ring.wav'));

    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.state.timerMinutes = 1;
    this.state.timerSeconds = 15;
  }

  showPicker = () => this.setState({ isPickerVisible: true });

  hidePicker = () => this.setState({ isPickerVisible: false });

  handlePicker = (time) => {
    this.state.timerNanoSeconds = time;
  };

  rollDice = () => {
    var lettersLeft = this.state.lettersLeft;
    if (lettersLeft.length > 0) {
      var lettersDone = this.state.lettersDone;

      const random = Math.floor(Math.random() * lettersLeft.length);
      const nextLetter = lettersLeft[random];

      if (this.state.currentLetter !== ' ‏‏‎ ' && this.state.currentLetter !== '-') {
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

  timerView = (time) => {
    return (
      <View style={[styles.timerCountdownView]}>
        <TimerCountdown
          initialSecondsRemaining={time}
          onTick={secondsRemaining => {
            if (secondsRemaining <= 4 * 1000) {
              this.tickSound.replayAsync()
            }
          }}
          onTimeElapsed={() => {
            this.ringSound.replayAsync()
          }}
          allowFontScaling={true}
          style={styles.timerCountdownText}
        />
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.header}>
          <Text style={styles.titleText}>Scattergodice</Text>
        </View>
        <View style={styles.dice}>
          <Dice
            onPress={this.rollDice} />
        </View>
        <View style={styles.currentLetterView}>
          <Text style={styles.currentLetterText}>
            {this.state.currentLetter}
          </Text>
        </View>
        <TouchableOpacity onPress={this.showPicker}>
          {this.state.reset && (
            <View style={[styles.timerCountdownView]}>
              <Text style={styles.timerCountdownText}>
                {this.state.timerMinutes <= 9 ? '0' + this.state.timerMinutes : this.state.timerMinutes}
                :
              {this.state.timerSeconds <= 9 ? '0' + this.state.timerSeconds : this.state.timerSeconds}
              </Text>
            </View>
          )}
          {!this.state.reset && this.timerView((this.state.timerMinutes * 60 + this.state.timerSeconds) * 1000)}
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isPickerVisible}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                this.hidePicker();
              }}>
              <Text style={styles.modalText}>Done</Text>
            </TouchableOpacity>
            <View style={styles.pickersView}>
              <Picker
                selectedValue={`${this.state.timerMinutes}`}
                onValueChange={(itemValue, itemIndex) => this.setState({ timerMinutes: parseInt(itemValue, 10) })}
                style={styles.pickerMinutes}
              >
                {Object.keys(this.sixty).map((key) => {
                  return (<Picker.Item label={key} value={key} key={key} color={colors.secondary} />)
                })
                }
              </Picker>
              <Picker
                selectedValue={`${this.state.timerSeconds}`}
                onValueChange={(itemValue, itemIndex) => this.setState({ timerSeconds: parseInt(itemValue, 10) })}
                style={styles.pickerSeconds}
              >
                {Object.keys(this.sixty).map((key) => {
                  return (<Picker.Item label={key} value={key} key={key} color={colors.secondary} />)
                })
                }
              </Picker>
            </View>
          </View>
        </Modal>
        <View style={styles.lettersDoneView}>
          <Text style={styles.lettersDoneText}>
            {this.state.lettersDone}
          </Text>
        </View>
        <View style={styles.resetButton}>
          <TouchableOpacity onPress={this.restart}>
            <MaterialCommunityIcons name="restart" size={32} color={colors.primary} />
          </TouchableOpacity>
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
  resetButton: {
    position: 'absolute',
    right: wp('5%'),
    bottom: wp('5%'),
  },
  lettersDoneView: {
    marginTop: hp('10%'),
    paddingHorizontal: wp('12%'),
  },
  lettersDoneText: {
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: wp('2%'),
    color: colors.light,
  },
  modalView: {
    marginTop: hp('60%'),
    marginHorizontal: wp('5%'),
    height: hp('50%'),
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.secondary,
    paddingTop: 10,
  },
  pickersView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  pickerMinutes: {
    height: hp('5%'),
    width: wp('15%'),
  },
  pickerSeconds: {
    height: hp('5%'),
    width: wp('15%'),
  }
});
