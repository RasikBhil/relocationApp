import React, {useState, useEffect} from 'react';
import {ScrollView, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '../../components';
import {addUserProfile} from '../../store/actions';
import Form from './widget/Form';
import {colors} from '../../../theme';
const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const profileData = useSelector(
    ({app: {userProfileData}}) => userProfileData,
  );
  const [name, setName] = useState(profileData?.name ? profileData?.name : '');
  const [address, setAddress] = useState(
    profileData?.addr ? profileData?.addr : '',
  );
  const [mobile, setMobile] = useState(
    profileData?.mobile ? profileData?.mobile : '',
  );
  const [email, setEmail] = useState(
    profileData?.email ? profileData?.email : '',
  );
  const [password, setPassword] = useState(
    profileData?.password ? profileData?.password : '',
  );

  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (isFocused) {
      setName('');
      setAddress('');
      setMobile('');
      setEmail('');
      setPassword('');
    }
  }, [isFocused]);

  const OnPress = async () => {
    if (!(name && mobile && email && password)) {
      Alert.alert('please Require All field!');
      return;
    }
    try {
      const params = {
        name: name,
        addr: address,
        mobile: mobile,
        email: email,
        password: password,
      };
      const res = await dispatch(addUserProfile(params));
      res && setIsEdit(true);
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

  const onPressEdit = (name, value) => {
    try {
      dispatch(addUserProfile({...profileData, [name]: value}));
    } catch (e) {
      console.log('ERROR::', e);
    }
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
          name={name}
          address={address}
          email={email}
          password={password}
          mobile={mobile}
          isEdit={isEdit}
          onPressEdit={onPressEdit}
        />
      </ScrollView>
    </Box>
  );
};
export default Home;
