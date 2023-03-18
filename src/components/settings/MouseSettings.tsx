import fs from 'fs'
import os from 'os'
import { BaseSyntheticEvent, useState } from "react";
import { Clipboard, X } from 'tabler-icons-react'
import { keys } from "./defaults/KeyCodes";
import { Text, TextInput, Group, Button, NumberInput, Center, Stack, Modal, List, Accordion, Affix, Slider } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
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
import { clipboard } from 'electron'
import Keybind from './components/Keybind';
import Toggleswitch from './components/Toggleswitch';

export default function MouseSettings() {
  const homeDir = os.homedir()
  const [sections, showSection] = useState({
    keys: false,
    settings: false,
    device: false,
    hires: false,
    thumbwheel: false,
    gestures: false,
    buttons: false,
  })
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
    <>
      <Accordion sx={{ width: "80%" }} variant="separated">
        <Accordion.Item value="config" className="section">
          <Accordion.Control>Config</Accordion.Control>
          <Accordion.Panel>
            <TextInput
              value={dir}
              label="Config location:"
              onChange={(v: BaseSyntheticEvent) => setDir(v.target.value)}
            />
          </Accordion.Panel>
        </Accordion.Item>


        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          createConfig()
        }} className="settings">

          <Accordion.Item value="device" className="section">
            <Accordion.Control>Device Info</Accordion.Control>
            <Accordion.Panel>
              <Text>Device Information</Text>
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
              <Slider
                value={mouse.dpi}
                onChange={(v: number) => dispatcher(changeDPI(v))}
                step={10}
                min={100}
                max={8000}
                size={10}
              />

              <Toggleswitch
                props={{
                  label: "Smartshift",
                  checked: smartshift.on,
                  dispatcher: toggleSS
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>


          <Accordion.Item value="scroll" className="section">
            <Accordion.Control>Scrollbehaviour</Accordion.Control>
            <Accordion.Panel>
              <Toggleswitch
                props={{
                  label: "Hiresscroll",
                  checked: hiresscroll.hires,
                  dispatcher: toggleHiresscroll
                }}
              />
              <Toggleswitch
                props={{
                  label: "Inverted",
                  checked: hiresscroll.invert,
                  dispatcher: invertHiresscroll
                }}
              />
              <Toggleswitch
                props={{
                  label: "Target",
                  checked: hiresscroll.target,
                  dispatcher: targetHiresscroll
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="thumbwheel" className="section">
            <Accordion.Control>Thumbwheel</Accordion.Control>
            <Accordion.Panel>
              <Center>
                <Group>
                  <Keybind
                    props={{
                      label: "Left",
                      mode: thumbwheelLeft.mode,
                      modeDispatcher: TWLeftMode,
                      keys: thumbwheelLeft.keys,
                      keyDispatcher: TWLeftActionKey
                    }}
                  />

                  <Keybind
                    props={{
                      label: "Tap",
                      mode: thumbwheelTap.type,
                      modeDispatcher: TWTapctionType,
                      keys: thumbwheelTap.keys,
                      keyDispatcher: TWTapActionKey
                    }}
                  />

                  <Keybind
                    props={{
                      label: "Right",
                      mode: thumbwheelRight.mode,
                      modeDispatcher: TWRightMode,
                      keys: thumbwheelRight.keys,
                      keyDispatcher: TWRightActionKey
                    }}
                  />

                </Group>
              </Center>

              <Toggleswitch
                props={{
                  label: "Divert",
                  checked: thumbwheel.divert,
                  dispatcher: TWDivert
                }}
              />

              <Toggleswitch
                props={{
                  label: "Invert",
                  checked: thumbwheel.invert,
                  dispatcher: TWInvert
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="gestures" className="section">
            <Accordion.Control>Gestures</Accordion.Control>
            <Accordion.Panel>
              <Center>
                <Group spacing="xl">
                  <Stack>
                    <Keybind
                      props={{
                        label: "Up",
                        mode: gestureButtonUp.mode,
                        modeDispatcher: GUpMode,
                        keys: gestureButtonUp.keys,
                        keyDispatcher: GUpActionKey
                      }}
                    />

                    <Keybind
                      props={{
                        label: "Down",
                        mode: gestureButtonDown.mode,
                        modeDispatcher: GDownMode,
                        keys: gestureButtonDown.keys,
                        keyDispatcher: GDownActionKey
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Keybind
                      props={{
                        label: "Left",
                        mode: gestureButtonLeft.mode,
                        modeDispatcher: GLeftMode,
                        keys: gestureButtonLeft.keys,
                        keyDispatcher: GLeftActionKey
                      }}
                    />

                    <Keybind
                      props={{
                        label: "Right",
                        mode: gestureButtonRight.mode,
                        modeDispatcher: GRightMode,
                        keys: gestureButtonRight.keys,
                        keyDispatcher: GRightActionKey
                      }}
                    />
                  </Stack>
                </Group>
              </Center>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="buttons" className="section">
            <Accordion.Control>Buttons</Accordion.Control>
            <Accordion.Panel>
              <Center>
                <Group>
                  <Keybind
                    props={{
                      label: "Forward Button",
                      mode: forwardButton.type,
                      modeDispatcher: ForwardBtnActionType,
                      keys: forwardButton.keys,
                      keyDispatcher: ForwardBtnActionKey
                    }}
                  />

                  <Keybind
                    props={{
                      label: "Center Button",
                      mode: centerButton.type,
                      modeDispatcher: CenterBtnActionType,
                      keys: centerButton.keys,
                      keyDispatcher: CenterBtnActionKey
                    }}
                  />

                  <Keybind
                    props={{
                      label: "back Button",
                      mode: backButton.type,
                      modeDispatcher: BackBtnActionType,
                      keys: backButton.keys,
                      keyDispatcher: BackBtnActionKey
                    }}
                  />

                </Group>
              </Center>
            </Accordion.Panel>
          </Accordion.Item>

          <Button type="submit" sx={(theme) => ({
            position: "absolute",
            right: "1rem",
            bottom: "1rem",
            background: theme.colors.green
          })}>Save</Button>
          {
            message &&
            <>
              <Modal opened={(message !== "")} onClose={() => setMessage("")} title="Authentication">
                <List>
                  <List.Item>
                    <Text>Please run:{message}
                      <Clipboard
                        style={{ margin: "auto 0", cursor: "pointer" }}
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


        {
          sections.keys &&
          keys.map((v: Object, k: number) => {
            const key = Object.entries(v)

            return (
              <p key={k}>
                {key[0][0]}: {key[0][1]}
              </p>
            )
          })
        }
      </Accordion>
    </>
  )
}
