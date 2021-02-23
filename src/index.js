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
  VIDEO_STREAM_HOST,
  VIDEO_STREAM_COMMAND = "ffmpeg -s 640x480 -f video4linux2 -i /dev/video0 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 1000k",
  IDLE_TIMEOUT_MS = "300000",
} = process.env

const mqttClient = mqtt.connect({
  hostname: MQTT_BROKER_URL,
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
      console.log("Got message, will startup video stream!")
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
    }, parseInt(IDLE_TIMEOUT_MS)) // Keep alive for 5 minutes, then turn off
  }
})

const startVideoStreamProcess = () => {
  const videoStreamUrl = `${VIDEO_STREAM_HOST}/video_stream/${ID}`

  return exec(
    `${VIDEO_STREAM_COMMAND} ${videoStreamUrl}`,
    (error, stdout, stderr) => {
      console.log("Video streaming ended.")

      if (error != null) {
        console.log("Error with streaming: " + error)
      }
    }
  )
}
