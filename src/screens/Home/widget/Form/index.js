import React from 'react';
import {StyleSheet, Image, TextInput} from 'react-native';
import {ms, s} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Box, Button, Label, InputField} from '../../../../components';
import {API_KEY} from '../.././../../utils/api';
import {colors} from '../../../../../theme';
import {ic_edit} from '../../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Form = props => {
  const {
    OnPress,
    onPressEdit,
    onChangeName,
    onChangeAddress,
    onChangeMobile,
    onChangeEmail,
    onChangePassword,
    name,
    address,
    email,
    password,
    mobile,
    isEdit,
    isEditable,
    isSubmitted,
    nameRef,
    addrRef,
    mobileRef,
    emailRef,
    passwordRef,
  } = props;

  return (
    <Box style={styles.container}>
      <Box>
        <InputBox
          editable={isEditable('name')}
          label={'Name'}
          placeHolder={'Enter Name'}
          value={name}
          onChangeText={onChangeName}
          isEdit={isEdit}
          onPressEdit={() => onPressEdit('name', name)}
          ref={nameRef}
        />
        <Label style={styles.label}>Address:</Label>
        <Box style={styles.sectionStyle}>
          <GooglePlacesAutocomplete
            textInputProps={{
              editable: isEditable('addr'),
              ref: addrRef,
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
                fontSize: 15,
                // marginTop: ms(10),
                // borderBottomWidth: ms(0.5),
                // borderBottomColor: colors.gray,
                backgroundColor: colors.white,
                // borderStyle: 'solid',
                borderRadius: 0,
                paddingHorizontal: ms(1),
              },
            }}
          />
          {isEdit && (
            <TouchableOpacity onPress={() => onPressEdit('addr', address)}>
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
          onPressEdit={() => onPressEdit('mobile', mobile)}
          keyboardType="numeric"
          ref={mobileRef}
        />
        <InputBox
          label={'Email'}
          editable={isEditable('email')}
          placeHolder={'Enter Email'}
          value={email}
          onChangeText={onChangeEmail}
          isEdit={isEdit}
          onPressEdit={() => onPressEdit('email', email)}
          ref={emailRef}
        />
        <InputBox
          label={'Password'}
          editable={isEditable('password')}
          onChangeText={onChangePassword}
          placeHolder={'Enter Password'}
          value={password}
          secureTextEntry={true}
          isEdit={isEdit}
          onPressEdit={() => onPressEdit('password', password)}
          ref={passwordRef}
        />
      </Box>
      <Button title={isSubmitted ? 'save' : 'submit'} OnPress={OnPress} />
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
    ref,
  } = props;
  return (
    <Box>
      <Label style={styles.label}>{label}</Label>
      <Box style={styles.sectionStyle}>
        <InputField
          onChangeText={onChangeText}
          placeHolder={placeHolder}
          value={value}
          style={{flex: 1}}
          ref={ref}
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
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // height: ms(40),
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
