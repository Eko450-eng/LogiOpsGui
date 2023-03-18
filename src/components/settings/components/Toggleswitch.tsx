import { Switch } from "@mantine/core";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Check, X } from "tabler-icons-react";
interface IProps {
  label: string,
  checked: boolean,
  dispatcher: () => AnyAction
}

export default function Toggleswitch({ props }: { props: IProps }) {
  const dispatch = useDispatch()
  const { label, checked, dispatcher } = props

  return (
    <Switch
      checked={checked}
      label={label}
      labelPosition="left"
      size="lg"
      onLabel={<Check />}
      offLabel={<X />}
      onChange={() => dispatch(dispatcher())}
    />
  )
}
