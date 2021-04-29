import React from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'null'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.select({ios: ms(100)})}>
      <ScrollView>
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
                    height: 30,
                    fontSize: ms(15),
                    backgroundColor:
                      isEdit && isEditable('addr')
                        ? colors.lightBlue
                        : colors.white,
                    borderRadius: 0,
                    paddingHorizontal: ms(1),
                  },
                }}
              />
              {isEdit && (
                <TouchableOpacity onPress={() => onPressEdit('addr')}>
                  <Image
                    source={ic_edit}
                    style={
                      isEditable('addr')
                        ? [styles.imageStyle, {backgroundColor: '#F0F8FF'}]
                        : styles.imageStyle
                    }
                  />
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
          <Button title={isSubmitted ? 'save' : 'submit'} OnPress={onPress} />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
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
      <Box
        style={
          isEdit && editable
            ? {...styles.sectionStyle, backgroundColor: colors.lightBlue}
            : styles.sectionStyle
        }>
        <InputField
          onChangeText={onChangeText}
          placeHolder={placeHolder}
          value={value}
          style={{flex: 1}}
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
    backgroundColor: colors.white,
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
});
