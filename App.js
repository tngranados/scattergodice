import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo';
import React from 'react';
import {
  Alert,
  Modal,
  Picker,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';
import Dice from './components/Dice';
import { colors, styles } from './styles/styles';

export default class App extends React.Component {
  tickSound = new Audio.Sound();
  ringSound = new Audio.Sound();
  eleven = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  twelve = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  initialState = {
    currentLetter: ' ‏‏‎ ',
    lettersLeft: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
    lettersDone: [],
    isPickerVisible: false,
    reset: true,
  };

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

  handlePicker = time => {
    this.state.timerNanoSeconds = time;
  };

  rollDice = () => {
    var lettersLeft = this.state.lettersLeft;
    if (lettersLeft.length > 0) {
      var lettersDone = this.state.lettersDone;

      const random = Math.floor(Math.random() * lettersLeft.length);
      const nextLetter = lettersLeft[random];

      if (
        this.state.currentLetter !== ' ‏‏‎ ' &&
        this.state.currentLetter !== '-'
      ) {
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
  };

  restart = () => {
    Alert.alert('Restart', 'Are you sure you want to restart?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Restart',
        onPress: () => {
          this.setState(JSON.parse(JSON.stringify(this.initialState)));
        },
        style: 'destructive',
      },
    ]);
  };

  timerView = time => {
    return (
      <View style={[styles.timerCountdownView]}>
        <TimerCountdown
          initialSecondsRemaining={time}
          onTick={secondsRemaining => {
            if (secondsRemaining <= 4 * 1000) {
              this.tickSound.replayAsync();
            }
          }}
          onTimeElapsed={() => {
            this.ringSound.replayAsync();
          }}
          allowFontScaling={true}
          style={styles.timerCountdownText}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.titleText}>Scattergodice</Text>
        </View>
        <View style={styles.dice}>
          <Dice onPress={this.rollDice} />
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
                {this.state.timerMinutes <= 9
                  ? '0' + this.state.timerMinutes
                  : this.state.timerMinutes}
                :
                {this.state.timerSeconds <= 9
                  ? '0' + this.state.timerSeconds
                  : this.state.timerSeconds}
              </Text>
            </View>
          )}
          {!this.state.reset &&
            this.timerView(
              (this.state.timerMinutes * 60 + this.state.timerSeconds) * 1000
            )}
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={this.hidePicker}
          visible={this.state.isPickerVisible}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                this.hidePicker();
              }}
            >
              <Text style={styles.modalText}>Done</Text>
            </TouchableOpacity>
            <View styles={styles.pickersContainer}>
              <View style={styles.pickersView}>
                <View style={styles.pickersViewMinutes}>
                  <Picker
                    selectedValue={`${this.state.timerMinutes}`}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ timerMinutes: parseInt(itemValue, 10) })
                    }
                    style={styles.pickerMinutes}
                    prompt="Minutes"
                  >
                    {Object.keys(this.eleven).map(key => {
                      return (
                        <Picker.Item
                          label={key}
                          value={key}
                          key={key}
                          color={colors.secondary}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={styles.pickersViewSeconds}>
                  <Picker
                    selectedValue={`${this.state.timerSeconds}`}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ timerSeconds: parseInt(itemValue, 10) })
                    }
                    style={styles.pickerSeconds}
                    prompt="Seconds"
                  >
                    {Object.keys(this.twelve).map(key => {
                      return (
                        <Picker.Item
                          label={`${+key * 5}`}
                          value={`${+key * 5}`}
                          key={key}
                          color={colors.secondary}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.lettersDoneView}>
          <Text style={styles.lettersDoneText}>{this.state.lettersDone}</Text>
        </View>
        <View style={styles.resetButton}>
          <TouchableOpacity onPress={this.restart}>
            <MaterialCommunityIcons
              name="restart"
              size={32}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
