let lastSend = 0;
const INTERVAL = 250; // ms (4x pro Sekunde)

const HA_URL = "http://192.168.178.50:8123/api/states/sensor.pc_audio";
const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMWI0ZmFmZjRjY2E0YmE4YWJmN2M3ZWUwMjA0NDYzNSIsImlhdCI6MTc2Njc3OTE0MywiZXhwIjoyMDgyMTM5MTQzfQ.v1mgnzYZCbgGyXv7SXZJtQ9qGhAULVEGBYRp6ehbaoM";

export function update() {
    const now = Date.now();
    if (now - lastSend < INTERVAL) return;
    lastSend = now;

    const audio = Engine.Audio;

    const payload = {
        state: Math.round(audio.volume * 100),
        attributes: {
            bass: Math.round(audio.low * 100),
            treble: Math.round(audio.high * 100)
        }
    };

    fetch(HA_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HA_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).catch(() => {});
}
