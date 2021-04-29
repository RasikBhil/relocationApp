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
    setSubmitted(false);
    setEditKey('');
  }, []);

  const onPress = async () => {
    if (!(name && address && mobile && email && password)) {
      Alert.alert('Require All field!');
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
