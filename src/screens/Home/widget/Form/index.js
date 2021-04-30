import React from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import {ms, s} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Box, Button, Label, InputField} from '../../../../components';
import {API_KEY} from '../.././../../utils/api';
import {colors} from '../../../../../theme';
import {ic_edit} from '../../../../assets/images';

const Form = props => {
  const {
    onPress,
    onPressEdit,
    onChangeName,
    onChangeAddress,
    onChangeMobile,
    onChangeEmail,
    onChangePassword,
    name,
    email,
    password,
    mobile,
    isEdit,
    isEditable,
    isSubmitted,
  } = props;

  return (
    <Box style={styles.box}>
      <TouchableWithoutFeedback
        containerStyle={styles.box}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'null'}
          style={styles.box}
          keyboardVerticalOffset={Platform.select({
            ios: ms(100),
          })}>
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Box style={styles.container}>
              <Box>
                <InputBox
                  editable={isEditable('name')}
                  label={'Name'}
                  placeHolder={'Enter Name'}
                  value={name}
                  onChangeText={onChangeName}
                  isEdit={isEdit}
                  onPressEdit={() => onPressEdit('name')}
                />
                <Label style={styles.label}>Address:</Label>
                <Box style={styles.sectionStyle}>
                  <GooglePlacesAutocomplete
                    textInputProps={{
                      editable: isEditable('addr'),
                    }}
                    placeholder="Search Address"
                    query={{
                      key: API_KEY,
                      language: 'en',
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
                        ...styles.googleInput,
                        backgroundColor:
                          isEdit && isEditable('addr')
                            ? colors.lightBlue
                            : colors.white,
                      },
                    }}
                  />
                  {isEdit && (
                    <TouchableOpacity onPress={() => onPressEdit('addr')}>
                      <Image source={ic_edit} style={styles.imageStyle} />
                    </TouchableOpacity>
                  )}
                </Box>
                <InputBox
                  label={'Mobile'}
                  editable={isEditable('mobile')}
                  placeHolder={'Enter Mobile Number'}
                  value={mobile}
                  onChangeText={onChangeMobile}
                  isEdit={isEdit}
                  onPressEdit={() => onPressEdit('mobile')}
                  keyboardType="numeric"
                />
                <InputBox
                  label={'Email'}
                  editable={isEditable('email')}
                  placeHolder={'Enter Email'}
                  value={email}
                  onChangeText={onChangeEmail}
                  isEdit={isEdit}
                  onPressEdit={() => onPressEdit('email')}
                />
                <InputBox
                  label={'Password'}
                  editable={isEditable('password')}
                  onChangeText={onChangePassword}
                  placeHolder={'Enter Password'}
                  value={password}
                  secureTextEntry={true}
                  isEdit={isEdit}
                  onPressEdit={() => onPressEdit('password')}
                />
              </Box>
              <Button
                title={isSubmitted ? 'save' : 'submit'}
                onPress={onPress}
              />
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Box>
  );
};
export default Form;

const InputBox = props => {
  const {
    label,
    placeHolder,
    value,
    onChangeText,
    isEdit,
    onPressEdit,
    editable,
  } = props;
  return (
    <Box>
      <Label style={styles.label}>{label}</Label>
      <Box style={styles.sectionStyle}>
        <InputField
          onChangeText={onChangeText}
          placeHolder={placeHolder}
          value={value}
          style={{
            flex: 1,
            backgroundColor:
              isEdit && editable ? colors.lightBlue : colors.white,
            height: ms(40),
          }}
          {...props}
        />
        {isEdit && (
          <TouchableOpacity onPress={onPressEdit}>
            <Image source={ic_edit} style={styles.imageStyle} />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  label: {
    paddingHorizontal: ms(10),
    paddingTop: ms(10),
    fontSize: s(13),
    fontWeight: '700',
    textAlign: 'left',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? ms(5) : ms(0),
    marginVertical: ms(10),
    marginHorizontal: ms(9),
    borderBottomWidth: ms(0.5),
    borderBottomColor: colors.gray,
  },
  imageStyle: {
    height: ms(25),
    width: ms(25),
    resizeMode: 'contain',
    alignItems: 'center',
  },
  googleInput: {
    height: ms(30),
    fontSize: ms(13),
    borderRadius: 0,
    paddingRight: ms(10),
    paddingLeft: ms(2),
  },
});
