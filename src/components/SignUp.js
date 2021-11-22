import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

export default function SignUp() {
  const schema = yup
    .object({
      username: yup.string().required('请输入用户名'),
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
      username: 'xdxdji',
      email: 'jake@jake.jake',
      password: 'jakejake',
    },
  });

  const [flag, setFlag] = useState(false);

  const onSubmit = async values => {
    const { data } = await axios.post(
      'https://conduit.productionready.io/api/users',
      {
        user: values,
      }
    );
    console.log(data.user.username);
    if (data.user.username) {
      setFlag(true);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="2">
          <FormControl isInvalid={errors.username}>
            <InputGroup>
              <InputLeftAddon children={<FaUserAlt />} />
              <Input placeholder="请输入用户名" {...register('username')} />
            </InputGroup>
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftAddon children={<FaEnvelope />} />
              <Input
                type="email"
                placeholder="请输入邮箱"
                {...register('email')}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftAddon children={<FaLock />} />
              <Input
                type="password"
                placeholder="请输入密码"
                {...register('password')}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </InputGroup>
          </FormControl>
          <Button
            _hover={{ bgColor: 'tomato' }}
            w="100%"
            isLoading={isSubmitting}
            type="submit"
            colorScheme="teal"
          >
            注册
          </Button>
        </Stack>
      </form>
      {flag ? (
        <Alert status="success" mt="20px">
          <AlertIcon />
          登录成功
        </Alert>
      ) : null}
    </>
  );
}
