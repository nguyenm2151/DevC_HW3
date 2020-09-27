import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from "./style"
import Button from "./component/button"
import CHOICES from "./component/choices"
import ChoiceCard from "./component/choicecard"
import GetRoundOutcome from "./component/utils"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      gamePrompt:"Fire!",
      userChoice: {},
      computerChoice: {},
      gameCount: 0,
      gamelost:0,
      gamewin:0,
      gametie:0,
      percentwin:0,
      percentlost:0,
      percenttie:0
    }
  }
  onPress = playerChoice => {
    const [result, compChoice] = GetRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
    this.setState({
      gamePrompt: result,
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
      gameCount: this.state.gameCount +1,
    })
    if (this.state.gamePrompt === 'Defeat!')
      this.setState({
        gamelost:this.state.gamelost+1,
        percentlost: this.state.gamelost/ (this.state.gamelost+this.state.gamewin+this.state.gametie)
      })
    if (this.state.gamePrompt === 'Victory!')
      this.setState({
        gamewin:this.state.gamewin+1,
        percentwin: this.state.gamewin/ (this.state.gamelost+this.state.gamewin+this.state.gametie)
      })
      
    if (this.state.gamePrompt === 'Tie game!')
      this.setState({
        gametie:this.state.gametie+1,
        percenttie: this.state.gametie/ (this.state.gamelost+this.state.gamewin+this.state.gametie)
      })
  }
  getResultColor = () => {
    if (this.state.gamePrompt === 'Victory!') return 'green';
    if (this.state.gamePrompt === 'Defeat!') return 'red';
    return null;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Game Played: {this.state.gameCount}</Text>
        <Text>Game Lost: {this.state.gamelost}</Text>
        <Text>Game Win: {this.state.gamewin}</Text>
        <Text>Game Tie: {this.state.gametie}</Text>
        <Text>Percent Win: {this.state.percentwin}</Text>
        <Text>Percent Lost: {this.state.percentlost}</Text>
        <Text>Percent Tie: {this.state.percenttie}</Text>

        <Text style={{ fontSize: 35, color: this.getResultColor() }}>{this.state.gamePrompt}</Text>
          <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={this.state.userChoice} />
          <Text style={{ fontSize: 35, fontFamily:'Courier',  color: '#250902' }}>vs</Text>
          <ChoiceCard player="Computer" choice={this.state.computerChoice} /> 
          </View> 
          <View style={styles.buttonContainer}>
          {CHOICES.map(choice => {
            return <Button key={choice.name} name={choice.name} onPress={this.onPress} />
          })
          }
          </View>
      </View>
      )
  }

    
}
