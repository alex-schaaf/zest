import type { Meta, StoryObj } from "@storybook/react"

import ToastMessage from "./ToastMessage"
import { ToastProvider, Viewport } from "@radix-ui/react-toast"

const meta: Meta<typeof ToastMessage> = {
  component: ToastMessage,
}

export default meta
type Story = StoryObj<typeof ToastMessage>

export const Visible: Story = {
  render: () => (
    <ToastProvider>
      <Viewport className="fixed bottom-0 right-0 z-[100000] m-0 flex w-[390px] flex-col p-6 gap-4" />
      <ToastMessage
        open={true}
        title="The Title"
        message="This message is a success :-)"
        onOpenChange={() => false}
        intent="success"
      />
      <ToastMessage
        open={true}
        title="The Title"
        message="This message is a failure :-("
        onOpenChange={() => false}
        intent="failure"
      />
    </ToastProvider>
  ),
}
