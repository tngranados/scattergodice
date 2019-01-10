import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const colors = {
  primary: '#dd7373',
  secondary: '#3b3561',
  light: '#d1d1d1',
};

export const styles = StyleSheet.create({
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
  pickersContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  pickersView: {
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
  },
});
