import React from 'react';
import {TouchableOpacity, Image} from 'react-native'
import * as Animatable from 'react-native-animatable'

class Dice extends React.Component {
    constructor(props) {
        super(props)
    }

    handleViewRef = ref => this.view = ref;
    swing = () => {
        this.props.onPress();
        this.view.swing(650);
    };
  
    render() {
      return (
        <TouchableOpacity onPress={this.swing}>
          <Animatable.View ref={this.handleViewRef}>
            <Image
                style={styles.diceImg}
                source={require('../assets/dice.png')} />
          </Animatable.View>
        </TouchableOpacity>
      );
    }
}

export default Dice;

const styles = {
    diceImg: {
        height: 150,
        width: 150,
      },
}