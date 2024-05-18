import useLogin from "@/hooks/useLogin"
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
}

const LoginPage = () => {
  const { login, isError, isSuccess, error } = useLogin()
  const navigate = useNavigate()

  const { onSubmit, key, getInputProps } = useForm<SignUpFormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "user@example.com",
      password: "password",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password is too short"),
    },
  })

  useEffect(() => {
    console.log(isError)
    if (isError) {
      notifications.show({
        title: "Login failed!",
        message: error.response.data.message,
        color: "red",
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: "Login successful!",
        message: "Redirecting to your dashboard...",
        color: "green",
      })

      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    }
  }, [isSuccess])

  return (
    <Container size={420} mx="auto" my={40}>
      <Title ta="center">Login</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account?{" "}
        <Anchor size="sm" component="button">
          Sign up
        </Anchor>
      </Text>
      <Paper p={30} mt={30}>
        <form
          onSubmit={onSubmit((values) => login(values.email, values.password))}
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

          <Group justify="flex-end" mt={30}>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}

export default LoginPage
