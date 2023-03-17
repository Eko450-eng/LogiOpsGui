import { BaseSyntheticEvent, useState } from "react";
import { Clipboard } from 'tabler-icons-react'
import { keys } from "./defaults/KeyCodes";
import { Text, TextInput, Group, Button, NumberInput, Center, Stack, Select, Modal, List } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import fs from 'fs'
import { templateConfig } from "./defaults/config";
import { RootState } from "@/interfaces/redux/mouseSettingsStore";
import { changeDPI, changeName } from "@/interfaces/redux/mouseSettings/mouseSlice";
import { toggleSS } from "@/interfaces/redux/mouseSettings/smartshift";
import { TWDivert, TWInvert } from "@/interfaces/redux/mouseSettings/thumbwheel/thumbwheel";
import { invertHiresscroll, targetHiresscroll, toggleHiresscroll } from "@/interfaces/redux/mouseSettings/hiresscroll";
import { TWLeftActionKey, TWLeftMode } from "@/interfaces/redux/mouseSettings/thumbwheel/thumbwheelLeft";
import { TWRightActionKey, TWRightMode } from "@/interfaces/redux/mouseSettings/thumbwheel/thumbwheelRight";
import { TWTapActionKey, TWTapctionType } from "@/interfaces/redux/mouseSettings/thumbwheel/thumbwheelTap";
import { GUpActionKey, GUpMode } from "@/interfaces/redux/mouseSettings/gestures/gestureUp";
import { GLeftActionKey, GLeftMode } from "@/interfaces/redux/mouseSettings/gestures/gestureLeft";
import { GRightActionKey, GRightMode } from "@/interfaces/redux/mouseSettings/gestures/gestureRight";
import { GDownActionKey, GDownMode } from "@/interfaces/redux/mouseSettings/gestures/gestureDown";
import { CenterBtnActionKey, CenterBtnActionType } from "@/interfaces/redux/mouseSettings/buttons/centerButton";
import { BackBtnActionKey, BackBtnActionType } from "@/interfaces/redux/mouseSettings/buttons/backButton";
import { ForwardBtnActionKey, ForwardBtnActionType } from "@/interfaces/redux/mouseSettings/buttons/forwardButton";
import os from 'os'
import { clipboard } from "electron";



export default function MouseSettings() {
  const homeDir = os.homedir()
  const [editing, setEditing] = useState(false)
  const [showKeys, setShowKeys] = useState(false)
  const [message, setMessage] = useState("")
  const mouse = useSelector((state: RootState) => state.mouse)
  const smartshift = useSelector((state: RootState) => state.smartshift)
  const hiresscroll = useSelector((state: RootState) => state.hiresscroll)
  const thumbwheel = useSelector((state: RootState) => state.thumbwheel)
  const thumbwheelLeft = useSelector((state: RootState) => state.thumbwheelLeft)
  const thumbwheelRight = useSelector((state: RootState) => state.thumbwheelRight)
  const thumbwheelTap = useSelector((state: RootState) => state.thumbwheelTap)
  const gestureButtonUp = useSelector((state: RootState) => state.gestureButtonUp)
  const gestureButtonDown = useSelector((state: RootState) => state.gestureButtonDown)
  const gestureButtonLeft = useSelector((state: RootState) => state.gestureButtonLeft)
  const gestureButtonRight = useSelector((state: RootState) => state.gestureButtonRight)
  const centerButton = useSelector((state: RootState) => state.centerButton)
  const forwardButton = useSelector((state: RootState) => state.forwardButton)
  const backButton = useSelector((state: RootState) => state.backButton)
  const dispatcher = useDispatch()


  const [dir, setDir] = useState(`${homeDir}/.config/logiopsguicfg`)
  const fileName = `${dir}/config.cfg`

  function createConfig() {
    const template = templateConfig(mouse, smartshift, hiresscroll, thumbwheel, thumbwheelLeft, thumbwheelRight, thumbwheelTap, gestureButtonUp, gestureButtonDown, gestureButtonLeft, gestureButtonRight, centerButton, forwardButton, backButton)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (fs.existsSync(process.env.CFGPATH ? process.env.CFGPATH : fileName)) {
      fs.writeFile(fileName, template, (err) => { if (err) alert(err.message) })
    } else {
      fs.writeFile(fileName, template, (err) => { if (err) alert(err.message) })
    }
    setMessage(`sudo logid -c ${dir}/config.cfg`)
  }

  return (
    <div>
      <>
        <Center>
          <Stack>
            <Group>
              <Button onClick={() => setEditing(!editing)} >
                {`Change to ${editing ? "view mode" : "editing mode"}`}
              </Button>

              <Button onClick={() => setShowKeys(!showKeys)} >
                {`${showKeys ? "Hide" : "Show"} keys`}
              </Button>
            </Group>
            <TextInput
              value={dir}
              label="Config location:"
              onChange={(v: BaseSyntheticEvent) => setDir(v.target.value)}
            />
          </Stack>
        </Center>


        <Center>
          <form onSubmit={(e: any) => {
            e.preventDefault()
            createConfig()
          }} className="settings">

            <Group className="section">
              <TextInput
                value={mouse.name}
                label="Device Name"
                onChange={(v: BaseSyntheticEvent) => dispatcher(changeName(v.target.value))}
              />

              <NumberInput
                label="DPI"
                step={100}
                value={mouse.dpi}
                onChange={(v: number) => dispatcher(changeDPI(v))}
              />

              <Button
                sx={(theme) => ({ backgroundColor: smartshift.on ? theme.colors.green : theme.colors.gray })}
                onClick={() => dispatcher(toggleSS())}
              >{smartshift.on ? "Smartshift On" : "Smartshift Off"}</Button>

            </Group>

            <Stack className="section">
              <Center>
                <Text fz="xl" fw={700}>Hiresscroll</Text>
              </Center>
              <Group>
                <Button
                  sx={(theme) => ({ backgroundColor: hiresscroll.hires ? theme.colors.green : theme.colors.gray })}
                  onClick={() => dispatcher(toggleHiresscroll())}
                >{hiresscroll.hires ? "On" : "Off"}</Button>

                <Button
                  sx={(theme) => ({ backgroundColor: hiresscroll.invert ? theme.colors.green : theme.colors.gray })}
                  onClick={() => dispatcher(invertHiresscroll)}
                >{hiresscroll.invert ? "Inverted" : "Not inverted"}</Button>

                <Button
                  sx={(theme) => ({ backgroundColor: hiresscroll.target ? theme.colors.green : theme.colors.gray })}
                  onClick={() => dispatcher(targetHiresscroll())}
                >{hiresscroll.target ? "Target" : "No target"}</Button>
              </Group>
            </Stack>

            <Stack className="section">
              <Center>
                <Text fz="xl" fw={700}>Thumbwheel</Text>
              </Center>
              <Center>
                <Group>
                  <Button
                    sx={(theme) => ({ backgroundColor: thumbwheel.divert ? theme.colors.green : theme.colors.gray })}
                    onClick={() => dispatcher(TWDivert())} >
                    {thumbwheel.divert ? "Divert" : "No Divert"}
                  </Button>
                  <Button
                    sx={(theme) => ({ backgroundColor: thumbwheel.invert ? theme.colors.green : theme.colors.gray })}
                    onClick={() => dispatcher(TWInvert())} >
                    {thumbwheel.invert ? "Inverted" : "Not inverted"}</Button>
                </Group>
              </Center>


              <Center>
                <Group>
                  <Stack>
                    <Text>Left</Text>
                    <Select
                      data={[
                        { value: "NoPress", label: "NoPress" },
                        { value: "OnRelease", label: "OnRelease" },
                        { value: "OnInterval", label: "OnInterval" },
                        { value: "OnThreshold", label: "OnThreshold" }
                      ]}
                      label="Mode"
                      value={thumbwheelLeft.mode}
                      onChange={(v) => dispatcher(TWLeftMode(v ? v : "OnRelease"))}
                    />

                    <TextInput
                      value={thumbwheelLeft.keys}
                      label="Key"
                      onChange={(v: BaseSyntheticEvent) => dispatcher(TWLeftActionKey(v.target.value))}
                    />


                  </Stack>

                  <Stack>
                    <Text>Right</Text>
                    <Select
                      data={[
                        { value: "NoPress", label: "NoPress" },
                        { value: "OnRelease", label: "OnRelease" },
                        { value: "OnInterval", label: "OnInterval" },
                        { value: "OnThreshold", label: "OnThreshold" }
                      ]}
                      label="Mode"
                      value={thumbwheelRight.mode}
                      onChange={(v) => dispatcher(TWRightMode(v ? v : "OnRelease"))}
                    />

                    <TextInput
                      value={thumbwheelRight.keys}
                      label="Key"
                      onChange={(v) => dispatcher(TWRightActionKey(v.target.value))}
                    />

                  </Stack>

                  <Stack>
                    <Text>Tap</Text>
                    <Select
                      data={[
                        { value: "Keypress", label: "Keypress" },
                        { value: "ToggleSmartshift", label: "ToggleSmartshift" },
                        { value: "ToggleHiresScroll", label: "ToggleHiresScroll" },
                        { value: "Gestures", label: "Gestures" },
                        { value: "CycleDPI", label: "CycleDPI" },
                        { value: "ChangeDPI", label: "ChangeDPI" },
                      ]}
                      label="Mode"
                      value={thumbwheelTap.type}
                      onChange={(v) => dispatcher(TWTapctionType(v ? v : "OnRelease"))}
                    />

                    <TextInput
                      value={thumbwheelTap.keys![0]}
                      label="Key"
                      onChange={(v) => dispatcher(TWTapActionKey(v.target.value))}
                    />

                  </Stack>
                </Group>
              </Center>
            </Stack>

            <Stack className="section">
              <Center>
                <Text fz="xl" fw={700}>Gestures</Text>
              </Center>
              <Group>
                <Stack>
                  <Text>Up</Text>
                  <Select
                    data={[
                      { value: "NoPress", label: "NoPress" },
                      { value: "OnRelease", label: "OnRelease" },
                      { value: "OnInterval", label: "OnInterval" },
                      { value: "OnThreshold", label: "OnThreshold" }
                    ]}
                    label="Mode"
                    value={gestureButtonUp.mode}
                    onChange={(v) => dispatcher(GUpMode(v ? v : "OnRelease"))}
                  />
                  <TextInput
                    value={gestureButtonUp.keys![0]}
                    label="Key"
                    onChange={(v: BaseSyntheticEvent) => dispatcher(GUpActionKey(v.target.value))}
                  />
                </Stack>

                <Stack>
                  <Text>Down</Text>
                  <Select
                    data={[
                      { value: "NoPress", label: "NoPress" },
                      { value: "OnRelease", label: "OnRelease" },
                      { value: "OnInterval", label: "OnInterval" },
                      { value: "OnThreshold", label: "OnThreshold" }
                    ]}
                    label="Mode"
                    value={gestureButtonDown.mode}
                    onChange={(v) => dispatcher(GDownMode(v ? v : "OnRelease"))}
                  />
                  <TextInput
                    value={gestureButtonDown.keys![0]}
                    label="Key"
                    onChange={(v: BaseSyntheticEvent) => dispatcher(GDownActionKey(v.target.value))}
                  />
                </Stack>

                <Stack>
                  <Text>Left</Text>
                  <Select
                    data={[
                      { value: "NoPress", label: "NoPress" },
                      { value: "OnRelease", label: "OnRelease" },
                      { value: "OnInterval", label: "OnInterval" },
                      { value: "OnThreshold", label: "OnThreshold" }
                    ]}
                    label="Mode"
                    value={gestureButtonLeft.mode}
                    onChange={(v) => dispatcher(GLeftMode(v ? v : "OnRelease"))}
                  />
                  <TextInput
                    value={gestureButtonLeft.keys![0]}
                    label="Key"
                    onChange={(v: BaseSyntheticEvent) => dispatcher(GLeftActionKey(v.target.value))}
                  />
                </Stack>

                <Stack>
                  <Text>Right</Text>
                  <Select
                    data={[
                      { value: "NoPress", label: "NoPress" },
                      { value: "OnRelease", label: "OnRelease" },
                      { value: "OnInterval", label: "OnInterval" },
                      { value: "OnThreshold", label: "OnThreshold" }
                    ]}
                    label="Mode"
                    value={gestureButtonRight.mode}
                    onChange={(v) => dispatcher(GRightMode(v ? v : "OnRelease"))}
                  />
                  <TextInput
                    value={gestureButtonRight.keys![0]}
                    label="Key"
                    onChange={(v: BaseSyntheticEvent) => dispatcher(GRightActionKey(v.target.value))}
                  />
                </Stack>
              </Group>
            </Stack>

            <Stack className="section">
              <Center>
                <Text fz="xl" fw={700}>Buttons</Text>
              </Center>
              <Group>
                <Stack>
                  <Text>Forward Button Button</Text>
                  <Select
                    data={[
                      { value: "Keypress", label: "Keypress" },
                      { value: "ToggleSmartshift", label: "ToggleSmartshift" },
                      { value: "ToggleHiresScroll", label: "ToggleHiresScroll" },
                      { value: "Gestures", label: "Gestures" },
                      { value: "CycleDPI", label: "CycleDPI" },
                      { value: "ChangeDPI", label: "ChangeDPI" },
                    ]}
                    label="Mode"
                    value={forwardButton.type!}
                    onChange={(v) => dispatcher(ForwardBtnActionType(v ? v : "KeyPress"))}
                  />

                  {(forwardButton.type === "Keypress") &&
                    <TextInput
                      value={forwardButton.keys![0]}
                      label="Key"
                      onChange={(v: BaseSyntheticEvent) => dispatcher(ForwardBtnActionKey(v.target.value))}
                    />
                  }

                </Stack>

                <Stack>
                  <Text>Center Button Button</Text>
                  <Select
                    data={[
                      { value: "Keypress", label: "Keypress" },
                      { value: "ToggleSmartshift", label: "ToggleSmartshift" },
                      { value: "ToggleHiresScroll", label: "ToggleHiresScroll" },
                      { value: "Gestures", label: "Gestures" },
                      { value: "CycleDPI", label: "CycleDPI" },
                      { value: "ChangeDPI", label: "ChangeDPI" },
                    ]}
                    label="Mode"
                    value={centerButton.type!}
                    onChange={(v) => dispatcher(CenterBtnActionType(v ? v : "KeyPress"))}
                  />
                  {(centerButton.type === "Keypress") &&
                    <TextInput
                      value={centerButton.keys![0]}
                      label="Key"
                      onChange={(v: BaseSyntheticEvent) => dispatcher(CenterBtnActionKey(v.target.value))}
                    />
                  }

                </Stack>

                <Stack>
                  <Text>Back Button Button</Text>
                  <Select
                    data={[
                      { value: "Keypress", label: "Keypress" },
                      { value: "ToggleSmartshift", label: "ToggleSmartshift" },
                      { value: "ToggleHiresScroll", label: "ToggleHiresScroll" },
                      { value: "Gestures", label: "Gestures" },
                      { value: "CycleDPI", label: "CycleDPI" },
                      { value: "ChangeDPI", label: "ChangeDPI" },
                    ]}
                    label="Mode"
                    value={backButton.type!}
                    onChange={(v) => dispatcher(BackBtnActionType(v ? v : "KeyPress"))}
                  />

                  {(backButton.type === "Keypress") &&
                    <TextInput
                      value={backButton.keys![0]}
                      label="Key"
                      onChange={(v: BaseSyntheticEvent) => dispatcher(BackBtnActionKey(v.target.value))}
                    />
                  }

                </Stack>
              </Group>
            </Stack>

            <Center>
              <Button type="submit" sx={(theme) => ({ background: theme.colors.green })}>Save</Button>
            </Center>
            {
              message &&
              <>
                <Modal opened={(message !== "")} onClose={() => setMessage("")} title="Authentication">
                  <List>
                    <List.Item>
                      <Text>Please run:{message}
                        <Clipboard
                          style={{ margin: "auto 0" }}
                          onClick={() => {
                            clipboard.writeText(message)
                          }}
                        />

                      </Text>
                    </List.Item>
                    <List.Item>
                      <Text>If you haven't already start the daemon for logid then you can move the cfg file to /etc/config.cfg</Text>
                    </List.Item>
                  </List>
                </Modal>
              </>
            }
          </form>
        </Center>


        {
          showKeys &&
          keys.map((k: Object, v: any) => {
            const key = Object.entries(k)

            return (
              <p key={v}>
                {key[0][0]}: {key[0][1]}
              </p>
            )
          })
        }
      </>
    </div >
  )
}
