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

interface SignUpFormValues {
  email: string
  password: string
  passwordConfirm: string
}

const SignUpPage = () => {
  const { register } = useRegister()

  const { onSubmit, key, getInputProps } = useForm<SignUpFormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password is too short"),
      passwordConfirm: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  })

  return (
    <Container size={420} mx="auto" my={40}>
      <Title ta="center">Sign Up</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an ccount?{" "}
        <Anchor size="sm" component="button">
          Sign in
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
              Sign Up
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUpPage
