import { Platform, StyleSheet } from 'react-native';
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
    marginHorizontal: wp('5%'),
    backgroundColor: colors.primary,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        marginTop: hp('60%'),
        height: hp('50%'),
      },
      android: {
        marginTop: hp('70%'),
        height: hp('40%'),
      },
    }),
  },
  modalText: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.secondary,
    paddingTop: 10,
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
  pickersContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      },
      android: {},
    }),
  },
  pickersView: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primary,
      },
      android: {
        marginTop: hp('5%'),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
    }),
  },
  pickersViewMinutes: {
    ...Platform.select({
      ios: {},
      android: {
        width: wp('20%'),
        // justifyContent: 'flex-start',
      },
    }),
  },
  pickersViewSeconds: {
    ...Platform.select({
      ios: {},
      android: {
        width: wp('20%'),
        // justifyContent: 'flex-end',
      },
    }),
  },
  pickerMinutes: {
    ...Platform.select({
      ios: {
        height: hp('5%'),
        width: wp('15%'),
      },
      android: {},
    }),
  },
  pickerSeconds: {
    ...Platform.select({
      ios: {
        height: hp('5%'),
        width: wp('15%'),
      },
      android: {},
    }),
  },
});
