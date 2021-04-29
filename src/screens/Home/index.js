import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Wrapper} from '../../components';
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
  const [editKey, setEditKey] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName('');
    setAddress('');
    setMobile('');
    setEmail('');
    setPassword('');
    setIsEdit(false);
  }, []);

  const OnPress = async () => {
    if (!(name && address && mobile && email && password)) {
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
      setSubmitted(true);
      setEditKey(false);
      res && setIsEdit(true);
    } catch (e) {
      console.log('ERROR::', e);
    }
  };
  const onChangeName = name => {
    setName(name);
  };
  const onChangeAddress = addr => {
    console.log('addr::', addr);
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

  const onPressEdit = async (name, value) => {
    console.log('EDIT::', name, 'value::', value);
    setEditKey(name);
    // try {
    //   const res = await dispatch(
    //     addUserProfile({...profileData, [name]: value}),
    //   );
    //   console.log('RES::', res);
    //   res && Alert.alert('Edit Successfuly!');
    // } catch (e) {
    //   console.log('ERROR::', e);
    // }
  };
  const isEditable = key => {
    console.log('kEY::', key, 'editKEY', editKey);
    if (isSubmitted && key === editKey) {
      return true;
    } else if (!isSubmitted) {
      console.log('inside else if');
      return true;
    } else {
      return false;
    }
  };
  return (
    <Box style={{backgroundColor: colors.white, flex: 1}}>
      <Wrapper style={{flex: 0, backgroundColor: colors.white}} />
      <Box style={{flex: 1}}>
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
          isSubmitted={isSubmitted}
          password={password}
          mobile={mobile}
          isEdit={isEdit}
          isEditable={isEditable}
          onPressEdit={onPressEdit}
        />
      </Box>
    </Box>
  );
};
export default Home;
