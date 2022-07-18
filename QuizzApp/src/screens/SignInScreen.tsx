// @ts-ignore
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
} from 'react-native';
import {IC_BACK_CIRCLE, IC_FB, IC_GG} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchAsyncLogin} from '../store/slices/AuthSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {isValidPassword} from '../utilities/Validation';

const width = Dimensions.get('window').width;

const SignInScreen = () => {
  const [showPass, setShowPass] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [errorPassword, setErrorPassword] = useState('');

  const isValidationOK = () => {
    data.password.length > 0 && isValidPassword(data.password) == true;
  };

  const handleShowPass = useCallback(() => {
    setShowPass(!showPass);
  }, [showPass]);

  const handleLogin = useCallback(() => {
    return dispatch(fetchAsyncLogin(data)).then(response => {
      if (!response.error) {
        navigation.navigate('HomeScreen');
      }
    });
  }, [data]);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;

  const navigation = useNavigation<any>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onChangeUsername = useCallback(
    val => {
      setData({...data, username: val});
    },
    [data],
  );

  const onChangePassword = useCallback(
    val => {
      setErrorPassword(
        isValidPassword(val) == true ? '' : 'Check your password',
      );
      setData({...data, password: val});
    },
    [data],
  );

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{flex: 1}}>
      <LinearGradient colors={['#3179E3', '#2DA7EB']} style={styles.background}>
        <ButtonBack onPress={goBack}>
          <Image
            source={IC_BACK_CIRCLE}
            style={{marginTop: 42, marginLeft: 12}}
          />
        </ButtonBack>

        <TitleSection>
          <Title>Welcome Back</Title>
        </TitleSection>

        <ButtonSection>
          <ButtonFB>
            <Image source={IC_FB} />
            <ButtonText>CONTINUE WITH FACEBOOK</ButtonText>
          </ButtonFB>
          <ButtonGG>
            <Image source={IC_GG} />
            <ButtonText>CONTINUE WITH GOOGLE</ButtonText>
          </ButtonGG>
          <TextLoginOther>OR LOGIN WITH EMAIL</TextLoginOther>
        </ButtonSection>

        <InputEmail>
          <Email
            placeholder={'Email'}
            value={data.username}
            onChangeText={onChangeUsername}
          />
        </InputEmail>

        <InputPassword>
          <Password
            placeholder={'Password'}
            value={data.password}
            onChangeText={onChangePassword}
            secureTextEntry={showPass}
          />
          <ButtonShowPass onPress={handleShowPass}>
            <FontAwesome
              name={!showPass ? 'eye' : 'eye-slash'}
              size={18}
              color="black"
            />
          </ButtonShowPass>
        </InputPassword>
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            marginLeft: 22,
            marginTop: 5,
          }}>
          {errorPassword}
        </Text>

        <ButtonLogin onPress={handleLogin}>
          <ButtonLoginText>LOG IN</ButtonLoginText>
        </ButtonLogin>

        <ButtonForgotPW>
          <TextForgotPW>Forgot Password?</TextForgotPW>
        </ButtonForgotPW>

        <RemainingView>
          <TextNotLogin>DON’T HAVE AN ACCOUNT? </TextNotLogin>
          <TextRegister>SIGN UP</TextRegister>
        </RemainingView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

const Container = styled.View`
  flex: 1;
`;

const ButtonBack = styled.TouchableOpacity``;

const TitleSection = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 28px;
  line-height: 38px;
  color: #ffffff;
`;
const ButtonSection = styled.View`
  justify-content: center;
  align-items: center;
`;

const ButtonFB = styled(ButtonBack)`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.01);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  width: ${width - 22}px;
  height: 63px;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  justify-content: space-evenly;
`;
const ButtonGG = styled(ButtonFB)``;

const ButtonText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.05px;
  color: #000000;
`;

const TextLoginOther = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.05px;
  color: #ffffff;
  margin-top: 30px;
`;

const InputEmail = styled.View`
  align-items: center;
`;

const InputPassword = styled.View`
  width: 360px;
  height: 50px;
  background-color: white;
  border-radius: 38px;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  align-self: center;
`;

const ButtonShowPass = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Email = styled.TextInput`
  width: 360px;
  height: 50px;
  background-color: white;
  border-radius: 38px;
  flex: auto;
  margin-top: 30px;
  padding: 10px;
`;

const Password = styled.TextInput`
  height: 50px;
  flex: auto;
  padding: 10px;
`;

const ButtonLogin = styled(ButtonFB)`
  justify-content: center;
  align-self: center;
  height: 50px;
`;

const ButtonLoginText = styled(ButtonText)``;

const ButtonForgotPW = styled(ButtonBack)`
  justify-content: center;
  align-self: center;
  margin-top: 30px;
`;

const TextForgotPW = styled(ButtonText)`
  color: white;
`;

const RemainingView = styled(ButtonBack)`
  flex-direction: row;
  margin-top: 60px;
  justify-content: center;
  align-items: center;
`;

const TextNotLogin = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.05px;
  color: #ffffff;
`;

const TextRegister = styled(TextNotLogin)`
  color: black;
`;
