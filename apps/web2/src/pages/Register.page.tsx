import useRegister from "@/hooks/useRegister"
import {
  Button,
  Group,
  TextInput,
  Container,
  Title,
  Text,
  Anchor,
  Paper,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface SignUpFormValues {
  email: string
  password: string
  passwordConfirm: string
}

const RegisterPage = () => {
  const { register, isError, isSuccess, error } = useRegister()
  const navigate = useNavigate()

  const { onSubmit, key, getInputProps } = useForm<SignUpFormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "user@example.com",
      password: "password",
      passwordConfirm: "password",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password is too short"),
      passwordConfirm: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  })

  useEffect(() => {
    console.log(isError)
    if (isError) {
      notifications.show({
        title: "Registration failed!",
        message: error.response.data.message,
        color: "red",
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: "Registration successful!",
        message: "Redirecting to login page...",
        color: "green",
      })

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    }
  }, [isSuccess])

  return (
    <Container size={420} mx="auto" my={40}>
      <Title ta="center">Sign Up</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button">
          Sign in here
        </Anchor>
      </Text>
      <Paper p={30} mt={30}>
        <form
          onSubmit={onSubmit((values) =>
            register(values.email, values.password)
          )}
        >
          <TextInput
            label="Email"
            key={key("email")}
            {...getInputProps("email")}
            mt="sm"
            type="email"
            withAsterisk
          />
          <TextInput
            label="Password"
            key={key("password")}
            {...getInputProps("password")}
            mt="sm"
            type="password"
            withAsterisk
          />
          <TextInput
            label="Confirm Password"
            key={key("passwordConfirm")}
            {...getInputProps("passwordConfirm")}
            mt="sm"
            type="password"
            withAsterisk
          />

          <Group justify="flex-end" mt={30}>
            <Button type="submit" fullWidth>
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}

export default RegisterPage
