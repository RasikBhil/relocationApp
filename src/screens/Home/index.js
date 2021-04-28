import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Box} from '../../components';
import {addUserProfile} from '../../store/actions';
import Form from './widget/Form';
import {colors} from '../../../theme';
const Home = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnPress = async () => {
    console.log('CLICK;');
    try {
      const params = {
        name: name,
        addr: address,
        mobile: mobile,
        email: email,
        password: password,
      };
      const res = await dispatch(addUserProfile(params));
      console.log('res::', res);
    } catch (e) {
      console.log('ERROR::', e);
    }
  };
  const onChangeName = name => {
    setName(name);
  };
  const onChangeAddress = addr => {
    setAddress(addr?.description);
  };
  const onChangeMobile = mob => {
    setMobile(mob);
  };
  const onChangeEmail = email => {
    setEmail(email);
  };
  const onChangePassword = pwd => {
    setPassword(pwd);
  };
  return (
    <Box style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView>
        <Form
          OnPress={OnPress}
          onChangeName={onChangeName}
          onChangeAddress={onChangeAddress}
          onChangeMobile={onChangeMobile}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
        />
      </ScrollView>
    </Box>
  );
};
export default Home;
