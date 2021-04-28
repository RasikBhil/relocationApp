import React from 'react';
import {StyleSheet} from 'react-native';
import {ms, s} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Box, Button, Label, InputField} from '../../../../components';
import {API_KEY} from '../.././../../utils/api';
import {colors} from '../../../../../theme';
const Form = props => {
  const {
    OnPress,
    onChangeName,
    onChangeAddress,
    onChangeMobile,
    onChangeEmail,
    onChangePassword,
  } = props;
  return (
    <Box style={styles.container}>
      <Label style={styles.label}>Name:</Label>
      <InputField onChangeText={onChangeName} placeHolder={'Enter Name'} />
      <Label style={styles.label}>Address:</Label>
      <GooglePlacesAutocomplete
        placeholder="Search Address"
        query={{
          key: API_KEY,
          language: 'en', // language of the results
        }}
        keyboardShouldPersistTaps={'always'}
        onPress={(data, details = null) => onChangeAddress(data)}
        onFail={error => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        styles={{
          textInput: {
            height: ms(40),
            marginTop: ms(10),
            borderBottomWidth: ms(1),
            borderBottomColor: colors.gray,
            backgroundColor: colors.white,
            borderStyle: 'solid',
            borderRadius: 0,
            paddingHorizontal: ms(1),
            marginHorizontal: ms(10),
          },
        }}
      />
      <Label style={styles.label}>Mobile:</Label>
      <InputField
        onChangeText={onChangeMobile}
        placeHolder={'Enter Mobile Number'}
      />
      <Label style={styles.label}>Email:</Label>
      <InputField onChangeText={onChangeEmail} placeHolder={'Enter Email'} />
      <Label style={styles.label}>Password:</Label>
      <InputField
        onChangeText={onChangePassword}
        secureTextEntry={true}
        placeHolder={'Enter Password'}
      />
      <Button title={'submit'} OnPress={OnPress} />
    </Box>
  );
};
export default Form;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
  },
  label: {
    paddingHorizontal: ms(10),
    paddingTop: ms(10),
    fontSize: s(13),
    fontWeight: '700',
    textAlign: 'left',
  },
});
