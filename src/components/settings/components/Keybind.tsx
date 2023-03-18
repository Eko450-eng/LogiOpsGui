import { Select, Stack, Text, TextInput } from "@mantine/core";
import { AnyAction } from "@reduxjs/toolkit";
import { BaseSyntheticEvent } from "react";
import { useDispatch } from "react-redux";

interface IKeyConfig {
  label: string,
  mode: string,
  modeDispatcher: (mode: string) => AnyAction,
  keys: string[]
  keyDispatcher: (key: string) => AnyAction,
}

export default function Keybind({ props }: { props: IKeyConfig }) {
  const { label, mode, modeDispatcher, keyDispatcher, keys } = props
  const dispatcher = useDispatch()
  const isNotToggle = ((mode !== "ToggleSmartshift") && (mode !== "ToggleHiresScroll") && (mode !== "CycleDPI"))

  return (
    <Stack>
      <Text>{label}</Text>
      <Select
        data={[
          { value: "Keypress", label: "Keypress" },
          { value: "Gestures", label: "Gestures" },
          { value: "ChangeDPI", label: "ChangeDPI" },
          { value: "NoPress", label: "NoPress" },
          { value: "OnRelease", label: "OnRelease" },
          { value: "OnInterval", label: "OnInterval" },
          { value: "OnThreshold", label: "OnThreshold" },
          { value: "ToggleSmartshift", label: "ToggleSmartshift" },
          { value: "ToggleHiresScroll", label: "ToggleHiresScroll" },
          { value: "CycleDPI", label: "CycleDPI" },
        ]}
        label="Mode"
        value={mode}
        onChange={(v: string | null | undefined) => dispatcher(modeDispatcher(v ? v : "Keypress"))}
      />

      {isNotToggle &&
        <TextInput
          value={keys}
          label="Key"
          onChange={(v: BaseSyntheticEvent) => dispatcher(keyDispatcher(v.target.value))}
        />
      }
    </Stack>
  )
}
