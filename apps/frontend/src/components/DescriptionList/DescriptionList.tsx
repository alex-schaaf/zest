import classNames from "classnames"
import React, { PropsWithChildren } from "react"

interface DescriptionListProps {
  Field: React.FC<PropsWithChildren & { idx: number }>
  Header: React.FC<PropsWithChildren>
  Title: React.FC<PropsWithChildren>
  Subtitle: React.FC<PropsWithChildren>
  Term: React.FC<PropsWithChildren>
  Description: React.FC<PropsWithChildren>
}

const DescriptionList: React.FC<PropsWithChildren> & DescriptionListProps = (
  props,
) => {
  return <div className="px-2 py-2 sm:px-6">{props.children}</div>
}

export default DescriptionList

const Header: React.FC<PropsWithChildren> = (props) => {
  return (
    <dt className="border-b border-gray-200 px-4 py-4 sm:px-6">
      {props.children}
    </dt>
  )
}

const Title: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="text-lg font-medium leading-6 text-gray-900">
      {props.children}
    </div>
  )
}

const Subtitle: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="mt-1 max-w-2xl text-sm text-gray-500">{props.children}</div>
  )
}

const Field: React.FC<PropsWithChildren & { idx: number }> = (props) => {
  return (
    <div
      className={classNames(
        "px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
        { "bg-gray-50": props.idx % 2 === 0 },
      )}
    >
      {props.children}
    </div>
  )
}

const Term: React.FC<PropsWithChildren> = (props) => {
  return <dt className="text-sm font-medium text-gray-500">{props.children}</dt>
}

const Description: React.FC<PropsWithChildren> = (props) => {
  return (
    <dd className="text-sm text-gray-900 sm:col-span-2">{props.children}</dd>
  )
}

DescriptionList.Term = Term
DescriptionList.Description = Description
DescriptionList.Title = Title
DescriptionList.Subtitle = Subtitle
DescriptionList.Header = Header
DescriptionList.Field = Field
