import time
import random
import paho.mqtt.client as mqtt

BROKER = 'broker.hivemq.com'
PORT = 1883
TOPICS = {
    'temperature': 'channel/temperature'
}

PUBLISH_INTERVAL = 1

client = mqtt.Client()


# connect with broker
def connect_to_broker():
    try:
        client.connect(BROKER, PORT)
        print(f"Verbonden met broker op {BROKER}:{PORT}")
    except Exception as e:
        print(f"Kan niet verbinden")
        exit(1)

# send messages
def publish_data():
    try:
        while True:
            temperature = round(random.uniform(-20.0,0.0),2)

            client.publish(TOPICS['temperature'], temperature)

            time.sleep(PUBLISH_INTERVAL)
    except KeyboardInterrupt:
        print("\nUser stopped the stream")
    finally:
        client.disconnect()
        print("MQTT-client losgekoppeld")


if __name__== '__main__':
    connect_to_broker()
    publish_data()