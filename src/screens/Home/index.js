import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '../../components';
import {addUserProfile} from '../../store/actions';
import Form from './widget/Form';
import {colors} from '../../../theme';

const Home = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(
    ({app: {userProfileData}}) => userProfileData,
  );
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editKey, setEditKey] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName(profileData?.name ? profileData?.name : '');
    setAddress(profileData?.addr ? profileData?.addr : '');
    setMobile(profileData?.mobile ? profileData?.mobile : '');
    setEmail(profileData?.email ? profileData?.email : '');
    setPassword(profileData?.password ? profileData?.password : '');
  }, [profileData]);

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onPress = async () => {
    if ((name && address && mobile && email && password) !== '') {
      if (emailRegex.test(email) === false) {
        Alert.alert('Enter Valid email address!');
        return false;
      }
    } else if (!(name && address && mobile && email && password)) {
      Alert.alert('Required all field!!!');
      return false;
    } else {
      return true;
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
  const onPressEdit = async name => {
    setEditKey(name);
  };
  const isEditable = key => {
    if (isSubmitted && key === editKey) {
      return true;
    } else if (!isSubmitted) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Box style={{backgroundColor: colors.white, flex: 1}}>
      <Form
        onPress={onPress}
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
  );
};
export default Home;
