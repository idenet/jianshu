import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  Button,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

export default function SignIn() {
  const schema = yup
    .object({
      email: yup.string().required('请输入邮箱').email('邮箱格式不正确'),
      password: yup.string().required('请输入密码').min(6, '密码长度不能低于6'),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'jake@jake.jake',
      password: 'jakejake',
    },
  });

  const [flag, setFlag] = useState(false);

  const onSubmit = async values => {
    const { data } = await axios.post(
      'https://conduit.productionready.io/api/users/login',
      {
        user: values,
      }
    );
    console.log(data.user.token);
    if (data.user.token) {
      setFlag(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="2">
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftAddon children={<FaEnvelope />} />
              <Input placeholder="请输入邮箱" {...register('email')} />
            </InputGroup>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftAddon children={<FaLock />} />
              <Input
                type="password"
                placeholder="请输入密码"
                {...register('password')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            _hover={{ bgColor: 'tomato' }}
            w="100%"
            isLoading={isSubmitting}
            type="submit"
            colorScheme="teal"
          >
            登录
          </Button>
        </Stack>
      </form>
      {flag ? (
        <Alert status="success" mt="20px">
          <AlertIcon />
          注册成功
        </Alert>
      ) : null}
    </>
  );
}
