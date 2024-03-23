import type { Meta, StoryObj } from "@storybook/react"

import DescriptionList from "./DescriptionList"

const meta: Meta<typeof DescriptionList> = {
  component: DescriptionList,
}

export default meta
type Story = StoryObj<typeof DescriptionList>

const user = {
  id: "1",
  email: "user@example.com",
  updatedAt: new Date(),
}

const options = [
  { key: "id", name: "User ID" },
  { key: "email", name: "Email address" },
  {
    key: "updatedAt",
    name: "Last updated",
    formatter: (date: Date | string) => {
      if (typeof date === "string") {
        return date
      } else {
        return date.toISOString()
      }
    },
  },
]

export const WithContent: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionList.Header>
        <DescriptionList.Title>DescriptionList Title</DescriptionList.Title>
        <DescriptionList.Subtitle>
          Subtitle describing the content of the DescriptionList
        </DescriptionList.Subtitle>
      </DescriptionList.Header>
      {options.map(({ key, name, formatter }, idx) => (
        <DescriptionList.Field idx={idx} key={idx}>
          <DescriptionList.Term>{name}</DescriptionList.Term>
          <DescriptionList.Description>
            <>
              {formatter
                ? formatter(user[key as keyof typeof user])
                : user[key as keyof typeof user]}
            </>
          </DescriptionList.Description>
        </DescriptionList.Field>
      ))}
    </DescriptionList>
  ),
}

export const WithoutContent: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionList.Header>
        <DescriptionList.Title>DescriptionList Title</DescriptionList.Title>
        <DescriptionList.Subtitle>
          Subtitle describing the content of the DescriptionList
        </DescriptionList.Subtitle>
      </DescriptionList.Header>
    </DescriptionList>
  ),
}
