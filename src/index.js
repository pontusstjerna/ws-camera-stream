import mqtt from "mqtt"
import { config } from "dotenv"
import { exec } from "child_process"

config()

let idleTimeout = null
let videoProcess = null

const {
  MQTT_BROKER_URL,
  MQTT_USERNAME,
  MQTT_PASSWORD,
  ID,
  VIDEO_STREAMING_URL,
  VIDEO_STREAM_COMMAND,
} = process.env

const mqttClient = mqtt.connect({
  hostname: MQTT_BROKER_URL || "127.0.0.1",
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  protocol: "mqtt",
})

mqttClient.on("connect", () => {
  console.log(
    `"${ID}" connected to mqtt broker at ${process.env.MQTT_USERNAME}:${process.env.MQTT_BROKER_URL}`
  )

  mqttClient.subscribe(ID, error => {
    if (error) {
      console.log(error)
    } else {
      console.log(`Subscribed to "${ID}" topic with mqtt`)
    }
  })

  // Don't care about which message
  mqttClient.on("message", () => {
    if (!isRunning()) {
      console.log("Got message, will startup robot and video!")
      videoProcess = startVideoStreamProcess()
    }

    setIdleTimeout()
  })

  const isRunning = () => idleTimeout !== null

  const setIdleTimeout = () => {
    if (idleTimeout !== null) {
      // Cancel old timeout on new message
      clearTimeout(idleTimeout)
    }

    idleTimeout = setTimeout(() => {
      // TODO: In the future, return to base?
      console.log(`Five minutes idle, will turn off ${ID} video stream.`)
      clearTimeout(idleTimeout)
      idleTimeout = null

      if (videoProcess !== null) {
        videoProcess.kill()
      }
      videoProcess = null
    }, parseInt(process.env.IDLE_TIMEOUT_MS) || 5 * 60 * 1000) // Keep alive for 5 minutes, then turn off
  }
})

const startVideoStreamProcess = () => {
  const defaultCommand = `ffmpeg -s 640x480 -f video4linux2 -i /dev/video0 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 1000k ${VIDEO_STREAMING_URL}`

  return exec(
    VIDEO_STREAM_COMMAND || defaultCommand,
    (error, stdout, stderr) => {
      console.log("Video streaming ended.")

      if (error != null) {
        console.log("Error with streaming: " + error)
      }
    }
  )
}
